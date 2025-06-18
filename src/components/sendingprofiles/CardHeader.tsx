import { useState, useEffect } from "react";
import { TbArrowBigUpLine, TbArrowBigDownLine } from "react-icons/tb";
import { CgArrowsExchange } from "react-icons/cg";
import { TfiEmail } from "react-icons/tfi";
import Badge from "../ui/badge/Badge";

export default function CardHeader() {
  const [totalSendingProfiles, setTotalSendingProfiles] = useState(0);
  const [growthDataSendingProfiles, setGrowthDataSendingProfiles] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchTotal = async () => {
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
        console.error("❌ Failed to fetch total sending profiles:", err);
      }
    };

    fetchTotal();
  }, []);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/analytics/growth-percentage?type=sendingprofiles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.success && data.data) {
          setGrowthDataSendingProfiles(data.data);
        }
      })
      .catch(error => {
        console.error("❌ Error fetching growth data:", error);
      });
  }, []);

  return (
    <>
      <div className="grid xl:grid-cols-3 xl:gap-4 gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 xl:h-24 xl:w-[310px] dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm hover:shadow-gray-600 hover:-translate-y-2 transition duration-300 ease-in-out cursor-pointer">
          
          {/* Header Section */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg dark:bg-gray-800">
                <TfiEmail className="text-gray-800 text-xl dark:text-white/90" />
              </div>
              <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                Total Sending Profile
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {totalSendingProfiles}
            </h4>
          </div>

          {/* Badge Section */}
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
                <CgArrowsExchange className="mr-1 rotate-180" />
              )}
              {growthDataSendingProfiles?.growth_percentage.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}