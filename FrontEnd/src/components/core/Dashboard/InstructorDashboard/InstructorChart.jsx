import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
        borderWidth: 2,
        borderColor: "#0f172a",
      },
    ],
  };

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
        borderWidth: 2,
        borderColor: "#0f172a",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-xl border border-richblack-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-semibold text-white tracking-wide">
          📊 Analytics
        </p>

        <div className="flex gap-2 bg-richblack-700 p-1 rounded-full">
          <button
            onClick={() => setCurrChart("students")}
            className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ${
              currChart === "students"
                ? "bg-yellow-400 text-black shadow-md"
                : "text-yellow-300 hover:bg-richblack-600"
            }`}
          >
            Students
          </button>

          <button
            onClick={() => setCurrChart("income")}
            className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ${
              currChart === "income"
                ? "bg-yellow-400 text-black shadow-md"
                : "text-yellow-300 hover:bg-richblack-600"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[320px] w-full flex items-center justify-center">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
