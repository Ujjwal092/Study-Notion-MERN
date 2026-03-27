import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

//  GET USER DETAILS

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading User Data...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET_USER_DETAILS RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      const userData = response.data.data;

      const userImage =
        userData.image ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

      dispatch(setUser({ ...userData, image: userImage }));
    } catch (error) {
      console.log("GET_USER_DETAILS ERROR:", error);

      toast.error("Failed to fetch user details");

      dispatch(logout(navigate));
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

//  GET ENROLLED COURSES

export async function getUserEnrolledCourses(token) {
  let result = [];

  try {
    console.log("CALLING ENROLLED COURSES API");

    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    console.log("ENROLLED COURSES RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES ERROR:", error);

    toast.error("Failed to fetch enrolled courses");
  }

  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
