import React, { useEffect, useState } from "react";
// Icons
import { FaRegStar, FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

function Course_Card({ course, Height }) {
  // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
  // console.log(course.ratingAndReviews)
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  // console.log("count............", avgReviewCount)

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="group bg-richblack-800 rounded-2xl overflow-hidden border border-richblack-700 hover:border-yellow-50 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={course?.thumbnail}
                alt="course"
                className={`${Height} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-3">
              {/* TITLE */}
              <h3 className="text-lg font-semibold text-richblack-5 leading-snug line-clamp-2 group-hover:text-yellow-50 transition">
                {course?.courseName}
              </h3>

              {/* INSTRUCTOR */}
              <p className="text-sm text-richblack-300">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>

              {/* RATING */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-50 font-semibold">
                    {avgReviewCount || 0}
                  </span>

                  <span className="text-richblack-400 text-xs">
                    ({course?.ratingAndReviews?.length})
                  </span>
                </div>

                {/* subtle divider */}
                <div className="h-4 w-[1px] bg-richblack-600"></div>

                {/* learners */}
                <span className="text-richblack-400 text-xs">
                  {course?.studentsEnrolled?.length || 0} learners
                </span>
              </div>

              {/* PRICE */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-xl font-bold text-yellow-50">
                  ₹ {course?.price}
                </p>

                <p className="text-xs text-richblack-400">Lifetime Access</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>

              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5"> ₹ {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Course_Card;
