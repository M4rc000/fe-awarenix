import {
  ArrowUpIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { RiPagesLine } from "react-icons/ri";

export default function CardHeader() {
  return (
    <>
      <div className="grid xl:grid-cols-3 xl:gap-4 gap-4 sm:grid-cols-2 sm:gap-6">
        {/* ─── Total Campaign ─── */}
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 xl:h-24 xl:w-[303px] dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm hover:shadow-gray-600 hover:-translate-y-5 transition duration-300 ease-in-out cursor-pointer">
          {/* Header: icon + title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
              <RiPagesLine className="text-gray-800 text-xl dark:text-white/90" />
            </div>
            <span className="xl:text-lg text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Landing Page
            </span>
            {/* Main stat */}
            <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
              20
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
      </div>
    </>
  );
}
