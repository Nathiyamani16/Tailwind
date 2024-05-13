import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
// import "./PathNote.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LeaveRequest = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const form = useRef();
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reasonLeave, setReasonLeave] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [message, setMessage] = useState("");
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [formErrors, setFormErrors] = useState({}); // New state to track form errors
  const [isOneDayLeave, setIsOneDayLeave] = useState(false);


  const calculateTotalDays = () => {
    if (!fromDate || !toDate) {
      setTotalDays(0);
      return;
    }
    const diffTime = toDate.getTime() - fromDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 ;
    setTotalDays(diffDays);
  };

  useEffect(() => {
    calculateTotalDays();
    fetchLeaveHistory();
  }, [fromDate, toDate]);

  useEffect(() => {
    setIsOneDayLeave(totalDays === 1); // Set checkbox state based on total days
}, [totalDays]);

  const handleCheckboxChange = () => {
    if (!isOneDayLeave) {
        setToDate(fromDate); // Set To Date to From Date when the checkbox is checked
    } else {
        setToDate(null); // Reset To Date when the checkbox is unchecked
    }
    setIsOneDayLeave(!isOneDayLeave); // Toggle the checkbox state
};


  const fetchLeaveHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/leave-history/${user.email}`
      );
      console.log("Leave history:", response.data);
      const reversedData = response.data.reverse(); // Reverse the array
      setLeaveHistory(reversedData);
    } catch (error) {
      console.error("Error fetching leave history:", error);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_aye4c9j",
        "template_8zlkf4r",
        form.current,
        "co7f_i3okxfv-a8bC"
      )
      .then((response) => {
        console.log("Email sent successfully!", response);
        toast.success("Email has been sent to Admin");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send the email!");
      });
  };

  const handleLeaveRequest = async () => {
    try {
      const leaveRequestData = {
        name: user.name,
        email: user.email,
        fromDate,
        toDate,
        totalDays,
        reasonLeave,
    
      };

      const response = await axios.post(
        "http://localhost:3000/leave-request",
        leaveRequestData
      );

      if (response.status === 201) {
        console.log("Leave request sent successfully");
        toast.success("Wait for Admin Approval");
        setTimeout(() => {
          //   navigate("/");
        }, 5000);

        // Update leave history after submitting a new request
        fetchLeaveHistory();
      } else {
        console.log("Error:", response.statusText);
        toast.error("Failed to send the leave request");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to send the leave request");
    }
  };

  useEffect(() => {
    if (totalDays < 0) {
        setFormErrors({ totalDays: "Please enter a valid date range" });
    } else {
        setFormErrors({});
    }
}, [totalDays]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    let errors = {};
    if (!fromDate) {
      errors.fromDate = "From Date is required";
    }
    if (!toDate) {
      errors.toDate = "To Date is required";
    }
    if (!reasonLeave) {
      errors.reasonLeave = "Reason for Leave is required";
    }
    if (!message) {
      errors.message = "Message is required";
    }

    if (Object.keys(errors).length === 0) {
      sendEmail(e);
      handleLeaveRequest();
      e.target.reset(); // Reset the form
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>

    <form ref={form} onSubmit={handleSubmit}>
   
        <section class="bg-white dark:bg-gray-900">
          <div class="flex justify-center min-h-screen">
            <div
              className="hidden bg-cover lg:block lg:w-2/5"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
              }}
            ></div>
  
            <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
              <div class="w-full">
              <div className="container mx-auto px-4 py-2 shadow-lg shadow-slate-300">
                <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                  Request to leave work early
                </h1>

                <p class="mt-4 text-gray-500 dark:text-gray-400">
                  Please fill out the form below to request permission to leave
                  work early.
                </p>

           
                  <div>
                  <label>Name</label>
                <input
                  type="text"
                  name="user_name"
                  value={user.name}
                  readOnly
                />
                    <label class="block mb-2 text-base text-gray-600 dark:text-gray-200">Your Email</label>
                    <input
                      type="email"
                      name="user_email"
                      value={user.email}
                      readOnly
                      class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div></div>
                  <div>
                    <label className="text-base text-gray-600 dark:text-gray-200">
                      From Date
                    </label>
                    <div className="mt-2">
                      <DatePicker
                        className="block w-full px-2 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        value={fromDate}
                        name="fromDate"
                        autoComplete="off"
                        isValidDate={(date) =>
                          date.getDay() !== 0 && date.getDay() !== 6
                        } // Example validation to disable weekends
                      />
                      {formErrors.toDate && (
                        <span className="error">{formErrors.toDate}</span>
                      )}
                      <div>
                        <label className="text-base text-gray-600 dark:text-gray-200">
                          To Date
                        </label>
                        <div className="mt-2">
                          <DatePicker
                            className="block w-full px-2 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                            value={toDate}
                            name="toDate"
                            autoComplete="off"
                            isValidDate={(date) =>
                              date.getDay() !== 0 && date.getDay() !== 6
                            } // Example validation to disable weekends
                          />
                          {formErrors.toDate && (
                            <span className="error">{formErrors.toDate}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 py-2">
                        <label className="text-base text-gray-600 dark:text-gray-200">
                          One-Day Leave
                        </label>
                        <div>
                          <input
                            className="form-checkbox h-5 w-5 text-blue-600"
                            type="checkbox"
                            checked={isOneDayLeave}
                            onChange={handleCheckboxChange}
                            disabled={!fromDate || totalDays > 1}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label name="totalDays">Total Days of Leave: </label>
                        <input
                          className="block w-full px-2 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          name="totalDays"
                          value={totalDays}
                          readOnly
                        />

                        {formErrors.totalDays && (
                          <span className="error">{formErrors.totalDays}</span>
                        )}
                      </div>
                      <div>
                        <label class=" py-2 block mb-2 text-base text-gray-600 dark:text-gray-200">
                          Reason for leaving early
                        </label>
                        <textarea
                          rows="4"
                          class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          type="text"
                          name="reason_leave"
                          value={reasonLeave}
                          onChange={(e) => setReasonLeave(e.target.value)}
                          autoComplete="off"
                        ></textarea>
                      </div>
                      
                    </div>
                    
                  </div>
                  
         

            
                  <input type="submit" value="Send" class="flex w-full px-6 py-3 mt-4 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  items-center justify-center bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"/>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 rtl:-scale-x-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg> */}
            
            </div>
              </div>
            </div>
          </div>
        </section>
        </form>
    

        <div>
          <div>
            {/* <h2 className="text-lg flex items-center justify-center text-cyan-500">
              Leave Request
            </h2> */}
            {/* <form ref={form} onSubmit={handleSubmit}>
              <div> */}
                {/* <label>Name</label>
                <input
                  type="text"
                  name="user_name"
                  value={user.name}
                  readOnly
                />
                <label>Email</label>
                <input
                  type="email"
                  name="user_email"
                  value={user.email}
                  readOnly
                />
              </div>
              <div>
                <div>
                  <label>From Date</label>
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    value={fromDate}
                    name="fromDate"
                    autoComplete="off"
                    isValidDate={(date) =>
                      date.getDay() !== 0 && date.getDay() !== 6
                    } // Example validation to disable weekends
                  />
                  {formErrors.fromDate && (
                    <span className="error">{formErrors.fromDate}</span>
                  )}
                  <input
                    type="checkbox"
                    checked={isOneDayLeave}
                    onChange={handleCheckboxChange}
                    disabled={!fromDate || totalDays > 1}
                  />
                  <label>One-Day Leave</label>
                </div>
                <div>
                  <label>To Date</label>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    value={toDate}
                    name="toDate"
                    autoComplete="off"
                    isValidDate={(date) =>
                      date.getDay() !== 0 && date.getDay() !== 6
                    } // Example validation to disable weekends
                  />
                  {formErrors.toDate && (
                    <span className="error">{formErrors.toDate}</span>
                  )}
                </div>
              </div>
              <div>
                <label name="totalDays">Total Days: </label>
                <input name="totalDays" value={totalDays} readOnly />
                <br />
                {formErrors.totalDays && (
                  <span className="error">{formErrors.totalDays}</span>
                )}
                <br />
                <label>Reason for Leave</label>
                <input
                  type="text"
                  name="reason_leave"
                  value={reasonLeave}
                  onChange={(e) => setReasonLeave(e.target.value)}
                  autoComplete="off"
                />
                {formErrors.reasonLeave && (
                  <span className="error">{formErrors.reasonLeave}</span>
                )}
              </div>
              <div>
                <label>Message</label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete="off"
                />
                {formErrors.message && (
                  <span className="error">{formErrors.message}</span>
                )}
              </div>
              <br />
              <input type="submit" value="Send" />
            </form> */}
          </div>
          {leaveHistory.length === 0 ? (
            <p>Currently No Leave have taken yet!</p>
          ) : (
            <div>
              <h3>Leave History</h3>
              <table className="LeaveTable">
                {/* Table headers */}
                <thead className="leaveth">
                  <tr className="leavetr">
                    <th className="from">From</th>
                    <th className="to">To</th>
                    <th className="reason">Reason</th>
                    <th className="message">Message</th>
                    <th className="total">Total Days</th>
                    <th className="status">Status</th>
                    <th className="reject">Approved/Rejected By</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {leaveHistory.map((leave, index) => (
                    <tr key={index} className="leavetr">
                      <td className="leavetd">
                        {new Date(leave.fromDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="leavetd">
                        {new Date(leave.toDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="leavetd">{leave.reasonLeave}</td>
                      <td className="leavetd">{leave.message}</td>
                      <td className="leavetd">{leave.totalDays}</td>
                      <td className="leavetd">{leave.status}</td>
                      <td className="leavetd">
                        {leave.status === "Approved" && (
                          <span>Approved by {leave.approvedBy}</span>
                        )}
                        {leave.status === "Rejected" && (
                          <span>
                            Rejected by {leave.approvedBy} - Reason:{" "}
                            {leave.AdminLeaveMessage}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ToastContainer />
  
  
    </>
  );
};

export default LeaveRequest;
