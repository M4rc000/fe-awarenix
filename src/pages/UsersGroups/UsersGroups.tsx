import Breadcrump from "../../components/utils/Breacrump";
import { GroupIcon } from "../../icons";

export default function UsersGroups() {
    return (
        <div className="container mx-auto p-4">
            <Breadcrump icon={<GroupIcon />} title="User Groups" />
            <p className="text-gray-700">This page will display the user groups.</p>
            {/* Add your user group components here */}
        </div>
    );
}