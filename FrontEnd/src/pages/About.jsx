import React from "react";

import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";

import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";

const About = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-richblack-700 pb-36">
        <div className="mx-auto w-11/12 max-w-maxContent text-center text-white flex flex-col items-center gap-10 py-20">
          <h1 className="text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighlightText text={" Brighter Future"} />
          </h1>

          <p className="text-richblack-300 lg:w-[70%]">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>

          {/* Banner Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10 ">
            <img
              src={BannerImage1}
              alt=""
              className="rounded-lg shadow-lg object-cover"
            />
            <img
              src={BannerImage2}
              alt=""
              className="rounded-lg shadow-lg object-cover"
            />
            <img
              src={BannerImage3}
              alt=""
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="border-b border-richblack-700 py-20">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <Quote />
        </div>
      </section>

      {/* FOUNDING STORY */}
      <section className="py-20">
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col lg:flex-row gap-12 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6 lg:w-[50%]">
            <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent text-4xl font-semibold">
              Our Founding Story
            </h2>

            <p className="text-richblack-300">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>

            <p className="text-richblack-300">
              We envisioned a platform that could bridge educational gaps and
              empower individuals from all walks of life to unlock their full
              potential.
            </p>
          </div>

          {/* Image */}
          <img
            src={FoundingStory}
            alt="Founding Story"
            className="rounded-lg shadow-[0_0_20px_0] shadow-[#FC6767]"
          />
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20">
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col lg:flex-row gap-16">
          {/* Vision */}
          <div className="flex flex-col gap-6 lg:w-[50%]">
            <h2 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent text-4xl font-semibold">
              Our Vision
            </h2>

            <p className="text-richblack-300">
              We aim to revolutionize the way people learn by combining
              cutting-edge technology with engaging educational content,
              fostering a dynamic and interactive learning experience.
            </p>
          </div>

          {/* Mission */}
          <div className="flex flex-col gap-6 lg:w-[50%]">
            <h2 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent text-4xl font-semibold">
              Our Mission
            </h2>

            <p className="text-richblack-300">
              Our mission goes beyond just delivering courses online. We aim to
              build a collaborative learning community where individuals can
              connect, share knowledge, and grow together.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsComponenet />

      {/* LEARNING GRID + CONTACT */}
      <section className="mx-auto mt-20 w-11/12 max-w-maxContent flex flex-col gap-20 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* REVIEWS */}
      <section className="mx-auto my-20 w-11/12 max-w-maxContent text-white flex flex-col items-center gap-8">
        <h1 className="text-center text-4xl font-semibold">
          Reviews from other learners
        </h1>
      </section>

      <Footer />
    </div>
  );
};

export default About;
