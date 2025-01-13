import React from 'react';
import  {useSelector} from 'react-redux';
import Topbar from '../../components/topbar/topbar';
import { useGetAllProductsQuery } from '../../redux/features/productApi';
import { IMG_BASE_URL } from '../../components/common/veriables';
import Sidebar from '../../components/sidebar/sidebar';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import socket from '../../socket.js';



function Riders() {

        const [notifications, setNotifications] = useState([]);
        const notify = "notifications";
    

    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);
    if(!user){
        navigate("/login");
    }

    const {data} = useGetAllProductsQuery();

  
    const products = (data?.filter(prod => prod.riders == user?.username)) || [] ;


    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server', socket.id);
        });

        socket.on('message', (msg) => {
            console.log(msg);
           });

        return () => {
            socket.disconnect();
        };

    }, []);
    
    useEffect(() => {

        // Retrieve notifications from cookies
        const storedNotifications = Cookies.get(notify)
            ? JSON.parse(Cookies.get(notify))
            : [];
    
        setNotifications(storedNotifications);
    
        }, []);

    return (
        <>
            <div className='row'>
            <div>
                    <h2>Notifications</h2>
                    <ul>
                        {notifications.map((notif, index) => (
                            <li key={index}>{notif}</li> // Assuming 'message' is part of the notification object
                        ))}
                    </ul>
                </div>
                <Topbar/>
                <div className='col-2'>
                <Sidebar />
                </div>
                <div className='col-10'>
                    {
                        products &&
                        products.map(item => (
                            <div key={item._id} className='pt-4' style={{ background: '#eee', margin: '10px 20px', padding: '15px', clear: 'both', borderRadius: '10px' }}>
                                <div className="row">
                                    <div className="col-2">
                                        <img src={`${IMG_BASE_URL}${item?.image}`} alt="" width="100px" height="100px" />
                                    </div>
                                    <div className="col-4">
                                        <h6>{item?.name}</h6>
                                        <span>Charges: {item?.price}</span><br />
                                        <span style={{ fontSize: '13px', color: 'rgb(0, 124, 173)' }}>{item?.description}</span>

                                    </div>
                                    <div className="col-4">
                                        <h6>{item?.customer}</h6>
                                        <span>{item?.contact}</span>   <br />
                                        <span style={{ fontSize: '13px', color: 'rgb(0, 124, 173)' }}>
                                            {item?.name}
                                        </span>
                                    </div>
                                    <div className="col-2">
                                        <button className='btn btn-primary'>status</button>
                                    </div>


                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Riders;