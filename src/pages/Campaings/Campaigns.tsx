import Breadcrump from "../../components/utils/Breacrump";
import {CalenderIcon} from "../../icons";

export default function Campaigns() {
  return (
    <div className="container mx-auto p-4">
      <Breadcrump icon={<CalenderIcon />} title="Campaigns" />
      <p className="text-gray-700">This page will display the campaigns.</p>
      {/* Add your campaign components here */}
    </div>
  );
}