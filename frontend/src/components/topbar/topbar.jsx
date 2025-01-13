import React, { useEffect, useRef, useState } from 'react';
import '../../components/topbar/style.css'
import logo from "../../assets/media/images/admin-panel-logo.png";
import userIcon from "../../assets/media/images/user-icon.png";
import { FaRegBell, FaRegQuestionCircle, FaRocketchat, FaSearch, FaUserCircle, } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useUserLogoutMutation } from '../../redux/features/auth/authApi';
import { clearUserinfo } from '../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';

function Topbar() {


  const { user, token } = useSelector(state => state.auth);
  const dispatch = useDispatch(); 
  const [userLogout] = useUserLogoutMutation();


  const handleLogout = async () => {
    await userLogout();
    dispatch(clearUserinfo ());
  }


  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // -------------start help dropdown-----------

  const [helpOpen, setHelpOpen] = useState(false);
  const ddHelpRef = useRef(null);
  const toggleHelpdd = () => {
    setHelpOpen((prevs) => !prevs);
  };

  useEffect(() => {
    const handleHelpdd = (e) => {
      if (ddHelpRef.current && !ddHelpRef.current.contains(e.target)) {
        setHelpOpen(false);
      }
    };

    document.addEventListener('mousedown', handleHelpdd);
    return () => document.removeEventListener('mousedown', handleHelpdd);
  }, []);


  // -------------start help dropdown-----------

  const [notifyOpen, setNotifyOpen] = useState(false);
  const ddNotifyRef = useRef(null);
  const toggleNotifydd = () => {
    setNotifyOpen((prevss) => !prevss);
  };

  useEffect(() => {
    const handleNotifydd = (e) => {
      if (ddNotifyRef.current && !ddNotifyRef.current.contains(e.target)) {
        setNotifyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleNotifydd);
    return () => document.removeEventListener('mousedown', handleNotifydd);
  }, []);

  return (
    <>

      <div className='topbar'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='d-flex'>
              <img src={logo} alt="logo" style={{ width: '17%', }} />
              {/* < FaBars className='mt-3 ms-5' style={{ fontSize: '22px', }} /> */}
            </div>
          </div>


          <div className='col-md-3 pt-3 ps-5 '>
            <div className='d-flex justify-content-around'>
              <FaSearch className='icons' />
              <FaRocketchat className='icons' />

              <div ref={ddNotifyRef} style={{ position: 'relative', display: 'inline-block' }}>
                <span onClick={toggleNotifydd} ><FaRegBell className='icons' /></span>
                {notifyOpen && (
                  <ul className='notifydd'>
                    <h5 className='text-center text-primary'>Notifications</h5>
                    <hr className='mb-0 mt-0' style={{ border: 'solid 1px #000' }} />

                    <div className='p-2 row mt-1 mb-1 ps-3'>
                      <div className='col-3'>
                        <img src={userIcon} alt="usericone" style={{ width: '100%' }} />
                      </div>
                      <div className='col-9'>
                        <span className=' fw-medium'>John Doe</span><br />
                        <span style={{ fontSize: '14px' }}>Post a new job !</span>
                      </div>
                    </div>
                    <hr className='mb-0 mt-0' />


                    <div className='p-2 row mt-1 mb-1 ps-3'>
                      <div className='col-3'>
                        <img src={userIcon} alt="usericone" style={{ width: '100%' }} />
                      </div>
                      <div className='col-9'>
                        <span className=' fw-medium'>William</span><br />
                        <span style={{ fontSize: '14px' }}>Post a new job !</span>
                      </div>
                    </div>
                    <hr className='mb-0 mt-0' />


                  </ul>
                )}
              </div>


              <div ref={ddHelpRef} style={{ position: 'relative', display: 'inline-block' }}>
                <span onClick={toggleHelpdd} ><FaRegQuestionCircle className='icons' /></span>
                {helpOpen && (
                  <ul className='userdd'>
                    <li>Customer support</li>
                    <li>Faqs</li>
                    <li>Terms & condition</li>
                    <li>Privacy policy</li>
                  </ul>
                )}
              </div>



              <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
                <span onClick={toggleDropdown} ><FaUserCircle className='icons' /></span>
                {isOpen && (
                  <ul className='userdd'>

                    {user && token ? <>
                      <li>Hi, {user.name}</li>
                      <li>Profile</li>
                      <li>Pending Jobs</li>
                      <li>Setting</li>
                      <li onClick={handleLogout}>Logout</li>
                      
                    </> : <>
                    <Link to='/login'>
                    <li className='text-dark'>Login</li>
                    </Link>
                    </>
                    }
                  </ul>
                )}
              </div>



            </div>
          </div>
        </div>


      </div>




    </>

  )
}

export default Topbar;