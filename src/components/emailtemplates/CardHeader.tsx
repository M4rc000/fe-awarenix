import { useState, useEffect, useCallback } from "react";
import { RiPagesLine } from "react-icons/ri";

export default function CardHeader({ reloadTrigger }: { reloadTrigger: number }) {
  const [totalEmailTemplates, setTotalEmailTemplates] = useState(0);
  // type GrowthData = {
  //   growth_type: 'increase' | 'decrease' | 'no_change';
  //   growth_percentage: number;
  // } | null;

  // const [growthDataEmailTemplates, setGrowthDataEmailTemplates] = useState<GrowthData | null>(null);

  const fetchTotalEmailTemplates = useCallback(async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/email-template/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.Success && typeof data.Total === "number") {
        setTotalEmailTemplates(data.Total);
      }
    } catch (err) {
      console.error("Failed to fetch total email template:", err);
    }
  }, []);

  // const fetchGrowthData = useCallback(async () => {
  //   const API_URL = import.meta.env.VITE_API_URL;
  //   const token = localStorage.getItem("token");
  //   try {
  //     const res = await fetch(`${API_URL}/analytics/growth-percentage?type=emailtemplates`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //     });
  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //     const data = await res.json();
  //     if (data.success && data.data) {
  //       setGrowthDataEmailTemplates(data.data);
  //     }
  //   } catch (error) {
  //     console.error("❌ Fetch error:", error);
  //   }
  // }, []);

  useEffect(() => {
    fetchTotalEmailTemplates();
    // fetchGrowthData();

    const intervalId = setInterval(() => {
      fetchTotalEmailTemplates();
      // fetchGrowthData();
    }, 5000); 

    return () => clearInterval(intervalId);

  }, [reloadTrigger, fetchTotalEmailTemplates]); 

  return (
    <>
      <div className="grid xl:grid-cols-3 xl:gap-4 gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-4 xl:h-20 xl:w-[310px] dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm hover:shadow-gray-600 hover:-translate-y-2 transition duration-300 ease-in-out cursor-pointer">
          
          {/* Header Section */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg dark:bg-gray-800">
                <RiPagesLine className="text-gray-800 text-xl dark:text-white/90" />
              </div>
              <span className="text-md font-medium text-gray-500 dark:text-gray-400">
                Total Email Template
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {totalEmailTemplates}
            </h4>
          </div>

          {/* Badge Section */}
          {/* <div className="mt-2 flex justify-end">
            {growthDataEmailTemplates && (
                <Badge
                    color={
                        growthDataEmailTemplates.growth_type === 'increase'
                        ? 'success'
                        : growthDataEmailTemplates.growth_type === 'decrease'
                        ? 'error'
                        : 'warning'
                    }
                    className="dark:text-gray-400"
                >
                    {growthDataEmailTemplates.growth_type === 'increase' && (
                        <TbArrowBigUpLine className="mr-1" />
                    )}
                    {growthDataEmailTemplates.growth_type === 'decrease' && (
                        <TbArrowBigDownLine className="mr-1" />
                    )}
                    {growthDataEmailTemplates.growth_type === 'no_change' && (
                        <CgArrowsExchange className="mr-1 rotate-180" />
                    )}
                    {growthDataEmailTemplates.growth_percentage.toFixed(2)}%
                </Badge>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}