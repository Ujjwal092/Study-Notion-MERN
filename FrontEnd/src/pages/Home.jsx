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
        {/* signup pr le jaiga */}{" "}
        {/**group is used to style child elements  based on the state of a parent element */}
        <Link to={"/signup"}>
          <div
            className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit "
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900" //on hover parent group bg color changes
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
          {/* span tag v use kr skte hai */}
        </div>
        <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          {/**call to action */}
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>

          {/**h/w */}
        </div>
        <div className=" relative  w-[900px] h-[515px]  mx-3 my-12  bg-white bg-gradient-to-t">
          <video
            muted
            loop
            autoPlay
            className="absolute h-[515px] pr-5 object-cover "
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={" coding potential"} />
                <span className=" " /> with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
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
<title>Study-Notion</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Namste!!</h1>
<h1>Study-Notion</h1>
</body>
</html>`}
            codeColor={
              "bg-gradient-to-b from-yellow-50 via-blue-50 to-yellow-50 text-transparent bg-clip-text"
            }
            backgroudGradient={
              "bg-gradient-to-r from-[#d1d5db] via-[#6b7280] to-[#374151]"
            }
          />
        </div>
        {/* Code Section 2 */}
        <div className="">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding"} /> <br />
                <HighlightText text={"in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Learning",
              linkto: "/signup",
              active: true, //yellow
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false, //black
            }}
            codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Study-Notion</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Namste!!</h1>
<h1>Study-Notion</h1>
</body>
</html>
`}
            codeColor={
              "bg-gradient-to-b from-yellow-50 via-blue-50 to-yellow-50 text-transparent bg-clip-text"
            }
            backgroudGradient={
              "bg-gradient-to-r from-[#d1d5db] via-[#6b7280] to-[#374151]"
            }
          />
        </div>
        <ExploreMore />
      </div>

      {/**section 2 */}

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
              <p
                className="bg-gradient-to-r
from-pink-500
via-pink-300
to-pink-50
bg-clip-text
text-transparent"
              >
                {" "}
                Job that is in demand{" "}
              </p>
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

        <h2 className="text-center text-4xl font-semibold mt-10">
          review from Other Learners
        </h2>
        {/* Review Slider here */}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
