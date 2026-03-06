import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: " Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible and affordable learning worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Our curriculum is designed to match industry demands and real-world needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Interactive lessons and real-world projects make learning engaging.",
  },
  {
    order: 3,
    heading: "Certification",
    description: "Earn certifications that validate your skills and knowledge.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description: "Get instant feedback with auto grading and assessments.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Prepare yourself with job-ready skills and industry exposure.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-11/12 max-w-maxContent mx-auto">
      {LearningGridArray.map((card, i) => (
        <div
          key={i}
          className={`p-6 rounded-lg ${
            card.order === -1
              ? "xl:col-span-2 bg-transparent"
              : card.order % 2 === 0
                ? "bg-richblack-800"
                : "bg-richblack-700"
          }`}
        >
          {card.order < 0 ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-semibold text-white">
                {card.heading}
                <HighlightText text={card.highlightText} />
              </h2>

              <p className="text-richblack-300">{card.description}</p>

              <div className="w-fit">
                <CTAButton active={true} linkto={card.BtnLink}>
                  {card.BtnText}
                </CTAButton>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg text-white font-semibold ">
                {card.heading}
              </h3>

              <p className="text-richblack-300 mt-3">{card.description}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningGrid;
