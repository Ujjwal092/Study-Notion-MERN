import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token,
    );

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  };

  return (
    <div className="rounded-lg bg-richblack-800 p-6 border border-richblack-700">
      {course?.courseContent?.map((section) => (
        <details key={section._id} open className="group">
          {/* Section Header */}
          <summary className="flex items-center justify-between cursor-pointer border-b border-richblack-600 py-3">
            <div className="flex items-center gap-3 text-richblack-5">
              <RxDropdownMenu className="text-lg text-richblack-200" />

              <p className="font-medium">{section.sectionName}</p>
            </div>

            <div className="flex items-center gap-4 text-richblack-200">
              <button
                onClick={() =>
                  handleChangeEditSectionName(section._id, section.sectionName)
                }
              >
                <MdEdit />
              </button>

              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2: "All lectures in this section will be deleted.",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
              >
                <RiDeleteBin6Line />
              </button>

              <BiDownArrow className="transition-transform group-open:rotate-180" />
            </div>
          </summary>

          {/* SubSections */}
          <div className="mt-4 flex flex-col gap-3">
            {section?.subSection?.map((data) => (
              <div
                key={data._id}
                className="flex items-center justify-between rounded-md bg-richblack-700 px-4 py-3 hover:bg-richblack-600 transition"
                onClick={() => setViewSubSection(data)}
              >
                <div className="flex items-center gap-3 text-richblack-5">
                  <RxDropdownMenu />

                  <p>{data.title}</p>
                </div>

                <div className="flex items-center gap-4 text-richblack-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditSubSection({
                        ...data,
                        sectionId: section._id,
                      });
                    }}
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmationModal({
                        text1: "Delete this Lecture?",
                        text2: "This lecture will be permanently deleted.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(data._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Lecture Button */}
            <button
              onClick={() => setAddSubSection(section._id)}
              className="flex items-center gap-2 text-yellow-50 mt-2 hover:underline"
            >
              <AiOutlinePlus />

              <span>Add Lecture</span>
            </button>
          </div>
        </details>
      ))}

      {/* SubSection Modals */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      )}

      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}

      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}

      {/* Delete Confirmation */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default NestedView;
