import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-semibold text-richblack-5"
      >
        My Profile
      </motion.h1>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="h-[72px] w-[72px] rounded-full object-cover border border-richblack-600"
          />

          <div>
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
          <RiEditBoxLine />
        </IconBtn>
      </motion.div>

      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>

          <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`text-sm font-medium ${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          }`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </motion.div>

      {/* Personal Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>

          <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
            <RiEditBoxLine />
          </IconBtn>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-16 max-w-[600px]">
          <div>
            <p className="mb-1 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.firstName}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.lastName}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.email}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm text-richblack-600">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
