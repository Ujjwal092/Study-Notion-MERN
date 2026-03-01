// components/GlobalSkeleton.jsx
const GlobalSkeleton = () => {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-richblack-600 rounded w-1/3"></div>
      <div className="h-40  bg-richblack-600rounded"></div>
      <div className="h-4  bg-richblack-600 rounded w-3/4"></div>
      <div className="h-4  bg-richblack-600 rounded w-1/2"></div>
    </div>
  );
};

export default GlobalSkeleton;
