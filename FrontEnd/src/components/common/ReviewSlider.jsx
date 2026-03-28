//get all rating api call
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API,
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);

  return (
    <div className="text-white w-full overflow-x-hidden">
      <div className="my-8 sm:my-10 px-2 sm:px-4 md:px-0">
        <Swiper
          slidesPerView={1.1}
          spaceBetween={12}
          breakpoints={{
            480: { slidesPerView: 1.3, spaceBetween: 12 },
            640: { slidesPerView: 1.8, spaceBetween: 14 },
            768: { slidesPerView: 2.2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 18 },
            1280: { slidesPerView: 3.5, spaceBetween: 20 },
            1536: { slidesPerView: 4, spaceBetween: 22 },
          }}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="group h-full flex flex-col justify-between min-h-[190px] sm:min-h-[210px] md:min-h-[220px] gap-3 sm:gap-4 bg-gradient-to-br from-richblack-800 to-richblack-900 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-richblack-700 shadow-md hover:shadow-xl transition-all duration-300">
                {/* USER */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt=""
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-yellow-400"
                  />

                  <div className="min-w-0">
                    <h1 className="font-semibold text-xs sm:text-sm md:text-base leading-tight truncate">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </h1>
                    <p className="text-[10px] sm:text-xs text-richblack-400 truncate">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* REVIEW TEXT */}
                <p className="text-xs sm:text-sm text-richblack-200 leading-relaxed line-clamp-3">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : review?.review}
                </p>

                {/* RATING */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-yellow-400 font-semibold text-xs sm:text-sm">
                      {review.rating.toFixed(1)}
                    </span>

                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={16}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition duration-300 text-yellow-400 text-xs">
                    ★
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
