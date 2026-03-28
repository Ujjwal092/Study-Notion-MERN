import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { addToCart } from "../slices/cartSlice";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([]);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  //  Fetch Course
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    })();
  }, [courseId]);

  //  Avg Rating
  useEffect(() => {
    const count = GetAvgRating(
      response?.data?.courseDetails?.ratingAndReviews || [],
    );
    setAvgReviewCount(count);
  }, [response]);

  //  Total Lectures
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  //  Accordion
  const handleActive = (id) => {
    setIsActive((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  //  Buy
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  //  Loading
  if (loading || !response) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response?.success) return <Error />;

  if (paymentLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  //  SAFE destructuring
  const {
    courseName = "",
    courseDescription = "",
    thumbnail = "",
    price = 0,
    whatYouWillLearn = "",
    courseContent = [],
    ratingAndReviews = [],
    instructor = {},
    studentsEnroled = [],
    createdAt,
  } = response?.data?.courseDetails || {};

  return (
    <div className="bg-richblack-900 text-white">
      {/* HERO */}
      <div
        className="bg-gradient-to-r from-richblack-800 via-richblack-900 to-black border-b border-richblack-700
                animate-fadeIn"
      >
        <div className="max-w-maxContent mx-auto px-6 py-14 flex flex-col lg:flex-row gap-10">
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-5">
            <h1 className="text-4xl font-bold tracking-tight">{courseName}</h1>

            <p className="text-richblack-300 max-w-2xl text-sm leading-relaxed">
              {courseDescription}
            </p>

            {/*  RATING */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-yellow-50 font-semibold">
                {avgReviewCount}
              </span>

              <RatingStars Review_Count={avgReviewCount} Star_Size={20} />

              <span className="text-richblack-400">
                ({ratingAndReviews.length} reviews)
              </span>

              <span className="text-richblack-400">
                {studentsEnroled.length} students
              </span>
            </div>

            {/* instructor */}
            <p className="text-sm text-richblack-300">
              Created by{" "}
              <span className="text-yellow-50 font-medium">
                {instructor.firstName} {instructor.lastName}
              </span>
            </p>

            {/* INFO */}
            <div className="flex gap-6 text-xs text-richblack-400">
              <p className="flex items-center gap-1">
                <BiInfoCircle /> {formatDate(createdAt)}
              </p>
              <p className="flex items-center gap-1">
                <HiOutlineGlobeAlt /> English
              </p>
            </div>
          </div>

          {/*  RIGHT BUY CARD */}
          <div className="w-full lg:w-[340px]">
            <div
              className="bg-richblack-800 rounded-2xl p-5 border border-richblack-700
                          shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                          transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <img
                src={thumbnail}
                alt="course"
                className="w-full h-[180px] object-cover rounded-lg mb-4"
              />

              <p className="text-3xl font-bold text-yellow-50">₹ {price}</p>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={handleBuyCourse}
                  className="w-full bg-yellow-50 text-black font-semibold py-3 rounded-lg
                           transition-all duration-300
                           hover:scale-[1.03]
                           hover:shadow-[0_8px_30px_rgba(255,215,0,0.3)]
                           active:scale-95"
                >
                  Buy Now
                </button>

                <button
                  onClick={() =>
                    dispatch(addToCart(response?.data?.courseDetails))
                  }
                  className="w-full border border-richblack-600 text-richblack-100 py-3 rounded-lg
             transition-all duration-300
             hover:bg-richblack-700 hover:scale-[1.02]"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied!");
                  }}
                  className="text-sm text-richblack-400 hover:text-yellow-50 transition text-center"
                >
                  Share Course
                </button>
              </div>

              {/* FEATURES */}
              <div className="mt-4 text-sm text-richblack-300 space-y-1">
                <p>✔ Full Lifetime Access</p>
                <p>✔ Access on Mobile & Desktop</p>
                <p>✔ Certificate of Completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  WHAT YOU WILL LEARN */}
      <div className="max-w-maxContent mx-auto px-6 py-14">
        <h2 className="text-xl font-semibold mb-6">What you'll learn</h2>

        <div className="bg-richblack-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-sm text-richblack-200">
          <div className="space-y-2">
            {whatYouWillLearn.split("\n").map((item, i) => (
              <p key={i} className="hover:text-yellow-50 transition">
                • {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/*  COURSE CONTENT */}
      <div className="max-w-maxContent mx-auto px-6 pb-16">
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-xl font-semibold">Course Content</h2>

          <div className="flex justify-between text-sm text-richblack-300">
            <div>
              {courseContent.length} Sections • {totalNoOfLectures} Lectures
            </div>

            <button
              onClick={() => setIsActive([])}
              className="text-yellow-50 hover:underline"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="flex flex-col gap-4">
          {courseContent.map((course, index) => (
            <div
              key={index}
              className="bg-richblack-800 p-4 rounded-lg border border-richblack-700
                       transition-all duration-300
                       hover:border-yellow-50 hover:shadow-lg hover:-translate-y-1"
            >
              <CourseAccordionBar
                course={course}
                isActive={isActive}
                handleActive={handleActive}
              />
            </div>
          ))}
        </div>
      </div>

      {/* AUTHOR */}
      <div className="max-w-maxContent mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold mb-4">Author</h2>

        <div className="flex items-center gap-4">
          <img
            src={
              instructor?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
            }
            className="w-14 h-14 rounded-full"
          />

          <div>
            <p className="font-medium">
              {instructor.firstName} {instructor.lastName}
            </p>
          </div>
        </div>

        <p className="text-richblack-300 mt-3 text-sm max-w-2xl">
          {instructor?.additionalDetails?.about}
        </p>
      </div>

      <Footer />

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default CourseDetails;
