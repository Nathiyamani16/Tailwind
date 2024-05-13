import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";

const AdminHome = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("User");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateEmployee = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("employeeId", employeeId);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("profileImage", profileImage);
      formData.append("category", category);
  
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        body: formData,
      });
  
      if (response.status === 201) {
        console.log("User created successfully");
        navigate("/home");
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleInputChange = (fieldName, value) => {
    setValidationErrors({ ...validationErrors, [fieldName]: "" });
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "employeeId":
        setEmployeeId(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center flex-col pt-6 px-24 w-full">
      <div
        className="border shadow-xl border-gray-500 rounded-md p-4 w-full 
      flex flex-col items-center justify-center gap-3 h-auto"
      >
        <h1 className="text-red-400">Create a Employee</h1>
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          <div class="relative h-11 w-full min-w-[200px]">
            <input
              placeholder="Enter a Name here"
              value={name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-900 peer-focus:after:scale-x-100 peer-focus:after:border-blue-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Name
            </label>

            {validationErrors.name && <p>{validationErrors.name}</p>}
          </div>
          <div class="relative h-11 w-full min-w-[200px]">
            <input
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            {validationErrors.employeeId && (
              <p>{validationErrors.employeeId}</p>
            )}

            <label class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-900 peer-focus:after:scale-x-100 peer-focus:after:border-blue-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Employee ID here
            </label>
          </div>

          <div class="relative h-11 w-full min-w-[200px]">
            <input
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              placeholder="Email ID"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {validationErrors.email && <p>{validationErrors.email}</p>}
            <label class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-900 peer-focus:after:scale-x-100 peer-focus:after:border-blue-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Enter Email ID
            </label>
          </div>
          <div class="relative h-11 w-full min-w-[200px]">
            <input
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              placeholder="Role"
              value={role}
              onChange={(e) => handleInputChange("role", e.target.value)}
            />
            {validationErrors.role && <p>{validationErrors.role}</p>}
            <label class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-900 peer-focus:after:scale-x-100 peer-focus:after:border-blue-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Enter Employee Role
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-900 peer-focus:after:scale-x-100 peer-focus:after:border-blue-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Choose Role
            </label>
            <select
              label="Select category"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              variant="Role"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>

          <div class="relative h-11 w-full min-w-[200px]">
            <input
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            {validationErrors.password && <p>{validationErrors.password}</p>}

            <label className="text-sm after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-900 peer-focus:after:scale-x-100 peer-focus:after:border-blue-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Enter password here
            </label>
          </div>

          <div class="relative h-11 w-full min-w-[200px]">
            <input
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleProfileImageChange}
            />

            {validationErrors.profileImage && (
              <p>{validationErrors.profileImage}</p>
            )}
            <label className=" text-sm after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-900 peer-focus:after:scale-x-100 peer-focus:after:border-blue-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Upload Profile image:
            </label>
          </div>
          <button
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            onClick={handleCreateEmployee}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
