import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Tabs from "../common/Tabs";
import EmailBodyEditor from "./EmailBodyEditor";
import { forwardRef, useImperativeHandle } from "react";
import Swal from "../utils/AlertContainer";

export type NewEmailTemplatesModalFormRef = {
  submitEmailTemplates: () => Promise<EmailTemplate | null>;
  emailtemplate: EmailTemplate | null;
};

type NewEmailTemplatesModalFormProps = {
  onSuccess?: () => void;
};

// Define user data structure
type EmailTemplatesData = {
  name: string;
  sender: string;
  subject: string;
  body: string;
};

const NewEmailTemplatesModalForm = forwardRef<NewEmailTemplatesModalFormRef, NewEmailTemplatesModalFormProps>(({ onSuccess }, ref) => {
  const [emailtemplate, setEmailTemplate] = useState<EmailTemplatesData>({
    name: "",
    sender: "",
    subject: "",
    body: "",
  });
  const [templateName, setTemplateName] = useState("Welcome Email");
  const [envelopeSender, setEnvelopeSender] = useState("team@company.com");
  const [subject, setSubject] = useState("Welcome to Our Platform!");
  const [errors, setErrors] = useState<Partial<EmailTemplatesData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // VALIDATION FUNCTION
  const validateForm = (): boolean => {
    const newErrors: Partial<EmailTemplatesData> = {};

    if (!emailtemplate.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!emailtemplate.sender.trim()) {
      newErrors.sender = "Envelope Sender is required";
    }
    if (!emailtemplate.subject.trim()) {
      newErrors.subject = "Subject Email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitEmailTemplates = async (): Promise<boolean> => {
    // CEK VALIDASI
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/email-template/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify(emailtemplate),
      });


      if (!response.ok) {
        let errorMessage = 'Failed to create user';
        
        // Cek content type sebelum parsing
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch (jsonError) {
            console.error('Failed to parse JSON error:', jsonError);
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          }
        } else {
          // Jika bukan JSON, jangan coba parse sebagai JSON
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      Swal.fire({
        text: "Email Template successfully added!",
        icon: "success",
        duration: 3000
      });

      if (onSuccess) onSuccess(); 

      // Reset form on success
      setEmailTemplate({
        name: "",
        sender: "",
        subject: "",
        body: "",
      });
      setErrors({});
      
      return true;
      
    } catch (error) {
      console.error('Error creating user:', error);
      
      // Set error message untuk user
      if (error instanceof Error) {
        // Cek jika error terkait network
        if (error.message.includes('fetch')) {
          setErrors({
            name: 'Connection error. Please check if server is running.',
          });
        } else if (error.message.toLowerCase().includes('sender')) {
          setErrors({
            sender: error.message,
          });
        } else if (error.message.toLowerCase().includes('subject')) {
          setErrors({
            subject: error.message,
          });
        }
         else {
          setErrors({
            name: error.message,
          });
        }
      }
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    submitEmailTemplates,
  }));

  // Handle input changes - dengan safety check
  const handleInputChange = (field: keyof EmailTemplatesData, value: string) => {
    // Prevent submit trigger dari input change
    if (isSubmitting) {
      // console.log('Ignoring input change during submission');
      return;
    }
    
    setEmailTemplate(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

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
              onChange={(e) => {
                setTemplateName(e.target.value);
                handleInputChange('name', e.target.value)
              }}
              disabled={isSubmitting}
              className={`w-full text-sm sm:text-base h-10 px-3 ${errors.name ? 'border-red-500': ''}`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
          </div>
          <div>
            <Label>Envelope Sender</Label>
            <Input 
              placeholder="team@company.com" 
              type="email" 
              value={envelopeSender} 
              onChange={(e) => setEnvelopeSender(e.target.value)}
              className={`w-full text-sm sm:text-base h-10 px-3 ${errors.sender ? 'border-red-500' : ''}`}
            />
              {errors.sender && (
                <p className="text-red-500 text-sm mt-1">{errors.sender}</p>
              )}
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
});

export default NewEmailTemplatesModalForm;