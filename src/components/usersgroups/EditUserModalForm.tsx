import Input from "../form/input/InputField";
import Label from "../form/Label";

// Define the ref methods that parent can call
export type EditUserModalFormRef = {
  submitUsers: () => Promise<boolean>;
};

type UserData = {
  name: string;
  email: string;
  position: string;
};

type EditUserModalFormProps = {
  user: UserData;
};

const EditUserModalForm = ({ user }: EditUserModalFormProps) => {
  if (!user) return null;
  return (
    <div className="space-y-4">
    <div className="rounded-xl">
        <div className="space-y-3">
        <div>
            <Label>Name</Label>
            <Input
            placeholder="Name"
            value={user.name}
            readonly
        />
        </div>

        <div>
            <Label>Email</Label>
            <Input
            placeholder="Email"
            type="email"
            value={user.email}
            readonly
            />
        </div>

        <div>
            <Label>Position</Label>
            <Input
            placeholder="Position"
            value={user.position}
            readonly
            />
        </div>
        </div>
    </div>
    </div>
)};

EditUserModalForm.displayName = 'EditUserModalForm';

export default EditUserModalForm;