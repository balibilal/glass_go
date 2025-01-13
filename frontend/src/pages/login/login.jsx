import React from 'react';
import bgGlasses from '../../assets/media/images/glasses.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUserLoginMutation } from '../../redux/features/auth/authApi';
import { setUserinfo } from '../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userLogin] = useUserLoginMutation()

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async(values) => {
        const user = await userLogin(values).unwrap();
        dispatch(setUserinfo(user));
        console.log('check');
        navigate('/add-job');

        },
    });

    return (
        <>
            <div className='mt-5' style={{ width: '50%', margin: 'auto' }}>
                <h2 className='text-center text-primary pt-4'>Login Form</h2>

                <div className='row bg-light mt-4' style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                    <div className='col-4 ps-0'>
                        <img src={bgGlasses} alt="" width={'100%'} />
                    </div>
                    <div className='col-8 pt-4'>
                        <form name='login' id='loginform' onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id='email'
                                    name='email'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <small className="form-text text-danger">
                                    {errors.email && touched.email ? errors.email : null}
                                </small>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id='password'
                                    name='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <small className="form-text text-danger">
                                    {errors.password && touched.password ? errors.password : null}
                                </small>
                            </div>
                            <div className="form-group form-check mb-2">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary" id='login'>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
