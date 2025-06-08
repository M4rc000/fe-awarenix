import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LuMousePointerClick } from "react-icons/lu";
import { BiError } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaCircleInfo } from "react-icons/fa6";
import Button from "../ui/button/Button";


interface Campaign {
  id: number;
  name: string;
  schedule: string;
  type: string;
  emailSent: number;
  emailOpened: number;
  clicks: number;
  errors: number;
  impressions: number;
  status: string;
}

// Define the table data using the interface
const tableData: Campaign[] = [
  {
    id: 1,
    name: "Testing SMTP",
    schedule: "01 March 2025",
    type: "Phising ",
    emailSent: 20,
    emailOpened: 5,
    clicks: 5,
    errors: 1,
    impressions: 10,
    status: "Completed",
  },
  {
    id: 2,
    name: "Testing SMTP 2",
    schedule: "01 March 2025",
    type: "Phising ",
    emailSent: 20,
    emailOpened: 15,
    clicks: 5,
    errors: 1,
    impressions: 10,
    status: "Pending",
  },
  {
    id: 3,
    name: "Testing 1",
    schedule: "01 March 2025",
    type: "Phising ",
    emailSent: 10,
    emailOpened: 6,
    clicks: 5,
    errors: 1,
    impressions: 5,
    status: "Completed",
  },
  {
    id: 4,
    name: "Testing SMTP Mailtrap",
    schedule: "01 March 2025",
    type: "Phising ",
    emailSent: 20,
    emailOpened: 10,
    clicks: 5,
    errors: 1,
    impressions: 10,
    status: "Pending",
  },
  {
    id: 5,
    name: "Testing Mailgun",
    schedule: "01 March 2025",
    type: "Phising ",
    emailSent: 10,
    emailOpened: 4,
    clicks: 7,
    errors: 1,
    impressions: 10,
    status: "Completed",
  },
];

export default function TableCampaigns() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                #
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Campaign Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Campaign Schedule
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Campaign Type
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                <HiOutlineMail className="text-center text-xl text-green-600"/>
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                <HiOutlineMailOpen className="text-center text-xl text-yellow-600"/>
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                <LuMousePointerClick className="text-center text-xl text-blue-600"/>
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                <BiError className="text-center text-xl text-red-600"/>
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                <HiOutlineSpeakerphone className="text-center text-xl text-cyan-600"/>
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((Campaign, index) => (
              <TableRow key={Campaign.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="text-white">{index + 1}</span>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                  {Campaign.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {Campaign.schedule}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {Campaign.type}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="mx-[5px]">
                        {Campaign.emailSent}
                    </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="mx-[9px]">
                        {Campaign.emailOpened}
                    </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="mx-[11px]">
                        {Campaign.errors}
                    </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="mx-[9px]">
                        {Campaign.clicks}
                    </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="mx-[5px]">
                        {Campaign.impressions}
                    </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {Campaign.status}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                        <Button size="xs" variant="info">
                            <FaCircleInfo />
                        </Button>
                        <Button size="xs" variant="warning">
                            <BiSolidEditAlt/>
                        </Button>
                        <Button size="xs" variant="danger">
                            <FaRegTrashAlt/>
                        </Button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}