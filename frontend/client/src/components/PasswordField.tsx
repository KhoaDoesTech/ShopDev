/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

interface PasswordFieldProps {
  field: any;
}
const PasswordField = ({ field }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative inline-block w-full">
      <input
        className="w-full p-2 border border-gray-300 rounded-sm bg-white text-gray-900 focus:border-sky-500 focus:border-2 focus:outline-none"
        type={showPassword ? "text" : "password"}
        {...field}
      />
      <button
        className="bg-transparent hover:bg-transparent w-fit absolute top-1/2 right-2 -translate-y-1/2"
        type="button"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>
    </div>
    // <div style={{ display: "flex" }}>
    //   <input
    //     type={showPassword ? "text" : "password"}
    //     id="password"
    //     className="w-full p-2 border border-gray-300 rounded-sm bg-white text-gray-900 focus:border-sky-500 focus:border-2 focus:outline-none"
    //     value={value}
    //     onChange={handlePasswordChange}
    //   />
    //   {showPassword ? (
    //     <FaRegEye onClick={togglePasswordVisibility} />
    //   ) : (
    //     <FaRegEyeSlash onClick={togglePasswordVisibility} />
    //   )}
    // </div>
  );
};

export default PasswordField;
