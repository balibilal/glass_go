import React from 'react';
import Sidebar from '../../components/sidebar/sidebar.jsx';
import Topbar from '../../components/topbar/topbar.jsx';
import './style.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddproductMutation } from '../../redux/features/productApi.js';



function Addjobs() {

  const [addPost, { isLoading }] = useAddproductMutation();

  const { handleSubmit, handleChange, handleBlur, errors, touched, setFieldValue, resetForm } = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
      image: '',
      customer: '',
      contact: '',
      zone: '',
      address: '',
      land_mark: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      price: Yup.number().required('Required'),
      description: Yup.string().required('Required'),
      image: Yup.string().required('Required'),
      customer: Yup.string().required('Required'),
      contact: Yup.number().required('Required'),
      zone: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      land_mark: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      addPost(values);
      resetForm();      

    },
  });






  //   const comment = {
  //   // State to manage form data
  //   const [formData, setFormData] = useState({
  //     name: '',
  //     price: '',
  //     description: '',
  //     customer: '', // New state field for the selected customer
  //     contact: '', // New state field for the selected zone
  //     zone: '', // New state field for the selected zone
  //     address: '',
  //     land_mark: '',

  //   });
  //   const [image, setImage] = useState(null); // State for the image file
  //   const [message, setMessage] = useState(''); // State to store success/error messages



  //   // Zone options array
  //   const zones = [
  //     { id: 1, name: 'Zone 1 - Downtown' },
  //     { id: 2, name: 'Zone 2 - Suburbs' },
  //     { id: 3, name: 'Zone 3 - Industrial Area' },
  //     { id: 4, name: 'Zone 4 - Coastal Area' },
  //   ];

  //   const customers = [
  //     { id: 1, name: 'Zone 1 - Downtown' },
  //     { id: 2, name: 'Zone 2 - Suburbs' },
  //     { id: 3, name: 'Zone 3 - Industrial Area' },
  //     { id: 4, name: 'Zone 4 - Coastal Area' },
  //   ];



  //   // Handle text input change
  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   // Handle image file selection
  //   const handleFileChange = (e) => {
  //     setImage(e.target.files[0]);
  //   };

  //   // Handle form submission
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Create a FormData object to send data as multipart/form-data
  //     const data = new FormData();
  //     data.append('name', formData.name);
  //     data.append('price', formData.price);
  //     data.append('description', formData.description);
  //     data.append('customer', formData.customer); // Add customer to the form data
  //     data.append('contact', formData.contact); // Add zone to the form data
  //     data.append('zone', formData.zone); // Add zone to the form data
  //     data.append('address', formData.address); // Add customer to the form data
  //     data.append('land_mark', formData.land_mark); // Add customer to the form date
  //     data.append('image', image);

  //     try {
  //       // Send the data to the backend
  //       const response = await axios.post('http://localhost:8000/api/add-product', data, {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       });

  //       setMessage(response.data.message); // Success message
  //       setFormData({ name: '', price: '', description: '', customer: '', contact: '', zone: '', address: '', land_mark: '' }); // Clear form
  //       setImage(null); // Clear image
  //     } catch (error) {
  //       setMessage('Failed to add product. Please try again.');
  //       console.error('Error uploading product:', error);
  //     }
  //   };
  // }
  return (
    <>
      <div className='row'>

        <Topbar />
        <div className='col-md-2'>
          <Sidebar />
        </div>
        <div className='col-md-10 '>
          <h3 className='text-center pt-5'>Upload Job Details</h3>
          <br />

          <form name='addproduct' className='addjob-content' onSubmit={handleSubmit}>


            <input type="text" placeholder="Product Title"
              className="form-control"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small className="form-text text-danger">
              {errors.name && touched.name ? errors.name : null}
            </small>
            <br />

            <textarea cols="20" rows="4" placeholder="Product Description..."
              className="form-control"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}

            ></textarea>
            <small className="form-text text-danger">
              {errors.description && touched.description ? errors.description : null}
            </small>
            <br />


            <input type="number" placeholder="Price"
              className="form-control"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}

            />
            <small className=" text-danger">
              {errors.price && touched.price ? errors.price : null}
            </small><br/>


            <span >Product Image</span>
            <input type="file" className="form-control"
              onBlur={handleBlur}
              name='image'
              id='image'
              placeholder='product image'

              onChange={(event) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                  if(reader.readyState === 2){
                    setFieldValue("image", reader.result)
                  }
                }
                  reader.readAsDataURL(event.currentTarget.files[0])
              }
              
              }

            />

            <small className="form-text text-danger">
              {errors.image && touched.image ? errors.image : null}
            </small>
            <br />




            <select className="form-select"
              name="customer"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Customer</option>
              <option value="john">John</option>
              <option value="doe">doe</option>
            </select>

            <small className="form-text text-danger">
              {errors.customer && touched.customer ? errors.customer : null}
            </small>
            <br />


            <input type="text" placeholder="Contact number"
              className="form-control"
              name="contact"
              onChange={handleChange}
              onBlur={handleBlur}

            />

            <small className="form-text text-danger">
              {errors.contact && touched.contact ? errors.contact : null}
            </small>
            <br />



            <select className="form-select"
              name="zone"
              onChange={handleChange}
              onBlur={handleBlur}
            >

              <option value="">Select a Zone</option>
              <option value="abc">ABC</option>
            </select>

            <small className="form-text text-danger">
              {errors.zone && touched.zone ? errors.zone : null}
            </small>
            <br />


            <input type="text" placeholder="Street Address"
              className="form-control"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <small className="form-text text-danger">
              {errors.address && touched.address ? errors.address : null}
            </small>
            <br />


            <input type="text" placeholder="Land Mark"
              className="form-control"
              name="land_mark"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <small className="form-text text-danger">
              {errors.land_mark && touched.land_mark ? errors.land_mark : null}
            </small>
            <br />


            <div className=" d-grid">
              <button className="btn  btn-primary mt-2" type='submit'>Add Job</button>
            </div>


          </form>


          {/* <form className='addjob-content' onSubmit={handleSubmit} encType="multipart/form-data">


            <input type="text" placeholder="Product Title"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required />

            <textarea cols="20" rows="4" placeholder="Product Description..."
              className="form-control mb-3"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>

            <input type="text" placeholder="Price"
              className="form-control mb-3"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />

            <span >Product Image</span>
            <input type="file" className="form-control mb-3"
              accept="image/*" onChange={handleFileChange} required />



            <select className="form-select mb-3"
            name="customer"
            value={formData.customer}
            onChange={handleInputChange}
            required>
               <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.name}>
                  {customer.name}
                </option>
              ))}
            </select>


            <input type="text" placeholder="Contact number"
              className="form-control mb-3"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />



            <select className="form-select mb-3"
              name="zone"
              value={formData.zone}
              onChange={handleInputChange}
              required>
              <option value="">Select a Zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.name}>
                  {zone.name}
                </option>
              ))}
            </select>


           <input type="text" placeholder="Street Address" 
           className="form-control mb-3"
           name="address"
              value={formData.address}
              onChange={handleInputChange}
              required />


            <input type="text" placeholder="Land Mark"
             className="form-control mb-3" 
             name="land_mark"
              value={formData.land_mark}
              onChange={handleInputChange}
              required/> 


            <div className=" d-grid">
              <button className="btn  btn-primary mt-2" type='submit'>Add Job</button>
            </div>


          </form> */}
          {/* {message && <p>{message}</p>} */}
        </div>
      </div>

    </>
  )
}

export default Addjobs;