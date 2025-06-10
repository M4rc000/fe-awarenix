import {
  ArrowUpIcon,
} from "../icons";
import { FaUser } from "react-icons/fa";
import Badge from "../components/ui/badge/Badge";
import { MdGroups } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";

export default function CardHeader() {
  const { isExpanded, isHovered } = useSidebar();
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
              10
            </h4>
          </div>


          {/* Footer: badge bottom-right */}
          <div className="mt-2 xl:mr-5 flex justify-end">
            <Badge color="success">
              <ArrowUpIcon className="size-3 mr-1" />
              11.01%
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
              50
            </h4>
          </div>
          <div className="mt-2 xl:mr-4 flex justify-end">
            <Badge color="success">
              <ArrowUpIcon className="size-3 mr-1" />
              11.01%
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}