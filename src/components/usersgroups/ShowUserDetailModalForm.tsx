import Input from "../form/input/InputField";
import Label from "../form/Label";

// Define the ref methods that parent can call
export type ShowUserModalFormRef = {
  submitUsers: () => Promise<boolean>;
};

// Define user data structure
type UserData = {
  name: string;
  email: string;
  position: string;
};

type ShowUserDetailModalFormProps = {
  user: UserData;
};

const ShowUserDetailModalForm = ({ user }: ShowUserDetailModalFormProps) => {
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

ShowUserDetailModalForm.displayName = 'ShowUserDetailModalForm';

export default ShowUserDetailModalForm;