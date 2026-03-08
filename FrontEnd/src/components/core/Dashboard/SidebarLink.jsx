import * as Icons from "react-icons/vsc";
// sarre icons ek object Icons me aa gaye.and baad m line 9 m usko use kiya h dynamically
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

import { resetCourseState } from "../../../slices/courseSlice";

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation(); //to check which path im iin like my-profile or enrolled courses ... in sidebar
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname); //path function call krte waqt bejnge link object m pada hoga jo hmne nikala  tha sidebar file m map ka use krke
  };

  return (
    <NavLink
      to={link.path} //will navigate to this path and ye link ek single object h dashboard-link wla file ke data m se laaye h and usme se ath ko access kiye h using dot operation
      onClick={() => dispatch(resetCourseState())} //on click
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}
