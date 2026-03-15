import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  // Open file selector
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      // Preview image
      const imagePreview = URL.createObjectURL(file);
      setPreviewSource(imagePreview);
    }
  };

  // Upload image
  const handleFileUpload = async () => {
    if (!imageFile) {
      alert("Please select an image first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("displayPicture", imageFile);

      await dispatch(updateDisplayPicture(token, formData));
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <div className="flex  lg:flex-row sm:flex-col items-center gap-x-4  ">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />

        <div className="space-y-2">
          <p>Change Profile Picture</p>

          <div className="flex flex-row gap-3">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />

            {/* Select button */}
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>

            {/* Upload button */}
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
              disabled={!imageFile || loading}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
