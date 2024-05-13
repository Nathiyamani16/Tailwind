// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Profile = () => {
//   const location = useLocation();
//   const user = location.state && location.state.user;
//   const [timeIn, setTimeIn] = useState(null);
//   const [timeOut, setTimeOut] = useState(null);
//   const [countdown, setCountdown] = useState(5);
//   const [timeEntries, setTimeEntries] = useState([]);
//   const [timeOutClicked, setTimeOutClicked] = useState(false); // New state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timeoutId;
//     if (countdown === 0) {
//       timeoutId = setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     }
//     return () => clearTimeout(timeoutId);
//   }, [countdown, navigate]);

//   useEffect(() => {
//     const checkPreviousTimeEntry = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/timesheet/${user._id}/latest-entry`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           if (data && data.timeIn && !data.timeOut) {
//             setTimeIn(new Date(data.timeIn));
//             setTimeOut(null); // Reset time out when time in is clicked
//           } else if (data && data.timeOut) {
//             setTimeOut(new Date(data.timeOut));
//           }
//         } else {
//           console.error("Error:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     };
//     checkPreviousTimeEntry();
//   }, [user._id]);

//   useEffect(() => {
//     const fetchTimeEntries = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/timesheet/${user._id}/entries`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setTimeEntries(data);
//         } else {
//           console.error("Error:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     };
//     fetchTimeEntries();
//   }, [user._id]);

//   const handleTimeIn = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/timesheet/timein/${user._id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ timeIn: new Date() }),
//         }
//       );
//       if (response.ok) {
//         setTimeIn(new Date());
//         setTimeEntries(prevTimeEntries => [
//           ...prevTimeEntries,
//           { timeIn: new Date() }
//         ]);
//         setTimeOut(null);
//       } else {
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const handleTimeOut = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/timesheet/timeout/${user._id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ timeOut: new Date() }),
//         }
//       );
//       if (response.ok) {
//         setTimeOut(new Date());
//         setTimeOutClicked(true); // Set timeOutClicked to true
//         const interval = setInterval(() => {
//           setCountdown((prevCount) => prevCount - 1);
//         }, 1000);
//         setTimeout(() => {
//           clearInterval(interval);
//         }, 5000);
//       } else {
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const convertToIST = (utcTimestamp) => {
//     return new Date(utcTimestamp).toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//     });
//   };

//   const formatDateTime = (dateTime) => {
//     const formattedDate = new Date(dateTime).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//     const formattedTime = new Date(dateTime).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     return `${formattedDate} - ${formattedTime}`;
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = timeEntries.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <div className="dashboard-container">
//         {timeIn && <p>Time In: {convertToIST(timeIn)}</p>}
//         {!timeOutClicked && timeOut && (
//           <p>Previous Time Out: {convertToIST(timeOut)}</p>
//         )}
//         {timeOutClicked && timeOut && <p>Time Out: {convertToIST(timeOut)}</p>}
//         {(!timeIn || (timeIn && timeOut)) && (
//           <button onClick={handleTimeIn}>Time In</button>
//         )}
//         {!timeOut && <button onClick={handleTimeOut}>Time Out</button>}
//         {timeOutClicked && countdown > 0 && timeOut && (
//           <p>Redirecting in {countdown} seconds...</p>
//         )}

//         <h2>Recent Logins</h2>
//         <table className="time-table">
//           <thead>
//             <tr>
//               <th>Time In</th>
//               <th>Time Out</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((entry, index) => (
//               <tr key={index}>
//                 <td>{entry.timeIn ? formatDateTime(entry.timeIn) : ""}</td>
//                 <td>{entry.timeOut ? formatDateTime(entry.timeOut) : ""}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="pagination">
//           { [1, 5, 10, 20].map((perPage, index) => (
//             <button key={index} onClick={() => setItemsPerPage(perPage)}>
//               {perPage}
//             </button>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate ,Link, NavLink} from "react-router-dom";
// const Profile = () => {
//   const location = useLocation();
//   const user = location.state && location.state.user;

//   const [timeIn, setTimeIn] = useState(null);
//   const [timeOut, setTimeOut] = useState(null);
//   const [countdown, setCountdown] = useState(5);
//   const [timeEntries, setTimeEntries] = useState([]);
//   const [timeOutClicked, setTimeOutClicked] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timeoutId;
//     if (countdown === 0) {
//       timeoutId = setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     }
//     return () => clearTimeout(timeoutId);
//   }, [countdown, navigate]);

//   useEffect(() => {
//     const checkPreviousTimeEntry = async () => {
//       try {
//         if (!user) {
//           console.log("User is null or undefined.");
//           return;
//         }

//         console.log("Fetching data for user:", user);
//         const response = await fetch(
//           `http://localhost:3000/timesheet/${user._id}/latest-entry`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Fetched data:", data);
//           if (data && data.timeIn && !data.timeOut) {
//             setTimeIn(new Date(data.timeIn));
//             setTimeOut(null);
//           } else if (data && data.timeOut) {
//             setTimeOut(new Date(data.timeOut));
//           }
//         } else {
//           console.error("Error:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     };
//     checkPreviousTimeEntry();
//   }, [user]);
  

//   useEffect(() => {
//     const fetchTimeEntries = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/timesheet/${user._id}/entries`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setTimeEntries(data);
//         } else {
//           console.error("Error:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     };
//     fetchTimeEntries();
//   }, [user._id]);

//   const handleTimeIn = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/timesheet/timein/${user._id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ timeIn: new Date() }),
//         }
//       );
//       if (response.ok) {
//         setTimeIn(new Date());
//         setTimeEntries((prevTimeEntries) => [
//           ...prevTimeEntries,
//           { timeIn: new Date() },
//         ]);
//         setTimeOut(null);
//       } else {
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const handleTimeOut = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/timesheet/timeout/${user._id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ timeOut: new Date() }),
//         }
//       );
//       if (response.ok) {
//         setTimeOut(new Date());
//         setTimeOutClicked(true); // Set timeOutClicked to true
//         const interval = setInterval(() => {
//           setCountdown((prevCount) => prevCount - 1);
//         }, 1000);
//         setTimeout(() => {
//           clearInterval(interval);
//         }, 5000);
//       } else {
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const convertToIST = (utcTimestamp) => {
//     return new Date(utcTimestamp).toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//     });
//   };

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link,NavLink } from "react-router-dom";
import PathNote from "./PathNote";

const Profile = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [timeEntries, setTimeEntries] = useState([]);
  const [timeOutClicked, setTimeOutClicked] = useState(false); // New state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    if (countdown === 0) {
      timeoutId = setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [countdown, navigate]);

  useEffect(() => {
    const checkPreviousTimeEntry = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/timesheet/${user._id}/latest-entry`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.timeIn && !data.timeOut) {
            setTimeIn(new Date(data.timeIn));
            setTimeOut(null); // Reset time out when time in is clicked
          } else if (data && data.timeOut) {
            setTimeOut(new Date(data.timeOut));
          }
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    checkPreviousTimeEntry();
  }, [user._id]);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/timesheet/${user._id}/entries`
        );
        if (response.ok) {
          const data = await response.json();
          setTimeEntries(data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchTimeEntries();
  }, [user._id]);

  const handleTimeIn = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/timesheet/timein/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ timeIn: new Date() }),
        }
      );
      if (response.ok) {
      setTimeIn(new Date());
      setTimeEntries(prevTimeEntries => [
        ...prevTimeEntries,
        { timeIn: new Date() }
      ]);
      setTimeOut(null);  
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleTimeOut = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/timesheet/timeout/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ timeOut: new Date() }),
        }
      );
      if (response.ok) {
        setTimeOut(new Date());
        setTimeOutClicked(true); // Set timeOutClicked to true
        const interval = setInterval(() => {
          setCountdown((prevCount) => prevCount - 1);
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
        }, 5000);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const convertToIST = (utcTimestamp) => {
    return new Date(utcTimestamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  };


  // Function to format date and time as "DD/MM/YYYY - hh:mm A"
  const formatDateTime = (dateTime) => {
    const formattedDate = new Date(dateTime).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} - ${formattedTime}`;
  };

  // Calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the timeEntries array to get the items for the current page
  const currentItems = timeEntries.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (

    <div>
      {/* component */}
      {user && (
      <div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.4/dist/tailwind.min.css"> */}
      {/* <header className="bg-white ">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          
          </h1>
        </div>
      </header> */}
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <a
                      href="#"
                      className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      My info
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Leave Request
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    ></a>
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    ></a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <div className="relative ml-3">
                    <div className="md:block lg:block sm:hidden max-w-md mx-auto">
                      <div className="relative  flex items-center w-full h-8 border border-gray-500 rounded-sm  bg-gray-600 overflow-hidden">
                        <div className="grid place-items-center w-12 bg-gray-600 text-gray-300">
                          <svg
                            xmlns=""
                            className="h-6 w-6 bg-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          ></svg>
                        </div>
                        <input
                          className="bg-gray-600 outline-none text-sm text-gray-300 pr-2"
                          type="text"
                          id="search"
                          placeholder="Search something.."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <a
                  href="#"
                  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                  aria-current="page"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  My info
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  leaveRequests
                </a>
                {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Pricing</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Blogs</a> */}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="md:block lg:block sm:hidden max-w-md mx-auto">
                    <div className="relative  flex items-center w-full h-8 border border-gray-500 rounded-sm  bg-gray-600 overflow-hidden">
                      <div className="grid place-items-center w-12 bg-gray-600 text-gray-300"></div>
                      <input
                        className="bg-gray-600 outline-none text-sm text-gray-300 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search something.."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="bg-blue-300 flex justify-between">
          <div className=" max-w-2xl px-4 py-6 bg-blue-300 sm:px-6 lg:px-8 hidden lg:block md:block">

          {/* <PathNote user = {user}/> */}
            {user && user.profileImage && (
              <img
                src={`http://localhost:3000/${user.profileImage}`}
                alt={user.name}
                className="rounded-full w-40 h-40"
              />
            )}
          </div>
          <div className="bg-blue-300  max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className=" text-3xl font-sans tracking-tight text-gray-900">
              {user.name}
            </h1>
            <p className="ml-10">{user.role}</p>
          </div>
          <div className="bg-blue-300 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <div className="flex-1">{/* Rest of content */}</div>
              <div className="flex space-x-4 hidden lg:block md:block">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                  Request a Change
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
        <main>
          <div className=" max-w-7xl py-0 ">
            <div className="md:flex no-wrap md:-mx-2  ">
              <div className=" w-full md:w-3/12 ">
                <div className=" p-3 ">
                  <ul className="-mt-3 text-sm font-semibold text-gray-500 hover:text-gray-700 py-2 px-3 mt-3 divide-y rounded bg-white ">
                    <li className="items-center py-3">
                      <span>{user.email}</span>
                      <br />
                      <span className="ml-auto">EmployeeID</span>
                    </li>
                    <li className="items-center py-3">
                      {/* <h1>Hire date</h1>
  <span>Jan 19 2017</span><br /> */}
                      {/* <span className="ml-auto">10m - 15d</span> */}
                      {timeIn && <p>Time In: {convertToIST(timeIn)}</p>}
                      {!timeOutClicked && timeOut && (
                        <p>Previous Time Out: {convertToIST(timeOut)}</p>
                      )}
                      {timeOutClicked && timeOut && (
                        <p>Time Out: {convertToIST(timeOut)}</p>
                      )}
                      {(!timeIn || (timeIn && timeOut)) && (
                        <button
                          onClick={handleTimeIn}
                          className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-600"
                        >
                          Time In
                        </button>
                      )}
                      {!timeOut && (
                        <button
                          onClick={handleTimeOut}
                          className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-600"
                        >
                          Time Out
                        </button>
                      )}
                      {timeOutClicked && countdown > 0 && timeOut && (
                        <p>Redirecting in {countdown} seconds...</p>
                      )}
                    </li>

                    <li className=" items-center py-3">
                      <span>Full-time</span>
                      <br />
                      <span className="ml-auto">{user.role}</span>
                      {/* <span className="ml-auto">North America</span>
                      <span className="ml-auto">Lindon , Utah</span> */}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full mx-2   md:block lg:block md:-mt-24 sm:mt-0">
                <div className="hidden md:block lg:block">
                  <ul className="flex bg-white ">
                    <li className=" mr-1">
                   

                    </li>
                    <li className="mr-1">
                  
                   {/* Example of passing user object in the Link component */}
                   <Link 
                    className="rounded-sm bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold shadow-md"
                   to="/user/about" state={{ user }}>About</Link>

                    </li>
                    <li className="mr-1">
                    <Link 
                    className="rounded-sm bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold shadow-md"
                   to="/user/leaverequest" state={{ user }}>Leave Request</Link>
                     
                      
                    </li>
                    <li className="mr-1">
                      <a
                        className="rounded-sm bg-white inline-block py-2 px-4 border-l border-t border-r rounded-t py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                        href="#"
                      >
                        Emergency
                      </a>
                    </li>
                    <li className="mr-1">
                      <a
                        className="rounded-sm bg-white inline-block py-2 px-4 border-l border-t border-r rounded-t py-2 px-1 text-blue-500 hover:text-blue-800 font-semibold"
                        href="#"
                      >
                        Document
                      </a>
                    </li>
                    <li className="mr-1">
                      <a
                        className="rounded-sm bg-white inline-block py-2 px-4 border-l border-t border-r rounded-t py-2 px-1 text-blue-500 hover:text-blue-800 font-semibold"
                        href="#"
                      >
                        Notes
                      </a>
                    </li>
                    <li className="mr-1">
                      <a
                        className="bg-white inline-block py-2 px-4 border-l border-t border-r rounded-t text-blue-500 hover:text-blue-800 font-semibold"
                        href="#"
                      >
                        Benefits
                      </a>
                    </li>
                    <li className="mr-1">
                      <a
                        className="bg-white inline-block py-2 px-4 border-l border-t border-r rounded-t text-blue-500 hover:text-blue-800 font-semibold"
                        href="#"
                      >
                        Training
                      </a>
                    </li>
                    <li className="mr-1">
                      <a
                        className="bg-white inline-block py-2 px-4 border-l border-t border-r rounded-t text-blue-500 hover:text-blue-800 font-semibold"
                        href="#"
                      >
                        performance
                      </a>
                    </li>
                    <li className="mr-1">
                      <a
                        className="bg-white inline-block py-2 px-4 border-l border-t border-r rounded-t text-blue-500 hover:text-blue-800 font-semibold"
                        href="#"
                      >
                        Assets
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-3  rounded-sm ">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide px-2">Personal</span>
                  </div>
                  <div className="flex my-2 py-1">
                    <span className="tracking-wide px-2 bg-blue-500 text-white rounded-md shadow-xl">
                      Upload
                    </span>
                    <span className="tracking-wide px-2">Files</span>
                  </div>
                </div>
                <div className="my-1 " />
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 sm:block ">
                  <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                    <table className="min-w-full">
                      <thead className="bg-gray-200 ">
                        <tr>
                          <th className="text-left py-2 px-3 border-r border-gray-300 ">
                            Name
                          </th>
                          <th className="text-left py-2 px-3 border-r border-gray-300">
                            Date
                          </th>
                          <th className="text-left py-2 px-3 border-r border-gray-300">
                            Time
                          </th>
                          <th className="text-left py-2 px-3 border-r border-gray-300">
                            Location
                          </th>
                          <th className="text-left py-2 px-3">More</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            Bollywood
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            13/01/2020
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            2:00 pm
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">India</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="border bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded">
                              edit
                            </button>
                            <button className="border bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                              delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="md:block lg:block hidden">
                  <div className="flex items-center justify-center space-x-4">
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md">
                      Request a Change
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <footer className="bg-gray-800 mt-auto ">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-300">Powered by SafariHR &copy; 2023 - 2024</p>
          </div>
        </footer> */}
      </div>
      </div>
        )}
    </div>
  
  );
};

export default Profile;
