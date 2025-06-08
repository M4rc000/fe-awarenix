import { useState } from "react";
import CampaignsCardHeader from "../../components/campaigns/CampaignsCardHeader";
import Breadcrump from "../../components/utils/Breacrump";
import {CalenderIcon} from "../../icons";
import Button from "../../components/ui/button/Button";
import NewCampaignModal from "../../components/campaigns/NewCampaignModal";
import TableCampaigns from "../../components/campaigns/TableCampaigns";

export default function Campaigns() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Breadcrump icon={<CalenderIcon/>} title="Campaigns" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CampaignsCardHeader />
        </div>
      </div>
      <Button className="text-md mt-5 mb-3" onClick={()=> setModalOpen(true)}>New Campaign</Button>

      <TableCampaigns/>

      <NewCampaignModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}