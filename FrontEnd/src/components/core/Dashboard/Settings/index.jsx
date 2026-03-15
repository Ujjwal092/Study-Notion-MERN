import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import { motion } from "framer-motion";

export default function Settings() {
  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-semibold text-richblack-5"
      >
        Edit Profile
      </motion.h1>

      {/* Change Profile Picture */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg  "
      >
        <ChangeProfilePicture />
      </motion.div>

      {/* Edit Profile */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg"
      >
        <EditProfile />
      </motion.div>

      {/* Update Password */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg"
      >
        <UpdatePassword />
      </motion.div>

      {/* Delete Account */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="rounded-xl border border-pink-700 bg-richblack-800 p-6 shadow-lg"
      >
        <DeleteAccount />
      </motion.div>
    </div>
  );
}
