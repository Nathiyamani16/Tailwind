import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loginform from "../Stlye/Loginform";

// import { useAuth } from "../Auth/AuthContext";

const LoginPage = () => {
  // const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(""); // New state for handling errors
  // const { setUser } = useAuth();

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (response.ok) {
  //       console.log("Login successful");
  //       const userData = await response.json();

  //       if (userData.user.category === 'Admin') {
  //         navigate("/Admin", { state: { user: userData.user } } );
  //       } else if (userData.user.category === 'SuperAdmin') {
  //         navigate('/SuperAdmin' , { state: {user: userData.user}})
  //       } else{
  //         navigate("/dashboard", { state: { user: userData.user } });
  //       }
  //     } else {
  //       const errorMessage = await response.text(); // Extract error message from response
  //       setError(errorMessage); // Set error state
  //       console.error("Error:", errorMessage);
  //     }
  //   } catch (error) {
  //     setError("An error occurred while logging in. Please try again."); // Set generic error message
  //     console.error("Error:", error.message);
  //   }
  // };\      <input className="border shadow-xl rounded-md focus border-cyan-500 text-xl forced-colors:re"
//   placeholder="Enter your email Id"
//   // value={email}
//   // onChange={(e) => setEmail(e.target.value)}
// />
// <input
//   placeholder="Password"
//   type="password"
//   // value={password}
//   // onChange={(e) => setPassword(e.target.value)}
// />
// {/* onClick={handleLogin} */}
// <button >Login</button>
// {/* {error && <p className="error-message">{error.replace('{"message":"','').replace('"}','')}</p>} */}

//  {/* Display error message without {"message":} */}
// {/* </LoginCard> */}

  return (
    <div className="w-full items-center justify-center flex-1  gap-4">

<div className="py-2 flex-1 flex items-center  ">

      <Loginform/>
</div>

    <div className="py-2 flex-1 flex items-center justify-end relative ">
    <div className="w-fullm md:w-460 ml-0
    flex flex-wrap items-center justify-center gap-4 gap-y-14 ">
 
    </div>
    </div>

    </div>
  );
};

export default LoginPage;
