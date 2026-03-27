import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";

const Catalog = () => {
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);

      const category_id = res?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName,
      )[0]?._id;

      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  // Fetch catalog data
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <>
      {/* HERO */}
      <div className="bg-gradient-to-r from-richblack-800 to-richblack-900 px-6 py-12 border-b border-richblack-700">
        <div className="mx-auto max-w-maxContent flex flex-col gap-4">
          <p className="text-sm text-richblack-300">
            Home / Catalog /
            <span className="text-yellow-50 ml-1 font-medium">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>

          <h1 className="text-4xl font-bold text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>

          <p className="text-richblack-300 max-w-3xl leading-relaxed">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/*  SECTION 1 */}
      <div className="mx-auto max-w-maxContent px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-richblack-5">
          Start Learning Today
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogPageData?.data?.selectedCategory?.courses
            ?.slice(0, 6)
            .map((course, i) => (
              <div
                key={i}
                className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1]"
              >
                <Course_Card course={course} Height={"h-[220px]"} />
              </div>
            ))}
        </div>
      </div>

      {/*  SECTION 2 */}
      <div className="mx-auto max-w-maxContent px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-richblack-5">
          Top Courses in{" "}
          <span className="text-yellow-50">
            {catalogPageData?.data?.differentCategory?.name}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogPageData?.data?.differentCategory?.courses
            ?.slice(0, 6)
            .map((course, i) => (
              <div
                key={i}
                className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1] shadow-lg"
              >
                <Course_Card course={course} Height={"h-[220px]"} />
              </div>
            ))}
        </div>
      </div>

      {/*  SECTION 3 */}
      <div className="mx-auto max-w-maxContent px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-richblack-5">
          Frequently Bought Together
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 6)
            .map((course, i) => (
              <div
                key={i}
                className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1] "
              >
                <Course_Card course={course} Height={"h-[220px]"} />
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
