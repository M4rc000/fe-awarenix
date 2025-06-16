import { TbArrowBigDownLine, } from "react-icons/tb";
import { CgArrowsExchange } from "react-icons/cg";
import Badge from "../ui/badge/Badge";
import { TfiEmail } from "react-icons/tfi";
import { useEffect, useState } from "react";

export default function CardHeader() {
  const [totalSendingProfiles, setTotalSendingProfiles] = useState(0);
  const [growthDataSendingProfiles, setGrowthDataSendingProfiles] = useState(null);
    
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchTotalLandingPages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/sending-profile/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.Success && typeof data.Total === "number") {
          setTotalSendingProfiles(data.Total);
        }
      } catch (err) {
        console.error("Failed to fetch total landing page:", err);
      }
    };

    fetchTotalLandingPages();
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/analytics/growth-percentage?type=sendingprofiles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        // Check if response is ok
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        return res.json();
      })
      .then(data => {
        if (data.success && data.data) {
          setGrowthDataSendingProfiles(data.data);
        } else {
          console.warn("⚠️ No data received or success = false");
        }
      })
      .catch(error => {
        console.error("❌ Fetch error:", error);
        console.error("🔍 Error details:", error.message);
      });
  }, []);
  return (
    <>
      <div className="grid xl:grid-cols-3 xl:gap-4 gap-4 sm:grid-cols-2 sm:gap-6">
        {/* ─── Total Campaign ─── */}
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 xl:h-24 xl:w-[303px] dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm hover:shadow-gray-600 hover:-translate-y-5 transition duration-300 ease-in-out cursor-pointer">
          {/* Header: icon + title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
              <TfiEmail className="text-gray-800 text-xl dark:text-white/90" />
            </div>
            <span className="xl:text-lg text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Sending Profile
            </span>
            {/* Main stat */}
            <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
              {totalSendingProfiles}
            </h4>
          </div>


          {/* Footer: badge bottom-right */}
          <div className="mt-2 flex justify-end">
            <Badge
              color={
                growthDataSendingProfiles?.growth_type === 'increase'
                  ? 'success'
                  : growthDataSendingProfiles?.growth_type === 'decrease'
                  ? 'danger'
                  : 'warning'
              }
              className="dark:text-gray-400"
            >
              {growthDataSendingProfiles?.growth_type === 'increase' && (
                <TbArrowBigUpLine className="mr-1" />
              )}
              {growthDataSendingProfiles?.growth_type === 'decrease' && (
                <TbArrowBigDownLine className="mr-1" />
              )}
              {growthDataSendingProfiles?.growth_type === 'no_change' && (
                <span className="mr-1 rotate-180 inline-block">
                  <CgArrowsExchange className="mr-1" />
                </span>
              )}
              {growthDataSendingProfiles?.growth_percentage.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
