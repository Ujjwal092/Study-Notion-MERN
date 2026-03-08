import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
          {/* Renders the child route's element, if there is one. dashboard/.... so after dashboard we have nested route so it will be dynamic */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
