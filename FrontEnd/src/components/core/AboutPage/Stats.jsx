import React from "react";
import CountUp from "react-countup";

const Stats = [
  { count: 5000, label: "Active Students", suffix: "+" },
  { count: 10, label: "Mentors", suffix: "+" },
  { count: 200, label: "Courses", suffix: "+" },
  { count: 50, label: "Awards", suffix: "+" },
];

const StatsComponent = () => {
  return (
    <section className="bg-richblack-800 py-20">
      <div className="w-11/12 max-w-maxContent mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {Stats.map((data, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-richblack-700 
            hover:bg-richblack-600 transition duration-300 
            shadow-md hover:shadow-xl"
          >
            <h2 className="text-4xl font-bold text-yellow-50">
              <CountUp
                end={data.count}
                duration={2}
                separator=","
                enableScrollSpy
                scrollSpyOnce={false}
              />
              {data.suffix}
            </h2>

            <p className="text-richblack-300 mt-2 text-sm md:text-base">
              {data.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsComponent;
