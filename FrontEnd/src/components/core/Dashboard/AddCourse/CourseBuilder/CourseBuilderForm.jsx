import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { BiRightArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("UPDATED");
  }, [course]);

  //create section wla button dab jaye ya edit section wla dab jaye
  const onSubmit = async (data) => {
    setLoading(true);

    let result;

    if (editSectionName) {
      //we are editing the section and updateSection wla api hit kra hai
      result = await updateSection(
        {
          sectionName: data.sectionName, //backend
          sectionId: editSectionName,
          courseId: course._id, //course is fetched
        },
        token, //state.auth
      );
    } else {
      // we are creating  section and createSection api ko hit kra hai
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id, //backend
        },
        token,
      );
    }
    //if valid result set update course and edit section will be null
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  //editSection wla api null mark kr do cancel edit m
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  //STEP 1 PR JAAO and entry already kr diya h toh edit kr skte so edit course wla api call krnge
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  //next step from step 2 tbhi jainge jab hm step 2 pr atleast 1 section add kr chuke ho mtlb wo lec wla thing
  const goToNext = () => {
    //course content not added
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }

    //subsection 0 ho phr
    if (
      //  checks whether at least one element in an array passes a test implemented by a provided function
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if every thing is good
    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="rounded-lg bg-richblack-800 p-6 border border-richblack-700">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-richblack-5 mb-6">
        Course Builder
      </h2>

      {/* Form section name wla form h*/}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>

          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full mt-2 rounded-md bg-richblack-700 p-3 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          />

          {errors.sectionName && (
            <span className="text-xs text-pink-200">
              Section Name is required
            </span>
          )}
        </div>

        {/* Button or iska logic logic is if editSection name wle icon pr click kr rhe toh edit section name wla button dekhega warna create section wla  */}

        {/* and edit/update section wle m ya toh edit kr rhe h ya phr create kr rhe haii */}

        <div className="flex items-center gap-4 pt-4">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <MdAddCircleOutline />
          </IconBtn>

          {/* if edit kr rhe section ko toh cancel krne ke liye ek or button bna diye */}

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm font-bold text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested Sections executed only when valid section is created nested view comp call and uske m ek edit wla section h jisko click krne pr edit section enable ho rha */}

      {course?.courseContent?.length > 0 && (
        <div className="mt-8">
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={goBack}
          className="px-5 py-2 rounded-md bg-richblack-700 text-richblack-5 hover:bg-richblack-600 transition"
        >
          Back
        </button>

        <IconBtn text="Next" onclick={goToNext}>
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
