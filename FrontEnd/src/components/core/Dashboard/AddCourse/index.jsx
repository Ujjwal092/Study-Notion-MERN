import RenderSteps from "./RenderSteps";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";

export default function AddCourse() {
  return (
    <div className="flex w-full items-start gap-x-8">
      {/* LEFT SECTION */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-1 flex-col"
      >
        <h1 className="mb-10 flex items-center gap-3 text-3xl font-semibold text-richblack-5">
          <FiUploadCloud className="text-yellow-50 text-4xl" />
          Add Course
        </h1>

        <div className="flex-1 rounded-xl bg-richblack-800 p-6 shadow-lg">
          <RenderSteps />
          {/* calling component */}
        </div>
      </motion.div>

      {/* RIGHT SECTION */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-10 hidden max-w-[380px] flex-1 rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg xl:block"
      >
        <p className="mb-6 text-lg font-semibold text-yellow-50">
          ⚡ Course Upload Tips
        </p>

        <ul className="ml-4 list-disc space-y-3 text-sm text-richblack-5">
          <li className="transition hover:text-yellow-50">
            Set the Course Price option or make it free.
          </li>

          <li className="transition hover:text-yellow-50">
            Standard size for the course thumbnail is 1024x576.
          </li>

          <li className="transition hover:text-yellow-50">
            Video section controls the course overview video.
          </li>

          <li className="transition hover:text-yellow-50">
            Course Builder is where you create & organize a course.
          </li>

          <li className="transition hover:text-yellow-50">
            Add Topics in Course Builder to create lessons and quizzes.
          </li>

          <li className="transition hover:text-yellow-50">
            Additional data appears on the course page.
          </li>

          <li className="transition hover:text-yellow-50">
            Make announcements to notify students.
          </li>

          <li className="transition hover:text-yellow-50">
            Add notes for enrolled students.
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
