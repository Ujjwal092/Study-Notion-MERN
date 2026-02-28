import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";

import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div>
      {/*Section1  */}
      <div
        className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between"
      >
        <Link to={"/signup"}>
          <div
            className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding programs, you can study at your own speed, from
          anywhere in the world. Gain access to extensive resources such as
          practical projects, interactive quizzes, and personalized guidance
          from experienced instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>{" "}
          {/*here learn more is children active false means yellow*/}
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="relative mx-3 my-16 flex justify-center">
          {/* TOP SEMI-CIRCLE GLOW */}
          <div
            className="absolute -top-16 w-[80%] h-32 
                  bg-blue-500/40 
                  blur-3xl 
                  rounded-full"
          ></div>

          {/* WHITE OFFSET LAYER */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-white rounded-xl"></div>

          {/* VIDEO CARD */}
          <div
            className="relative rounded-xl overflow-hidden 
                  border border-blue-400/40 
                  shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          >
            <video muted loop autoPlay className="w-full">
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            glowColor="blue"
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n  <title>Nexora</title>\n</head>\n<body>\n  <h1>Build Your Future</h1>\n  <p>Code with confidence.<p>`}
            codeColor={"text-blue-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            glowColor="yellow"
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
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
            codeColor={"text-yellow-25"}
          />
        </div>

        <ExploreMore />
      </div>

      {/*Section 2  */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/*Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
        <InstructorSection />

        <h2 className="text-center text-4xl font-semobold mt-10">
          review from Other Learners
        </h2>
        {/* Review Slider here */}
      </div>

      {/*Footer */}
      <Footer />
    </div>
  );
};

export default Home;
