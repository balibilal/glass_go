// Sidebar.js
import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaMotorcycle,  FaSyncAlt,  FaUserFriends, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Sidebar = () => {

  const { user, token } = useSelector(state => state.auth);

  return (

    <div className='bg-dark text-white sidebar pt-1'>


      {/* menu start here */}


      <ul className='nav-menu'>
        
        <Link to='/assign-job'>
          <li><FaSyncAlt className='me-2' /> Jobs Management</li>
        </Link>

        <Link to='/add-job'>
          
            { user && token ?
            <>
            <li>
            <FaCloudUploadAlt className='me-2' /> Add Job
            </li>
            </>
            : <></>
            }
          
        </Link>

        <Link to={'/add-riders'}>
        <li><FaPlus className='me-2' /> Manage Riders</li>
        </Link>

        <Link to={'/riders'}>
        <li><FaMotorcycle className='me-2' /> Riders</li>
        </Link>

        <li><FaUserFriends className='me-2' /> Customers</li>
      </ul>

    </div>
  );
};

export default Sidebar;
