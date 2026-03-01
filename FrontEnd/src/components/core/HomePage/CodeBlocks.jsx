import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  glowColor,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor,
}) => {
  const isReverse = position.includes("reverse"); // right section = yellow

  return (
    <div
      className={`flex ${position} my-20 justify-between gap-10 items-center`}
    >
      {/* TEXT SECTION */}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}

        <div className="text-richblack-300 font-medium">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* CODE SECTION */}
      <div className="relative w-full lg:w-[500px] flex justify-center items-center">
        {/* GLOW */}
        <div
          className={`absolute w-[600px] h-[600px] rounded-full blur-[180px] opacity-60
      ${glowColor === "yellow" ? "bg-yellow-50" : "bg-blue-200"}`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* GLASS CARD */}
        <div
          className="relative z-10 flex flex-row w-full p-6 rounded-md
      bg-richblack-800/70 opacity-70
      backdrop-blur-xl
      border border-white/10
      shadow-[0_0_50px_rgba(0,0,0,0.6)]"
        >
          {/* LINE NUMBERS */}
          <div
            className="flex flex-col text-center pr-4 mr-4 pb-4
        text-richblack-400 font-mono text-sm
        border-r border-richblack-600
        leading-7 h-[310px]"
          >
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* CODE */}
          <div
            className={`flex-1 font-mono text-sm leading-7 h-[275px] overflow-hidden ${codeColor}`}
          >
            <TypeAnimation
              sequence={[
                codeblock,
                1000,
                () => {}, // prevents crash loop
              ]}
              repeat={Infinity}
              cursor={true}
              speed={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
