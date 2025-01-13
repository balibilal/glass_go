import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Topbar from "../../components/topbar/topbar.jsx";
import "./style.css";
import { IMG_BASE_URL } from "../../components/common/veriables.js";
import { FaEdit, FaPrint, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import {
  useGetAllProductsQuery,
  useUpdateRidersMutation,
} from "../../redux/features/productApi.js";
import { useAllUserQuery } from "../../redux/features/auth/authApi.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

import socket from "../../socket.js";

export default function Assignjob() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  const notify = "notifications";

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    socket.on("message", (msg) => {
      console.log(msg);

      // Retrieve existing notifications from cookies
      const existingNotifications = Cookies.get(notify)
        ? JSON.parse(Cookies.get(notify))
        : [];

      // Add the new notification
      const updatedNotifications = [...existingNotifications, msg];

      // Save updated notifications back to cookies
      Cookies.set(notify, JSON.stringify(updatedNotifications), {
        expires: 7, // Cookies will persist for 7 days
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isModel, setIsModel] = useState(false);

  const { data: products } = useGetAllProductsQuery();
  const { data: users } = useAllUserQuery();
  const [updateRiders] = useUpdateRidersMutation();

  const [prodId, setProdId] = useState();

  const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
    useFormik({
      initialValues: {
        riders: "",
      },

      validationSchema: Yup.object({
        riders: Yup.string().required("Required"),
      }),
      onSubmit: async (values) => {
        await updateRiders({
          data: { riders: values.riders }, // Correct structure for API payload
          id: prodId,
        });

        setIsModel(!isModel);
      },
    });

  return (
    <>
      <div className="row">
        <Topbar />
        <br />
        <form onSubmit={handleSend}>
          <label htmlFor="">Message</label>
          <input
            type="text"
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
          />

          <label htmlFor="">Room</label>
          <input
            type="text"
            value={room || ""}
            onChange={(e) => setRoom(e.target.value)}
          />

          <button type="submit" className="btn btn-success">
            send
          </button>
        </form>

        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <ul>
            {products &&
              products.map((item) => (
                //  <li key={item._id}>{item.name}</li>
                <div
                  key={item._id}
                  className="pt-4"
                  style={{
                    background: "#eee",
                    margin: "10px 20px",
                    padding: "15px",
                    clear: "both",
                    borderRadius: "10px",
                  }}
                >
                  <div className="row">
                    <div className="col-2">
                      <img
                        src={`${IMG_BASE_URL}${item?.image}`}
                        alt=""
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="col-3">
                      <h6>{item?.riders}</h6>
                      <span>Charges: {item?.price}</span>
                      <br />
                      <span
                        style={{ fontSize: "13px", color: "rgb(0, 124, 173)" }}
                      >
                        {item?.description}
                      </span>
                    </div>
                    <div className="col-4">
                      <h6>{item?.customer}</h6>
                      <span>{item?.contact}</span> <br />
                      <span
                        style={{ fontSize: "13px", color: "rgb(0, 124, 173)" }}
                      >
                        {item?.name}
                      </span>
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-light mt-1"
                        style={{ width: "130px" }}
                      >
                        {item.status}&nbsp;&nbsp;{" "}
                        <FaRegEdit onClick={() => setIsOpen(!isOpen)} />
                      </button>

                      {isOpen && (
                        <div className="content">
                          <div className="model p-3 text-center">
                            <h3>Update Status</h3>
                            <form action="">
                              <select className="form-select">
                                <option value="">--Select--</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </form>
                            <br />
                            <br />
                            <button className="btn btn-danger">Update</button>
                            &nbsp;
                            <button
                              className="btn btn-dark"
                              onClick={() => setIsOpen(!isOpen)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                      <div onClick={() => setIsModel(!isModel)}>
                        <button
                          onClick={() => setProdId(item._id)}
                          className="btn btn-primary mt-1"
                          style={{ width: "130px" }}
                        >
                          Assign
                        </button>
                      </div>
                      {isModel && (
                        <div className="content">
                          <div className="model p-3 text-center">
                            <h3>Update Rider</h3>
                            <form onSubmit={handleSubmit}>
                              <label htmlFor="riders" className="form-label">
                                Select Rider:
                              </label>
                              <select
                                id="riders"
                                className="form-select"
                                name="riders"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.riders} // Bind value to Formik state
                              >
                                <option value="">--Select--</option>
                                {users &&
                                  users.map((rider) => (
                                    <option
                                      key={rider.username}
                                      value={rider.username}
                                    >
                                      {rider.username}
                                    </option>
                                  ))}
                              </select>
                              {errors.riders && touched.riders && (
                                <div className="text-danger">
                                  {errors.riders}
                                </div>
                              )}

                              <button
                                type="submit"
                                className="btn btn-primary mt-3"
                              >
                                Submit
                              </button>
                              <button
                                className="btn btn-dark mt-3 ms-2"
                                onClick={() => setIsModel(!isModel)}
                              >
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-1 mt-1">
                      <FaPrint className="icon" />
                      <br />

                      <FaEdit className="icon" />
                      <br />
                      <FaTrashAlt className="icon" />
                    </div>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
