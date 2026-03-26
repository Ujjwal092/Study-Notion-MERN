import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

//  slice import
import { setCompletedLectures } from "../../../slices/viewCourseSlice";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams();

  //  SAFE SELECTOR
  const viewCourse = useSelector((state) => state.viewCourse);

  const courseSectionData = viewCourse?.courseSectionData || [];
  const courseEntireData = viewCourse?.courseEntireData || {};
  const totalNoOfLectures = viewCourse?.totalNoOfLectures || 0;
  const completedLectures = viewCourse?.completedLectures || [];

  //  ACTIVE STATE SET
  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id;

    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, location.pathname]);

  return (
    <div className="w-[300px] bg-richblack-800 text-white h-screen overflow-y-auto">
      {/* 🔹 HEADER */}
      <div className="p-4 border-b border-richblack-700">
        {/* Buttons */}
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="text-yellow-50 hover:underline"
          >
            ← Back
          </button>

          <IconBtn text="Review" onClick={() => setReviewModal(true)} />
        </div>

        {/* Title */}
        <p className="font-semibold text-lg">{courseEntireData?.courseName}</p>

        {/* Progress */}
        <p className="text-sm text-richblack-300 mt-1">
          {completedLectures?.length} / {totalNoOfLectures}
        </p>
      </div>

      {/* 🔹 CONTENT */}
      <div>
        {courseSectionData?.map((course) => (
          <div key={course._id}>
            {/* SECTION */}
            <div
              onClick={() =>
                setActiveStatus(activeStatus === course._id ? "" : course._id)
              }
              className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-richblack-700"
            >
              <p>{course?.sectionName}</p>
            </div>

            {/* SUBSECTIONS */}
            {activeStatus === course._id && (
              <div>
                {course?.subSection?.map((topic) => (
                  <div
                    key={topic._id}
                    className={`flex items-center gap-3 px-5 py-3 cursor-pointer ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 text-black"
                        : "hover:bg-richblack-700"
                    }`}
                    onClick={() => {
                      //  SAFE NAVIGATION
                      if (!courseEntireData?._id || !course?._id || !topic?._id)
                        return;

                      navigate(
                        `/view-course/${courseEntireData._id}/section/${course._id}/sub-section/${topic._id}`,
                      );

                      setVideoBarActive(topic._id);

                      //  optional: dispatch example
                      dispatch(setCompletedLectures(topic._id));
                    }}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(topic._id)}
                      readOnly
                    />

                    {/* Title */}
                    <span className="text-sm">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
