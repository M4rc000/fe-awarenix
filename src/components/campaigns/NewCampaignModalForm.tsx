import { useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { TimeIcon } from "../../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../ui/button/Button";
import { useMediaQuery } from "react-responsive";
import { BiUser } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Select from '../form/Select'
import DatePicker from "../form/date-picker";

export default function NewCampaignModalForm() {
  const isMobile = useMediaQuery({ maxWidth: 640 }); // sm breakpoint
  const [campaignType, setCampaignType] = useState<string | null>(null);
  const [phisingSchedule, setphisingSchedule] = useState<string | null>(null);
  const [frequencyTraining, setFrequencyTraining] = useState<string | null>(null);

  const showPhishingSchedule = campaignType == "1" || campaignType == "3";
  const showFrequencyTraining = campaignType == "2" || campaignType == "3";
  const showSetupSchedule = phisingSchedule == "2"
  const showFrequencySchedule = frequencyTraining == "2" || frequencyTraining == "3"  || frequencyTraining == "4"  || frequencyTraining == "5";

  const campaignTypeOptions = [
    { value: "1", label: "Phising Simulation"},
    { value: "2", label: "Training Modules"},
    { value: "3", label: "Phising Simulation & Training Modules"},
  ];

  const trainingFrequencyOptions = [
    { value: "1", label: "One-off"},
    { value: "2", label: "Daily"},
    { value: "3", label: "Weekly"},
    { value: "4", label: "Monthly"},
    { value: "5", label: "Yearly"},
  ];

  const phisingScheduleOptions = [
    { value: "1", label: "Delivery Immediately" },
    { value: "2", label: "Setup Schedule" },
    { value: "3", label: "Schedule Later" },
  ];

  type User = { name: string; email: string; position: string };

  const [users, setUsers] = useState<User[]>([
    { name: "", email: "", position: "" },
  ]);

  const addRow = () => {
    setUsers([...users, { name: "", email: "", position: "" }]);
  };

  const removeRow = (index: number) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateRow = (
    index: number,
    field: keyof User,
    value: string
  ) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
  };

  return (
    <div className="space-y-6 overflow-visible">
      {/* Campaign Name */}
      {isMobile ? (
        <>
          <div className="grid grid-cols-1 overflow-visible">
            <Label>Campaign Name</Label>
            <Input
              placeholder="Campaign A"
              type="text"
              className="w-full text-sm sm:text-base h-10 px-3"
              required
            />

            <div className="relative mt-2 z-[991]">
              <Label>Campaign Type</Label>
              <Select
                options={campaignTypeOptions}
                onChange={(value) => {
                  setCampaignType(value);
                  setphisingSchedule(null);
                  setFrequencyTraining(null);
                }}
                required
                />
            </div>

            {showPhishingSchedule && (
              <div className="relative mt-2 mb-2 z-[99]">
                <Label>Phishing Schedule</Label>
                <Select
                  label="Phishing Delivery Schedule"
                  options={phisingScheduleOptions}
                  onChange={(value) => {
                    setphisingSchedule(value);
                  }}
                  required
                />
              </div>
            )}

            {showFrequencyTraining && (
              <div className="mt-2">
                <Label>Frequency Training</Label>
                <Select
                  options={trainingFrequencyOptions}
                  onChange={(value) => {
                    setFrequencyTraining(value);
                  }}
                  required
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 overflow-visible">
            {showSetupSchedule && (
              <>
                <DatePicker
                  id="date-picker"
                  label="Date Schedule Phising"
                  placeholder="Select a date"
                  onChange={(dates, currentDateString) => {
                    console.log({ dates, currentDateString });
                  }}
                />
                <div className="mt-3">
                  <Label htmlFor="tm">Time Schedule Phising</Label>
                  <div className="relative">
                    <Input
                      type="time"
                      id="tm"
                      name="tm"
                      lang="id"
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <TimeIcon className="size-6" />
                    </span>
                  </div>
                </div>
              </>
            )}

            {showFrequencySchedule && (
              <>
                <h4 className="text-gray-500 dark:text-gray-300 mb-2">Expire after</h4>
                <DatePicker
                  id="date-picker"
                  label="Date Frequency Training"
                  placeholder="Select a date"
                  onChange={(dates, currentDateString) => {
                    console.log({ dates, currentDateString });
                  }}
                />
                <div className="mt-3">
                  <Label htmlFor="tm">Time Frequency Training</Label>
                  <div className="relative">
                    <Input
                      type="time"
                      id="tm"
                      name="tm"
                      lang="id"
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <TimeIcon className="size-6" />
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>  
      ) : (
        <div className="grid grid-cols-4 gap-4 overflow-visible">
          <div>
            <Label>Campaign Name</Label>
            <Input
              placeholder="Campaign A"
              type="text"
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>

          <div>
            <Label>Campaign Type</Label>
            <Select
              options={campaignTypeOptions}
              onChange={(value) => console.log("Campaign Typcy:", value)}
              required
              />
          </div>

          {showPhishingSchedule && (
            <div>
              <Label>Phising Schedule</Label>
              <Select
                label="Phising Delivery Schedule"
                options={phisingScheduleOptions}
                onChange={(value) => console.log("Selected Phishing Schedule:", value)}
                required
                />
            </div>
          )}

          {showFrequencyTraining && (
            <div>
              <Label>Frequency Training</Label>
              <Select
                options={trainingFrequencyOptions}
                onChange={(value) => console.log("Selected Frequency:", value)}
                required
              />
            </div>
          )}
        </div>
      )}

      {/* Add Row Button */}
      <div className="pt-2">
        <Button variant="outline" onClick={addRow}>
          <BsFillPersonPlusFill/>
        </Button>
      </div>

      {/* User List */}
      {isMobile ? (
        // MOBILE: Collapse style
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 p-4 space-y-4 bg-gray-50 dark:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold flex items-center gap-2 dark:text-gray-600 text-gray-500">
                  <BiUser />
                  User #{index + 1}
                </div>
                <button
                  onClick={() => removeRow(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  <FaRegTrashAlt />
                </button>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) => updateRow(index, "name", e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={user.email}
                  onChange={(e) => updateRow(index, "email", e.target.value)}
                />
                <Input
                  placeholder="Position"
                  value={user.position}
                  onChange={(e) => updateRow(index, "position", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // DESKTOP: Table style
        <div className="overflow-x-auto">
          <Table className="min-w-[800px] dark:text-gray-600">
            <TableHeader>
              <TableRow>
                <TableCell isHeader 
                  className="
                        relative 
                        px-5 py-3 pr-6
                        text-center text-gray-500 text-sm 
                        cursor-pointer select-none"
                >#</TableCell>
                <TableCell isHeader className="
                        relative 
                        px-5 py-3 pr-6
                        text-center text-gray-500 text-sm 
                        cursor-pointer select-none
                ">User Name</TableCell>
                <TableCell isHeader
                className="
                        relative 
                        px-5 py-3 pr-6
                        text-center text-gray-500 text-sm 
                        cursor-pointer select-none
                      ">User Email</TableCell>
                <TableCell isHeader
                className="
                        relative 
                        px-5 py-3 pr-6
                        text-center text-gray-500 text-sm 
                        cursor-pointer select-none
                      ">User Position</TableCell>
                <TableCell isHeader
                className="
                        relative 
                        px-5 py-3 pr-6
                        text-center text-gray-500 text-sm 
                        cursor-pointer select-none
                      ">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index} >
                  <TableCell className="pl-5 pb-4">{index + 1}</TableCell>
                  <TableCell className="px-2 pb-4">
                    <Input
                      placeholder="Name"
                      value={user.name}
                      onChange={(e) =>
                        updateRow(index, "name", e.target.value)
                      }
                      className="text-sm h-9 w-full"
                    />
                  </TableCell>
                  <TableCell className="px-2 pb-4">
                    <Input
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) =>
                        updateRow(index, "email", e.target.value)
                      }
                      className="text-sm h-9 w-full"
                    />
                  </TableCell>
                  <TableCell className="px-2 pb-4">
                    <Input
                      placeholder="Position"
                      value={user.position}
                      onChange={(e) =>
                        updateRow(index, "position", e.target.value)
                      }
                      className="text-sm h-9 w-full"
                    />
                  </TableCell>
                  <TableCell className="px-2 text-center pb-4">
                    <Button
                      size="xs"
                      variant="danger"
                      onClick={() => removeRow(index)}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}