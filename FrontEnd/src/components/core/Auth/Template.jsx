import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center overflow-hidden">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 py-12">
          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[450px]"
          >
            <h1 className="text-[30px] font-semibold text-richblack-5">
              {title}
            </h1>

            <p className="mt-4 text-lg">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>

            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[450px] flex justify-center"
          >
            <img
              src={frameImg}
              alt="Pattern"
              loading="lazy"
              className="w-full"
            />

            <motion.img
              src={image}
              alt="Students"
              loading="lazy"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-0 right-0 z-10 w-full"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Template;
