// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Datatable from '../Employee/Datatable';
// import { useLocation } from "react-router-dom";

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };

// const BASE_URL = "http://localhost:3000";

// const AdminLeavehistory = () => {
//   const location = useLocation();
//   const user = location.state && location.state.user;
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [AdminLeaveMessage, setAdminLeaveMessage] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const [timeEntries, setTimeEntries] = useState("");
  
//   useEffect(() => {
//     const fetchLeaveRequests = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/admin/leave-requests`
//         );
//         const sortedData = response.data.sort((a, b) =>
//           b._id.localeCompare(a._id)
//         );
//         setLeaveRequests(sortedData);
//       } catch (error) {
//         console.error("Error fetching leave requests:", error);
//       }
//     };

//     fetchLeaveRequests();
//   }, []);

//   const handleApprove = async (requestId) => {
//     try {
//       await axios.put(
//         `${BASE_URL}/admin/leave-requests/${requestId}`,
//         { status: "Approved", AdminLeaveMessage, adminName: user.name }
//       );
//       const updatedRequests = leaveRequests.map((request) =>
//         request._id === requestId
//           ? { ...request, status: "Approved", approvedBy: user.name }
//           : request
//       );
//       setLeaveRequests(updatedRequests);
//       setAdminLeaveMessage("");
//     } catch (error) {
//       console.error("Error approving leave request:", error);
//     }
//   };

//   const handleSendMessage = async (requestId, AdminLeaveMessage, user) => {
//     try {
//       if (!AdminLeaveMessage.trim()) {
//         alert("Please enter a message");
//         return;
//       }

//       if (!user || !user.name) {
//         console.error("User information is missing");
//         return;
//       }
//       console.log("User name:", user.name);
//       await axios.put(
//         `${BASE_URL}/admin/leave-requests/${requestId}`,
//         { AdminLeaveMessage, status: "Rejected", adminName: user.name } // Send admin's name to backend
//       );
//       const updatedRequests = leaveRequests.map((request) =>
//         request._id === requestId
//           ? {
//               ...request,
//               AdminLeaveMessage,
//               status: "Rejected",
//               approvedBy: user.name,
//             }
//           : request
//       );
//       setLeaveRequests(updatedRequests);
//       setAdminLeaveMessage("");
//     } catch (error) {
//       console.error("Error sending message for leave request:", error);
//     }
//   };

//   const handleUserChange = (event) => {
//     setSelectedUser(event.target.value);
//   };

//   const filteredRequests = selectedUser
//     ? leaveRequests.filter((request) => request.name === selectedUser)
//     : leaveRequests;

//   const columns = [
//     {
//       title: 'Profile Image',
//       field: 'profileImage',
//       render: (rowData) => (
//         <div className="left">
//           {rowData.profileImage && (
//             <img
//               src={`${BASE_URL}/${rowData.profileImage}`}
//               alt={rowData.name}
//               className="images"
//             />
//           )}
//         </div>
//       ),
//     },
//     { title: 'Name', field: 'name' },
//     { title: 'Email', field: 'email' },
//     { title: 'From Date', field: 'fromDate', render: (rowData) => formatDate(rowData.fromDate) },
//     { title: 'To Date', field: 'toDate', render: (rowData) => formatDate(rowData.toDate) },
//     { title: 'Total Days', field: 'totalDays' },
//     { title: 'Reason', field: 'reasonLeave' },
//     { title: 'Status', field: 'status' },
//     { title: 'Status Message', field: 'AdminLeaveMessage' },
//     { title: 'Approved By', field: 'approvedBy' },
//     {
//       title: 'Actions',
//       field: 'actions',
//       render: (rowData) => {
//         if (rowData.status === "Pending") {
//           return (
//             <>
//               <button onClick={() => handleApprove(rowData._id)}>Approve</button>
//               <input
//                 type="text"
//                 placeholder="Enter Why Reject"
//                 value={AdminLeaveMessage}
//                 onChange={(e) => setAdminLeaveMessage(e.target.value)}
//               />
//               <button onClick={() => handleSendMessage(rowData._id, AdminLeaveMessage, user)}>Reject</button>
//             </>
//           );
//         } else {
//           return null;
//         }
//       }
//     }
//   ];

//   return (
//     <div>
     

//       <Datatable
//         data={filteredRequests}
//         columns={columns}
//       />
//     </div>
//   );
// };

// export default AdminLeavehistory;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Datatable from '../Employee/Datatable';
import { useLocation } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Define base URL
const BASE_URL = "http://localhost:3000";

const AdminLeavehistory = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [AdminLeaveMessage, setAdminLeaveMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [timeEntries, setTimeEntries] = useState("");
  
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/leave-requests`
        );
        const sortedData = response.data.sort((a, b) =>
          b._id.localeCompare(a._id)
        );
        setLeaveRequests(sortedData);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axios.put(
        `${BASE_URL}/admin/leave-requests/${requestId}`,
        { status: "Approved", AdminLeaveMessage, adminName: user.name }
      );
      const updatedRequests = leaveRequests.map((request) =>
        request._id === requestId
          ? { ...request, status: "Approved", approvedBy: user.name }
          : request
      );
      setLeaveRequests(updatedRequests);
      setAdminLeaveMessage("");
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const handleSendMessage = async (requestId, AdminLeaveMessage, user) => {
    try {
      if (!AdminLeaveMessage.trim()) {
        alert("Please enter a message");
        return;
      }

      if (!user || !user.name) {
        console.error("User information is missing");
        return;
      }
      console.log("User name:", user.name);
      await axios.put(
        `${BASE_URL}/admin/leave-requests/${requestId}`,
        { AdminLeaveMessage, status: "Rejected", adminName: user.name } // Send admin's name to backend
      );
      const updatedRequests = leaveRequests.map((request) =>
        request._id === requestId
          ? {
              ...request,
              AdminLeaveMessage,
              status: "Rejected",
              approvedBy: user.name,
            }
          : request
      );
      setLeaveRequests(updatedRequests);
      setAdminLeaveMessage("");
    } catch (error) {
      console.error("Error sending message for leave request:", error);
    }
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const filteredRequests = selectedUser
    ? leaveRequests.filter((request) => request.name === selectedUser)
    : leaveRequests;

  const columns = [
    {
      title: 'Profile Image',
      field: 'profileImage',

      render: (rowData) => (
        <div className="left">
          {rowData.profileImage && (
           <img
           
           src={`${BASE_URL}/${rowData.profileImage}`}
           className='w-32 h-16 object-contain rounded-md'
           alt={rowData.profileImage}
           onError={(e) => { e.target.src = 'placeholder-image-url' }}
         />
         
          )}
        </div>
      ),
    },{ title: 'Name', field: 'name', cellStyle: { backgroundColor: '#F7CAC9' },headerStyle: { fontWeight: 'bold', color: 'blue'} },
    { title: 'Email', field: 'email', cellStyle: { backgroundColor: '#ACE5EE' },headerStyle: { fontWeight: 'bold', color: 'blue' } },
    { title: 'From Date', field: 'fromDate', render: (rowData) => formatDate(rowData.fromDate), cellStyle: { backgroundColor: '#D5F5E3' } ,headerStyle: { fontWeight: 'bold', color: 'blue' ,textAlign:"center"}},
    { title: 'To Date', field: 'toDate', render: (rowData) => formatDate(rowData.toDate), cellStyle: { backgroundColor: '#F9E79F' } ,headerStyle: { fontWeight: 'bold', color: 'blue' }},
    { title: 'Total Days', field: 'totalDays', cellStyle: { backgroundColor: '#D7BDE2' } ,headerStyle: { fontWeight: 'bold', color: 'blue' },},
    { title: 'Reason', field: 'reasonLeave', cellStyle: { backgroundColor: '#F5CBA7' },headerStyle: { fontWeight: 'bold', color: 'blue' } },
    { title: 'Status', field: 'status', cellStyle: { backgroundColor: '#ABEBC6' } ,headerStyle: { fontWeight: 'bold', color: 'blue' }},
    { title: 'Status Message', field: 'AdminLeaveMessage', cellStyle: { backgroundColor: '#E8DAEF' } ,headerStyle: { fontWeight: 'bold', color: 'blue' }},
    { title: 'Approved By', field: 'approvedBy', cellStyle: { backgroundColor: '#FADBD8' } ,headerStyle: { fontWeight: 'bold', color: 'blue' }},
    {
      title: 'Actions',
      field: 'actions',
      render: (rowData) => {
        if (rowData.status === "Pending") {
          return (
            <>
              <button onClick={() => handleApprove(rowData._id)}>Approve</button>
              <input
                type="text"
                placeholder="Enter Why Reject"
                value={AdminLeaveMessage}
                onChange={(e) => setAdminLeaveMessage(e.target.value)}
              />
              <button onClick={() => handleSendMessage(rowData._id, AdminLeaveMessage, user)}>Reject</button>
            </>
          );
        } else {
          return null;
        }
      }
    }
  ];
  

  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">

      <Datatable
        data={filteredRequests}
        columns={columns}
        title="Employee Leave History"
      />
    </div>
    </div>
  );
};

export default AdminLeavehistory;
