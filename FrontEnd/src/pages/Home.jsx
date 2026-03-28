import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

import Banner from "../assets/Images/banner.mp4";

const Home = () => {
  return (
    <div className="bg-richblack-900 overflow-x-hidden ">
      {/* HERO SECTION */}
      <section className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white">
        {/* Instructor CTA */}
        <Link to="/signup">
          <div
            className="group mt-16 p-1 rounded-full bg-richblack-800 text-richblack-200 
            transition hover:scale-95"
          >
            <div
              className="flex items-center gap-2 px-8 py-2 rounded-full 
              group-hover:bg-richblack-900 transition"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <h1 className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </h1>

        {/* Subheading */}
        <p className="mt-4 w-[90%] text-center text-lg text-richblack-300">
          With our online coding programs, you can study at your own speed, from
          anywhere in the world. Gain access to practical projects, interactive
          quizzes, and guidance from experienced instructors.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkto="/signup">
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto="/login">
            Book a Demo
          </CTAButton>
        </div>

        {/* VIDEO SECTION */}
        <div className="relative my-16 flex justify-center">
          {/* glow */}
          <div className="absolute -top-16 w-[80%] h-32 bg-blue-500/40 blur-3xl rounded-full"></div>

          {/* offset white card */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-white rounded-xl"></div>

          {/* video card */}
          <div className="relative rounded-xl overflow-hidden border border-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <video
              muted
              loop
              autoPlay
              playsInline
              className="w-full rounded-xl"
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* CODE SECTION 1 */}
        <CodeBlocks
          position={"lg:flex-row"}
          glowColor="blue"
          heading={
            <div className="text-4xl font-semibold">
              Unlock Your <HighlightText text={"coding potential"} /> with our
              online courses
            </div>
          }
          subheading="Our courses are designed by industry experts with years of experience."
          ctabtn1={{
            btnText: "Try it Yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<!DOCTYPE html>
<html>
<head>
  <title>Nexora</title>
</head>
<body>
  <h1>Build Your Future</h1>
  <p>Code with confidence.</p>
</body>
</html>`}
          codeColor="text-blue-25"
        />

        {/* CODE SECTION 2 */}
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          glowColor="yellow"
          heading={
            <div className="text-4xl font-semibold">
              Start learning <HighlightText text={"coding with projects"} /> One
              step solution for your success
            </div>
          }
          subheading="Learn coding through real-world projects and hands-on practice."
          ctabtn1={{
            btnText: "Continue Lesson",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/login",
            active: false,
          }}
          codeblock={`def greet(name):
    course = "Nexora Pro"
    level = "Beginner"

    print(f"Welcome {name} 🚀")
    print(f"Course: {course}")
    print(f"Level: {level}")

    return "Start Learning"

greet("Future Developer")`}
          codeColor="text-yellow-25"
        />

        <ExploreMore />
      </section>

      {/* SECTION 2 */}
      <section className="bg-pure-greys-5 text-richblack-700">
        {/* CTA BANNER */}
        <div className="homepage_bg h-[310px] flex items-center">
          <div className="w-11/12 max-w-[1200px] mx-auto flex justify-center gap-7 text-white mt-4">
            <CTAButton active={true} linkto="/signup">
              <div className="flex items-center gap-3">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </CTAButton>

            <CTAButton active={false} linkto="/signup">
              Learn more
            </CTAButton>
          </div>
        </div>

        {/* SKILLS SECTION */}
        <div className="mx-auto w-11/12 max-w-[1200px] flex flex-col gap-16 py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="text-4xl font-semibold lg:w-[45%]">
              Get the Skills you need for a{" "}
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-6 lg:w-[40%]">
              <p>
                The modern StudyNotion dictates its own terms. To stay
                competitive today you need more than just professional skills.
              </p>

              <CTAButton active={true} linkto="/signup">
                Learn more
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="w-11/12 mx-auto max-w-[1200px] flex flex-col items-center gap-10 py-16 text-white">
        <InstructorSection />

        <h1 className="text-center text-2xl md:text-4xl font-semibold leading-tight">
          What Our{" "}
          <span className="bg-gradient-to-r from-caribbeangreen-100 to-yellow-200 bg-clip-text text-transparent">
            Learners Say
          </span>
        </h1>

        {/* review slider */}
        <ReviewSlider />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
