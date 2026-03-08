import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);

      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);

      setLoading(false);
      alert("Message sent successfully 🚀");
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      alert("Something went wrong!");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="flex flex-col gap-6"
    >
      {/* NAME */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-2 lg:w-[50%]">
          <label className="lable-style">First Name</label>

          <input
            type="text"
            autoComplete="given-name"
            className="form-style"
            placeholder="Enter first name"
            {...register("firstname", { required: "First name is required" })}
          />

          {errors.firstname && (
            <span className="text-xs text-yellow-100">
              {errors.firstname.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[50%]">
          <label className="lable-style">Last Name</label>

          <input
            type="text"
            autoComplete="family-name"
            className="form-style"
            placeholder="Enter last name"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <label className="lable-style">Email Address</label>

        <input
          type="email"
          autoComplete="email"
          className="form-style"
          placeholder="Enter email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />

        {errors.email && (
          <span className="text-xs text-yellow-100">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* PHONE */}
      <div className="flex flex-col gap-2">
        <label className="lable-style">Phone Number</label>

        <div className="flex gap-4">
          <select
            className="form-style w-[90px]"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code}
              </option>
            ))}
          </select>

          <input
            type="tel"
            autoComplete="tel"
            placeholder="Enter your 10 digit phone number"
            className="form-style flex-1"
            {...register("phoneNo", {
              required: "Phone number required",
              pattern: {
                value: /^[0-9]{10,12}$/,
                message: "Invalid phone number",
              },
            })}
          />
        </div>

        {errors.phoneNo && (
          <span className="text-xs text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* MESSAGE */}
      <div className="flex flex-col gap-2">
        <label className="lable-style">Message</label>

        <textarea
          rows="6"
          className="form-style"
          placeholder="Enter your message"
          {...register("message", {
            required: "Message cannot be empty",
          })}
        />

        {errors.message && (
          <span className="text-xs text-yellow-100">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className={`rounded-md bg-yellow-50 px-6 py-3 font-semibold text-black
        ${!loading && "hover:scale-95 transition duration-200"}
        disabled:bg-richblack-500`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
