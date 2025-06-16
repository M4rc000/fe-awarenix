import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Badge from "../ui/badge/Badge";
import { MdGroups } from "react-icons/md";
import { useSidebar } from "../../context/SidebarContext";
import { CgArrowsExchange } from "react-icons/cg";
import { TbArrowBigUpLine, TbArrowBigDownLine } from "react-icons/tb";

export default function CardHeader() {
  const { isExpanded, isHovered } = useSidebar();
  const [totalGroups, setTotalGroups] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [growthDataUser, setGrowthDataUser] = useState(null);
  const [growthDataGroup, setGrowthDataGroup] = useState(null);

  
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchTotalGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/groups/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.Success && typeof data.Total === "number") {
          setTotalGroups(data.Total);
        }
      } catch (err) {
        console.error("Failed to fetch total groups:", err);
      }
    };
    
    fetchTotalGroups();
  }, []);
  
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchTotalUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.Success && typeof data.Total === "number") {
          setTotalUsers(data.Total);
        }
      } catch (err) {
        console.error("Failed to fetch total users:", err);
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/analytics/growth-percentage?type=groups`, {
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
          setGrowthDataGroup(data.data);
          console.log("💾 Data saved to state:", data.data);
        } else {
          console.warn("⚠️ No data received or success = false");
        }
      })
      .catch(error => {
        console.error("❌ Fetch error:", error);
        console.error("🔍 Error details:", error.message);
      });
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/analytics/growth-percentage?type=users`, {
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
          setGrowthDataUser(data.data);
          console.log("💾 Data saved to state:", data.data);
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
        {/* ─── Total Users ─── */}
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 xl:h-24 xl:w-64 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm hover:shadow-gray-600 hover:-translate-y-5 transition duration-300 ease-in-out cursor-pointer">
          {/* Header: icon + title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
              <MdGroups className="text-gray-800 text-xl dark:text-white/90" />
            </div>
            <span className="text-xl font-medium text-gray-500 dark:text-gray-400">
              Total Groups
            </span>
            {/* Main stat */}
            <h4 className="text-lg font-bold text-gray-800 dark:text-white/90">
              {totalGroups}
            </h4>
          </div>


          {/* Footer: badge bottom-right */}
          <div className="mt-2 xl:mr-5 flex justify-end">
            <Badge
              color={
                growthDataGroup?.growth_type === 'increase'
                  ? 'success'
                  : growthDataGroup?.growth_type === 'decrease'
                  ? 'danger'
                  : 'warning'
              }
              className="dark:text-gray-400"
            >
              {growthDataGroup?.growth_type === 'increase' && (
                <TbArrowBigUpLine className="mr-1" />
              )}
              {growthDataGroup?.growth_type === 'decrease' && (
                <TbArrowBigDownLine className="mr-1" />
              )}
              {growthDataGroup?.growth_type === 'no_change' && (
                <span className="mr-1 rotate-180 inline-block">
                  <CgArrowsExchange className="mr-1" />
                </span>
              )}
              {growthDataGroup?.growth_percentage.toFixed(2)}%
            </Badge>
          </div>
        </div>

        {/* ─── Since Last Campaign ─── */}
        <div className={`flex flex-col rounded-xl border xl:h-24 xl:w-60 ${isExpanded || isHovered ? 'xl:mx-22' : 'xl:mx-12' } border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm hover:shadow-gray-600 hover:-translate-y-5 transition duration-300 ease-in-out cursor-pointer`}>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
              <FaUser className="text-gray-800 text-xl dark:text-white/90" />
            </div>
            <span className="text-xl font-medium text-gray-500 dark:text-gray-400">
              Total Users
            </span>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white/90">
              {totalUsers}
            </h4>
          </div>
          <div className="mt-2 xl:mr-4 flex justify-end">
            <Badge
              color={
                growthDataUser?.growth_type === 'increase'
                  ? 'success'
                  : growthDataUser?.growth_type === 'decrease'
                  ? 'danger'
                  : 'warning'
                }
              className="dark:text-gray-400"
            >
              {growthDataUser?.growth_type === 'increase' && (
                  <TbArrowBigUpLine className="mr-1"/>
                )}
              {growthDataUser?.growth_type === 'decrease' && (
                <TbArrowBigDownLine className="mr-1"/>
              )}
              {growthDataUser?.growth_type === 'no_change' && (
                <CgArrowsExchange className="mr-1" />
              )}
              {growthDataUser?.growth_percentage.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}