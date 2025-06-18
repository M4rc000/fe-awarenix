import Input from "../form/input/InputField";
import Label from "../form/Label";
import { forwardRef, useImperativeHandle, useState } from "react";

// Define the ref methods that parent can call
export type EditUserModalFormRef = {
  submitUsers: () => Promise<boolean>;
};

type UserData = {
  id: number;
  name: string;
  email: string;
  position: string;
  password: string;
};

type EditUserModalFormProps = {
  user: UserData;
};

const EditUserModalForm = forwardRef<EditUserModalFormRef, EditUserModalFormProps>(({ user }, ref) => {
  const [formData, setFormData] = useState(user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(ref, () => ({
    async submitUsers() {
      if (isSubmitting) return false;
      
      try {
        setIsSubmitting(true);
        
        const API_URL = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedBy = userData?.id || 0; 

        if (!token) {
          return false;
        }

        const res = await fetch(`${API_URL}/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(
            {
              name: formData.name,
              email: formData.email,
              position: formData.position,
              password: formData.password,
              updatedBy: updatedBy,
            }
          ),
        });

        
        if (!res.ok) {
          return false;
        }

        const data = await res.json();

        // Check different possible success indicators
        const isSuccess = res.ok && (data.Success || data.success || data.status === 'success');
        
        return isSuccess;
      } catch (err) {
        return false;
      } finally {
        setIsSubmitting(false);
      }
    }
  }));

  if (!user) return null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl">
        <div className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label>Position</Label>
            <Input
              placeholder="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="****"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  )
});

EditUserModalForm.displayName = 'EditUserModalForm';

export default EditUserModalForm;