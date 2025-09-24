import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft, X, CheckCircle } from "lucide-react";
import AuthContainer from "../../Components/AuthContainer";
import { Link, useLocation, useRouteLoaderData } from "react-router-dom";
import AuthAlert from "../../Components/AuthAlert";

const ResetPasswordPage = () => {
  
  const location = useLocation();
  let token = new URLSearchParams(location.search).get("token");

  const [passwords, setPasswords] = useState({
    newPassword: "",
    token: token,
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    showMismatchError: false,
  });

  const [alert, setAlert] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!passwords.newPassword.trim())
      newErrors.newPassword = "Password is required";
    if (!passwords.confirmPassword.trim())
      newErrors.confirmPassword = "Password is required";
    if (passwords.newPassword.trim().length < 8 && passwords.newPassword.trim())
      newErrors.newPassword = "Password must have a minimum of 8 characters";
    if (
      passwords.confirmPassword.trim().length < 8 &&
      passwords.confirmPassword.trim()
    )
      newErrors.confirmPassword =
        "Password must have a minimum of 8 characters";
    if (
      passwords.newPassword
        .split("")
        .some((character) => character === "" || character === " ")
    )
      newErrors.newPassword = "Spaces are not allowed in password";
    if (
      passwords.confirmPassword
        .split("")
        .some((character) => character === "" || character === " ")
    )
      newErrors.confirmPassword = "Spaces are not allowed in password";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const BASE_URL = "https://fischerbon.onrender.com";

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswords((prev) => ({ ...prev, showMismatchError: true }));
      return;
    } else {
      setPasswords((prev) => ({ ...prev, showMismatchError: false }));
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwords.newPassword , token: passwords.token }),
      });

      const result = await response.json();

      if (!result.success) {
        setStatus("failure");
      } else {
        setStatus("success");
      }
    } catch (error) {
      setAlert("network");
      // console.error(error);
    }
  };


  return (
    <>
      {alert === "network" ? (
        <AuthAlert
          header={"Network Error"}
          message={"You're not connected to the internet"}
          iconType={"error"}
          onClose={() => setAlert("")}
        />
      ) : (
        ""
      )}

      {status === "failure" ? (
        <AuthContainer>
          <div className="space-y-7 text-center items-center justify-center flex flex-col">
            <div className="rounded-full bg-[#e89999] text-[#F11010] p-5 opacity-90">
              <X />
            </div>

            <div className="max-w-md">
              <h5 className="text-dark font-medium text-[16px] lg:text-[22px] leading-6 lg:leading-9">
                Password Reset Failed
              </h5>
              <p className="text-[16px] lg:text-lg leading-6 lg:leading-7 text-gray font-normal">
                We couldn’t update your password
              </p>
            </div>
            <button
              onClick={() => setStatus("")}
              className="mb-5 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
            >
              Try Again
            </button>
          </div>
          <Link to="/login">
            <p className="text-center flex justify-center text-[14px] text-dark cursor-pointer leading-5 items-center gap-2">
              <span className="text-center">
                <ArrowLeft size="20" />
              </span>
              <span className="text-center">Back to log in</span>
            </p>
          </Link>
        </AuthContainer>
      ) : status === "success" ? (
        <AuthContainer>
          <div className="space-y-5 text-center items-center justify-center flex flex-col">
            <div className="rounded-full bg-[#c1d4de] text-primary p-5 opacity-90">
              <CheckCircle />
            </div>

            <div className="max-w-md">
              <h5 className="text-dark font-medium text-[16px] lg:text-[22px] leading-6 lg:leading-9">
                Password Reset Successful
              </h5>
              <p className="text-[16px] lg:text-lg leading-6 lg:leading-7 text-gray font-normal">
                Your new password has been saved. You can now sign in to your
                account
              </p>
            </div>
            <Link to="/login" className="w-full">
              <button className="mb-3 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors">
                Go to Login
              </button>
            </Link>
          </div>
        </AuthContainer>
      ) : (
        <AuthContainer
          title="Reset Your Password"
          subtitle="Create a new password to secure your account"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray mb-1"
                >
                  Enter your password
                </label>
                <input
                  type={passwords.showPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your new password"
                  className="w-full p-3 border-2 rounded-md border-accent outline-none placeholder:text-accent text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
                />
                <span
                  onClick={() =>
                    setPasswords((prev) => ({
                      ...prev,
                      showPassword: !prev.showPassword,
                    }))
                  }
                  className="absolute right-3 top-10 cursor-pointer text-accent"
                >
                  {passwords.showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray mb-1"
                >
                  Confirm password
                </label>
                <input
                  type={passwords.showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  className="w-full p-3 border-2 rounded-md border-accent outline-none placeholder:text-accent text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
                />
                <span
                  onClick={() =>
                    setPasswords((prev) => ({
                      ...prev,
                      showConfirmPassword: !prev.showConfirmPassword,
                    }))
                  }
                  className="absolute right-3 top-10 cursor-pointer text-accent"
                >
                  {passwords.showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {passwords.showMismatchError && (
              <p className="text-red-500 text-sm mt-1">
                *Passwords do not match
              </p>
            )}

            <button
              type="submit"
              className="mb-2 bg-primary text-white hover:bg-primaryHover w-full font-medium py-3 px-4 rounded-md cursor-pointer transition-colors"
            >
              Update Password
            </button>
          </form>
        </AuthContainer>
      )}
    </>
  );
};

export default ResetPasswordPage;
