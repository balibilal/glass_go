import React, { useState } from 'react';
import Topbar from '../../components/topbar/topbar';
import Sidebar from '../../components/sidebar/sidebar';
import { FaEdit, FaPlus, FaTrashAlt} from 'react-icons/fa';
import './style.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAllUserQuery, useCreateUserMutation, useDeleteUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { deleteUserinfo } from '../../redux/features/auth/delSlice';



function Addriders() {


    //  --------createuser------

    const [open, setOpen] = useState(false);
    const [createUser] = useCreateUserMutation();


    // -------get all user-----

    const { data } = useAllUserQuery();
    const riders = (data?.filter(user => user.role == 'rider')) || [];


    // -------delete user-------

    const dispatch = useDispatch();
    const [deleteUser] = useDeleteUserMutation();

    const delUser = async(id) => {
        const del = await deleteUser(id);
        dispatch(deleteUserinfo(del));
        console.log('okay', id)
    }
    



    const { handleChange, handleBlur, handleSubmit, touched, errors, values, resetForm } = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            role: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('required'),
            username: Yup.string().required('required'),
            email: Yup.string().email('invalid email address').required('required'),
            password: Yup.string().required('required'),
            role: Yup.string().required('required'),
        }),
        onSubmit: async(values) => {
            await createUser(values).unwrap();
            resetForm();      
        },

    });

    return (
        <>
            <div className='row'>
                <Topbar />
                <div className='col-2'>
                    <Sidebar />
                </div>
                <div className='col-10'>
                    <div className='row mt-4 mb-3'>
                    <div className='col-6'>
                        <h3>Manage Riders</h3>
                    </div>
                    <div className='col-6 text-end pe-5'>
                    <button className=' btn btn-dark' onClick={() => setOpen(!open)} >
                        <FaPlus /> &nbsp;Add New Rider
                    </button>
                    </div>
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <table className='table table-bordered table-striped text-center'>
                                <thead>
                                    <tr>
                                    <th>Rider Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        riders &&
                                        riders.map(rider => (
                                            <tr>
                                            <td>{rider.name}</td>
                                            <td>{rider._id}</td>
                                            <td>{rider.email}</td>
                                            <td>{rider.role}</td>
                                            <td className='text-primary' style={{cursor: 'pointer'}}><FaEdit /></td>
                                            <td onClick={() => delUser(rider._id)} className='text-danger' style={{ cursor: 'pointer' }}>
                                                <FaTrashAlt  />
                                            </td>
                                        </tr>
    
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>



                {open && (
                    <div className="content">
                        <div className="model p-5">

                            <h3 className='text-center'>Create New User</h3>
                            <br />
                            <form name='adduser' onSubmit={handleSubmit}>
                                <label htmlFor="name">Full Name</label>
                                <input type="text" name="name" id="name" className='form-control mb-2' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                                <small className="form-text text-danger">
                                    {errors.name && touched.name ? errors.name : null}
                                </small>

                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" className='form-control mb-2' onChange={handleChange} onBlur={handleBlur} value={values.username} />
                                <small className="form-text text-danger">
                                    {errors.username && touched.username ? errors.username : null}
                                </small>


                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className='form-control mb-2' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                <small className="form-text text-danger">
                                    {errors.email && touched.email ? errors.email : null}
                                </small>


                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className='form-control mb-2' onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                <small className="form-text text-danger">
                                    {errors.password && touched.password ? errors.password : null}
                                </small>


                                <label htmlFor="Role">Role</label>
                                <select name="role" className='form-select mb-2' onChange={handleChange} onBlur={handleBlur} value={values.role} >
                                    <option value=""> --Select-- </option>
                                    <option value="rider">Rider</option>
                                </select>
                                <small className="form-text text-danger">
                                    {errors.role && touched.role ? errors.role : null}
                                </small>


                                <br />
                                <button className='btn btn-danger'>Add User</button>&nbsp;
                                <button className='btn btn-dark' onClick={() => setOpen(!open)} >Cancle</button>

                            </form>
                            <br />
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}

export default Addriders;