          
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useState } from "react";

type UserData = {
  id: number;
  name: string;
  email: string;
  position: string;
};

type DeleteUserModalFormProps = {
  user: UserData;
  error?: string;
  isDeleting?: boolean;
  onDelete: () => void;
};

const DeleteUserModalForm = ({ user, error, isDeleting, onDelete }: DeleteUserModalFormProps) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* User Name */}
      <div>
        <Label>User Name</Label>
        <Input 
          type="text"  
          placeholder="user"
          value={user.name}
          readonly
          className="w-full text-sm sm:text-base h-10 px-3"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  )
};

DeleteUserModalForm.displayName = 'DeleteUserModalForm';

export default DeleteUserModalForm;