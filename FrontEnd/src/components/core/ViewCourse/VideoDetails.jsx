import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();

  const { token } = useSelector((state) => state.auth);

  //  SAFE REDUX
  const viewCourse = useSelector((state) => state?.viewCourse || {});
  const courseSectionData = viewCourse?.courseSectionData || [];
  const completedLectures = viewCourse?.completedLectures || [];

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  //  SET VIDEO DATA
  useEffect(() => {
    if (!courseSectionData.length) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const section = courseSectionData.find((sec) => sec._id === sectionId);

    const video = section?.subSection?.find((vid) => vid._id === subSectionId);

    setVideoData(video);
    setVideoEnded(false);
  }, [courseSectionData, location.pathname]);

  //  GET INDEXES
  const getIndexes = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    return { currentSectionIndex, currentSubSectionIndex };
  };

  //  PREV VIDEO
  const goToPrevVideo = () => {
    const { currentSectionIndex, currentSubSectionIndex } = getIndexes();

    if (currentSubSectionIndex > 0) {
      const prevId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevId}`,
      );
    } else if (currentSectionIndex > 0) {
      const prevSection = courseSectionData[currentSectionIndex - 1];

      const prevId =
        prevSection.subSection[prevSection.subSection.length - 1]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevId}`,
      );
    }
  };

  //  NEXT VIDEO
  const goToNextVideo = () => {
    const { currentSectionIndex, currentSubSectionIndex } = getIndexes();

    const currentSection = courseSectionData[currentSectionIndex];

    if (currentSubSectionIndex < currentSection.subSection.length - 1) {
      const nextId = currentSection.subSection[currentSubSectionIndex + 1]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextId}`,
      );
    } else if (currentSectionIndex < courseSectionData.length - 1) {
      const nextSection = courseSectionData[currentSectionIndex + 1];

      const nextId = nextSection.subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextId}`,
      );
    }
  };

  //  FIRST / LAST CHECK
  const { currentSectionIndex, currentSubSectionIndex } = getIndexes();

  const isFirstVideo =
    currentSectionIndex === 0 && currentSubSectionIndex === 0;

  const isLastVideo =
    currentSectionIndex === courseSectionData.length - 1 &&
    currentSubSectionIndex ===
      courseSectionData[currentSectionIndex]?.subSection.length - 1;

  // ✅ MARK COMPLETE
  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete({ courseId, subSectionId }, token);

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      {/* 🎥 VIDEO PLAYER */}
      {!videoData?.videoUrl ? (
        <div className="text-center text-lg mt-10">No Video Found</div>
      ) : (
        <div className="relative">
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            src={videoData.videoUrl}
            onEnded={() => setVideoEnded(true)}
          />

          {/* OVERLAY CONTROLS */}
          {videoEnded && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4">
              {!completedLectures?.includes(subSectionId) && (
                <IconBtn
                  onClick={handleLectureCompletion}
                  disabled={loading}
                  text={loading ? "Loading..." : "Mark as Completed"}
                />
              )}

              <IconBtn
                onClick={() => {
                  playerRef.current?.seek(0);
                  setVideoEnded(false);
                }}
                text="Rewatch"
              />

              <div className="flex gap-4 mt-3">
                {!isFirstVideo && (
                  <button
                    onClick={goToPrevVideo}
                    className="px-4 py-2 bg-richblack-700 rounded-md"
                  >
                    ⬅ Prev
                  </button>
                )}

                {!isLastVideo && (
                  <button
                    onClick={goToNextVideo}
                    className="px-4 py-2 bg-yellow-200 text-black rounded-md"
                  >
                    Next ➡
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TITLE + DESC */}
      <div>
        <h2 className="text-xl font-semibold">{videoData?.title}</h2>

        <p className="text-richblack-300 mt-2">{videoData?.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
