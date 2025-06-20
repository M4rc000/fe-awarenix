import { useState, useEffect } from "react";
import { RiPagesLine } from "react-icons/ri";
import { TbArrowBigUpLine, TbArrowBigDownLine } from "react-icons/tb";
import { CgArrowsExchange } from "react-icons/cg";
import Badge from "../ui/badge/Badge";

export default function CardHeader() {
  const [totalLandingPages, setTotalLandingPages] = useState(0);
  const [growthDataLandingPages, setGrowthDataLandingPages] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchTotalLandingPages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/landing-page/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.Success && typeof data.Total === "number") {
          setTotalLandingPages(data.Total);
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
    fetch(`${API_URL}/analytics/growth-percentage?type=landingpages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.success && data.data) {
          setGrowthDataLandingPages(data.data);
        }
      })
      .catch(error => {
        console.error("❌ Fetch error:", error);
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
                <RiPagesLine className="text-gray-800 text-xl dark:text-white/90" />
              </div>
              <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                Total Landing Page
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {totalLandingPages}
            </h4>
          </div>

          {/* Badge Section */}
          <div className="mt-2 flex justify-end">
            <Badge
              color={
                growthDataLandingPages?.growth_type === 'increase'
                  ? 'success'
                  : growthDataLandingPages?.growth_type === 'decrease'
                  ? 'danger'
                  : 'warning'
              }
              className="dark:text-gray-400"
            >
              {growthDataLandingPages?.growth_type === 'increase' && (
                <TbArrowBigUpLine className="mr-1" />
              )}
              {growthDataLandingPages?.growth_type === 'decrease' && (
                <TbArrowBigDownLine className="mr-1" />
              )}
              {growthDataLandingPages?.growth_type === 'no_change' && (
                <CgArrowsExchange className="mr-1 rotate-180" />
              )}
              {growthDataLandingPages?.growth_percentage.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}