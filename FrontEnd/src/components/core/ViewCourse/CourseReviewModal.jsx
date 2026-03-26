import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import ReactStars from "react-rating-stars-component";
import { RxCross2 } from "react-icons/rx";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token,
    );
    setReviewModal(false);
  };

  return (
    /*  Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/*  Modal */}
      <div className="w-11/12 max-w-[500px] bg-richblack-800 text-white rounded-lg shadow-lg overflow-hidden">
        {/*  Modal header */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-richblack-600">
          <p className="text-lg font-semibold">Add Review</p>

          {/* Close button */}
          <button
            onClick={() => setReviewModal(false)}
            className="text-xl hover:text-red-400 transition"
          >
            <RxCross2 />
          </button>
        </div>

        {/* 🔹 Modal Body */}
        <div className="p-5">
          {/* User info */}
          <div className="flex items-center gap-3">
            <img
              src={user?.image}
              alt="user"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />

            <div>
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">Posting Publicly</p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4"
          >
            {/*  Rating */}
            <div className="flex justify-center">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                activeColor="#ffd700"
              />
            </div>

            {/*  Textarea */}
            <div className="flex flex-col gap-2">
              <label htmlFor="courseExperience" className="text-sm">
                Add Your Experience*
              </label>

              <textarea
                id="courseExperience"
                placeholder="Write your experience..."
                {...register("courseExperience", { required: true })}
                className="bg-richblack-700 p-3 rounded-md outline-none min-h-[120px]"
              />

              {errors.courseExperience && (
                <span className="text-red-400 text-xs">
                  Please add your experience
                </span>
              )}
            </div>

            {/*  Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="px-4 py-2 bg-richblack-600 rounded-md hover:bg-richblack-500 transition"
              >
                Cancel
              </button>

              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
