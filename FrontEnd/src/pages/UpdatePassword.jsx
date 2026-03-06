import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/operations/authAPI";

function UpdatePassword() {
  // React Router navigation
  const navigate = useNavigate();

  // Redux dispatch
  const dispatch = useDispatch();

  // Current URL location (to extract token)
  const location = useLocation();

  // Loading state from redux auth slice
  const { loading } = useSelector((state) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // State for showing / hiding passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Destructure values
  const { password, confirmPassword } = formData;

  // Handle input field changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,

      // update the specific field dynamically
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit handler
  const handleOnSubmit = (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Extract reset token from URL
    // Example URL: /update-password/token123
    const token = location.pathname.split("/").at(-1);

    // Dispatch API call
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    // Full page center layout
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center px-4">
      {/* Loader while API is processing */}
      {loading ? (
        <div className="spinner"></div>
      ) : (
        // Main auth card container
        <div className="w-full max-w-[450px] rounded-xl bg-richblack-800 p-8 shadow-lg">
          {/* Heading */}
          <h1 className="text-3xl font-semibold text-richblack-5">
            Choose New Password
          </h1>

          {/* Description */}
          <p className="mt-2 text-richblack-300">
            Almost done. Enter your new password and you're all set.
          </p>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="mt-6 flex flex-col gap-5">
            {/* New Password Field */}
            <label className="relative">
              <p className="mb-1 text-sm text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showPassword ? "text" : "password"} // toggle type
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full rounded-md bg-richblack-700 p-3 pr-10 text-richblack-5"
              />

              {/* Toggle password visibility */}
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} color="#AFB2BF" />
                ) : (
                  <AiOutlineEye size={22} color="#AFB2BF" />
                )}
              </span>
            </label>

            {/* Confirm Password Field */}
            <label className="relative">
              <p className="mb-1 text-sm text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className="w-full rounded-md bg-richblack-700 p-3 pr-10 text-richblack-5"
              />

              {/* Toggle confirm password visibility */}
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={22} color="#AFB2BF" />
                ) : (
                  <AiOutlineEye size={22} color="#AFB2BF" />
                )}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 rounded-md bg-yellow-50 py-3 font-medium text-richblack-900 hover:scale-[0.98] transition"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
          <Link
            to="/login"
            className="mt-6 flex items-center gap-2 text-richblack-200 hover:text-richblack-5"
          >
            <BiArrowBack />
            Back To Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
