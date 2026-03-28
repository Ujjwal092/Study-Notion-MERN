import { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res?.data?.data || []);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Disable scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`flex h-14 items-center justify-center border-b border-richblack-700 ${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        }`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" width={160} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link) => (
                <li key={link.title}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />

                      {/* Dropdown */}
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[250px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100">
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length > 0 ? (
                          subLinks.map((subLink) => (
                            <Link
                              key={subLink._id}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg py-3 px-2 hover:bg-richblack-50"
                            >
                              {subLink.name}
                            </Link>
                          ))
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-x-4">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {token === null ? (
              <>
                <Link to="/login">
                  <button className="px-3 py-2 border border-richblack-700 rounded text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-3 py-2 border border-richblack-700 rounded text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-[110]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-[70%] max-w-[300px] bg-richblack-800 z-[110] p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <img src={logo} alt="StudyNotion Logo" className="w-[140px]" />
              </div>

              {/* Links */}
              <ul className="flex flex-col gap-4 text-richblack-25">
                {NavbarLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      to={link?.path}
                      className="hover:text-yellow-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-6 h-[1px] bg-richblack-700" />

              {/* Auth if logged in toh dashbi=oard and cart wlka buttn warna signup login wala */}
              {token === null ? (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full bg-yellow-50 text-black py-2 rounded">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full border border-richblack-600 py-2 rounded text-white">
                      Sign up
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/dashboard/my-profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-md  text-yellow-50 hover:bg-richblack-700 transition-all duration-200"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/dashboard/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-yellow-50 hover:bg-richblack-700 transition-all duration-200"
                  >
                    Cart
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
