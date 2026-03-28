import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800 text-richblack-300 border-t border-richblack-700 overflow-x-hidden">
      <div className="w-11/12 max-w-[1200px] mx-auto py-14">
        {/*  Gradient Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-10"></div>

        {/* 🔹 TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6">
          {/* LOGO + COMPANY */}
          <div className="lg:col-span-1">
            <img src={Logo} alt="logo" className="w-32 mb-4" />

            <h2 className="text-richblack-5 font-semibold mb-3 text-[15px] tracking-wide">
              Company
            </h2>

            {["About", "Careers", "Affiliates"].map((ele, i) => (
              <Link
                key={i}
                to={ele.toLowerCase()}
                className="block text-sm mb-1 hover:text-yellow-50 break-words transition duration-200"
              >
                {ele}
              </Link>
            ))}

            {/* 🔥 SOCIAL ICONS */}
            <div className="flex gap-4 mt-4 text-lg">
              <FaFacebook className="cursor-pointer text-blue-300 hover:scale-110 transition duration-200" />
              <FaTwitter className="cursor-pointer text-blue-200 hover:scale-110 transition duration-200" />
              <FaYoutube className="cursor-pointer text-pink-300 hover:scale-110 transition duration-200" />
              <FaLinkedin className="cursor-pointer text-blue-400 hover:scale-110 transition duration-200" />
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h2 className="text-richblack-5 font-semibold mb-3 text-[15px] tracking-wide">
              Resources
            </h2>

            {Resources.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLowerCase()}
                className="block text-sm mb-1 hover:text-yellow-50 break-words transition duration-200"
              >
                {ele}
              </Link>
            ))}
          </div>

          {/* PLANS */}
          <div>
            <h2 className="text-richblack-5 font-semibold mb-3 text-[15px] tracking-wide">
              Plans
            </h2>

            {Plans.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLowerCase()}
                className="block text-sm mb-1 hover:text-yellow-50 break-words transition duration-200"
              >
                {ele}
              </Link>
            ))}
          </div>

          {/* COMMUNITY */}
          <div>
            <h2 className="text-richblack-5 font-semibold mb-3 text-[15px] tracking-wide">
              Community
            </h2>

            {Community.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLowerCase()}
                className="block text-sm mb-1 hover:text-yellow-50 break-words transition duration-200"
              >
                {ele}
              </Link>
            ))}
          </div>

          {/* DYNAMIC LINKS */}
          <div>
            {FooterLink2.slice(0, 1).map((ele, i) => (
              <div key={i}>
                <h2 className="text-richblack-5 font-semibold mb-3 text-[15px] tracking-wide">
                  {ele.title}
                </h2>

                {ele.links.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.link}
                    className="block text-sm mb-1 hover:text-yellow-50 break-words transition duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-richblack-700 text-sm gap-4">
          <div className="flex gap-4 flex-wrap justify-center">
            {BottomFooter.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLowerCase()}
                className="hover:text-yellow-50 transition duration-200"
              >
                {ele}
              </Link>
            ))}
          </div>

          <p className="text-richblack-400 text-xs tracking-wide text-center">
            Made with ❤️ by{" "}
            <span className="text-yellow-50 font-semibold">Ujjwal Kumar</span> ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
