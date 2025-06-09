import {
  ArrowUpIcon,
  BoxIconLine,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { SiMinutemailer } from "react-icons/si";
import { useSidebar } from "../../context/SidebarContext";

export default function CardHeader() {
  const { isExpanded, isHovered } = useSidebar();
  return (
    <>
      <div className="grid xl:grid-cols-3 xl:gap-4 gap-4 sm:grid-cols-2 sm:gap-6">
        {/* ─── Total Campaign ─── */}
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 xl:h-24 xl:w-64 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm hover:shadow-gray-600 hover:-translate-y-5 transition duration-300 ease-in-out cursor-pointer">
          {/* Header: icon + title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
              <SiMinutemailer className="text-gray-800 text-xl dark:text-white/90" />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Campaigns
            </span>
            {/* Main stat */}
            <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
              3,782
            </h4>
          </div>


          {/* Footer: badge bottom-right */}
          <div className="mt-2 flex justify-end">
            <Badge color="success">
              <ArrowUpIcon className="size-3 mr-1" />
              11.01%
            </Badge>
          </div>
        </div>

        {/* ─── Since Last Campaign ─── */}
        <div className={`flex flex-col rounded-xl border xl:h-24 xl:w-64 ${isExpanded || isHovered ? 'xl:mx-22' : 'xl:mx-12' } border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm hover:shadow-gray-600 hover:-translate-y-5 transition duration-300 ease-in-out cursor-pointer`}>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 text-xl dark:text-white/90" />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Since Last Campaign
            </span>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
              4 Day(s)
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
