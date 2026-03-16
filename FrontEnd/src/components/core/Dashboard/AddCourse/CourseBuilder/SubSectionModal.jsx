import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RxCross1 } from "react-icons/rx";

import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const onSubmit = async (data) => {
    if (view) return;

    const formData = new FormData();

    setLoading(true);

    if (edit) {
      formData.append("sectionId", modalData.sectionId);
      formData.append("subSectionId", modalData._id);
      formData.append("title", data.lectureTitle);
      formData.append("description", data.lectureDesc);
      formData.append("video", data.lectureVideo);

      const result = await updateSubSection(formData, token);

      if (result) dispatch(setCourse(result));
    } else {
      formData.append("sectionId", modalData);
      formData.append("title", data.lectureTitle);
      formData.append("description", data.lectureDesc);
      formData.append("video", data.lectureVideo);

      const result = await createSubSection(formData, token);

      if (result) dispatch(setCourse(result));
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-richblack-800 rounded-lg w-[90%] max-w-[600px] p-6 border border-richblack-600">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg font-semibold text-richblack-5">
            {view && "Viewing"}
            {add && "Adding"}
            {edit && "Editing"} Lecture
          </p>

          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div>
            <label className="text-sm text-richblack-5">Lecture Title</label>

            <input
              {...register("lectureTitle", { required: true })}
              className="w-full mt-2 rounded-md bg-richblack-700 p-3"
              placeholder="Enter Lecture Title"
            />

            {errors.lectureTitle && (
              <span className="text-pink-200 text-xs">
                Lecture Title is required
              </span>
            )}
          </div>

          <div>
            <label className="text-sm text-richblack-5">
              Lecture Description
            </label>

            <textarea
              {...register("lectureDesc", { required: true })}
              className="w-full mt-2 rounded-md bg-richblack-700 p-3 min-h-[120px]"
              placeholder="Enter Lecture Description"
            />
          </div>

          {!view && (
            <div className="flex justify-end mt-4">
              <IconBtn
                type="submit"
                text={loading ? "Saving..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
