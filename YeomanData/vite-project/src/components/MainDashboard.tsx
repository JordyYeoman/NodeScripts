import { useEffect, useState } from "react";
import { useAppContext } from "../AppWrapper";
import ChartDaddy from "../components/charting/chart";
import { getApiHeaders, getUploadHeaders } from "../utils/auth";
import Card from "./molecules/Card";
import PrimeAnalytics from "./organisms/PrimeAnalytics";

function MainDashboard() {
  const { user } = useAppContext();

  return (
    <div className="mainContent">
      {user?.isAuthenticated ? <PrimeAnalytics /> : <>Login Bra</>}
    </div>
  );
}

export default MainDashboard;
