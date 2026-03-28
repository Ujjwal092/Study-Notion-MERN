import React from "react";

import Footer from "../components/common/Footer";
import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactForm from "../components/ContactPage/ContactForm";
import ReviewSlider from "../components/common/ReviewSlider";

const Contact = () => {
  return (
    <div className="bg-richblack-900 text-white overflow-x-hidden">
      {/*  Contact Section */}
      <section className="mx-auto mt-16 md:mt-20 w-11/12 max-w-[1200px] flex flex-col lg:flex-row gap-8 md:gap-10">
        {/* Contact Details */}
        <div className="w-full lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-[60%]">
          <ContactForm />
        </div>
      </section>

      {/*  Reviews Section */}
      <section className="mx-auto my-16 md:my-24 w-11/12 max-w-[1200px] flex flex-col items-center gap-6 md:gap-8 px-2">
        <h1 className="text-center text-2xl md:text-4xl font-semibold leading-tight">
          What Our{" "}
          <span className="bg-gradient-to-r from-caribbeangreen-100 to-yellow-200 bg-clip-text text-transparent">
            Learners Say
          </span>
        </h1>
        {/* <ReviewSlider /> */}
        <ReviewSlider />
      </section>

      {/* Spacer */}
      <section className="h-10 md:h-20"></section>

      <Footer />
    </div>
  );
};

export default Contact;
