import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import Course_Slider from "../components/core/Catalog/Course_Slider";

const Catalog = () => {
  const { catalogName } = useParams(); //url se category name lerha means /catalog/web -> catalogName = "web"
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(""); //it is not certain which dropdown user is clicking so store id of categories

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      //find matching category
      const category_id = res?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName,
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]); //render when catalogName change coz  user click new category

  //fetching category data using _id
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        console.log("PRinting res: ", res);
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
    <div className="text-white">
      <div>
        <p>
          {`Home / Catalog /`}
          <span>{catalogPageData?.data?.selectedCategory?.name}</span>
        </p>

        <p> {catalogPageData?.data?.selectedCategory?.name} </p>

        <p> {catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* section1 */}

        <div>
          <div>Courses to get you started</div>
          <div className=" flex gap-x-3">
            <p>Most Popular</p>
            <p>New</p>
          </div>
          <div>
            <Course_Slider
              Courses={catalogPageData?.data?.selectedCategory?.courses}
            />
            {/* mtlb categoryPagedData fetch krke laaye specific catgeoryId ke liye */}
            an
          </div>
        </div>

        {/* section2 */}
        <div>
          <div>
            Top Courses in {catalogPageData?.data?.selectedCategory?.name}
          </div>
          <div>
            <Course_Slider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>

        {/* section3 */}
        <div>
          <div>Frequently Bought</div>
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <Course_Card
                    course={course}
                    key={index}
                    Height={"h-[400px]"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
