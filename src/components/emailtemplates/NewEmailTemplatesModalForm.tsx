import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Tabs from "../common/Tabs";
import EmailBodyEditor from "./EmailBodyEditor";

export default function NewEmailTemplatesModalForm() {
  const [templateName, setTemplateName] = useState("Welcome Email");
  const [envelopeSender, setEnvelopeSender] = useState("team@company.com");
  const [subject, setSubject] = useState("Welcome to Our Platform!");

  const emailTabs = [
    {
      label: "📝 Email Body",
      content: <EmailBodyEditor 
        templateName={templateName}
        envelopeSender={envelopeSender}
        subject={subject}
      />,
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          📧 Email Configuration
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Template Name</Label>
            <Input 
              placeholder="Welcome Email" 
              type="text" 
              value={templateName} 
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
          <div>
            <Label>Envelope Sender</Label>
            <Input 
              placeholder="team@company.com" 
              type="email" 
              value={envelopeSender} 
              onChange={(e) => setEnvelopeSender(e.target.value)}
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
          <div>
            <Label>Subject Line</Label>
            <Input 
              placeholder="Welcome to Our Platform!" 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-sm sm:text-base h-10 px-3"
            />
          </div>
        </div>
      </div>

      <Tabs tabs={emailTabs} />
    </div>
  );
}