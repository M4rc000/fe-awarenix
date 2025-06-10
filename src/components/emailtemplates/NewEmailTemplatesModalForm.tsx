          
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useMediaQuery } from "react-responsive";
import Tabs from "../common/Tabs";

export default function NewEmailTemplatesModalForm() {
  const isMobile = useMediaQuery({ maxWidth: 640 }); // sm breakpoint
  return (
    <div className="space-y-6">
      {isMobile ? (
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Label>Template Name</Label>
            <Input
              placeholder="Dropbox"
              type="text"
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
          <div>
            <Label>Envelope Sender</Label>
            <Input
              placeholder="Team A"
              type="text"
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
          <div>
            <Label>Subject</Label>
            <Input
              placeholder="Login Verification"
              type="text"
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          <div>
            <Label>Template Name</Label>
            <Input
              placeholder="Dropbox"
              type="text"
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
          <div>
            <Label>Envelope Sender</Label>
            <Input
              placeholder="Team A"
              type="text"
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
          <div>
            <Label>Subject</Label>
            <Input
              placeholder="Login Verification"
              type="text"
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
        </div>
      )}

      <Tabs/>
    </div>
  );
}