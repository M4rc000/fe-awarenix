import { useState } from "react";
import CardHeader from "../../components/landingpages/CardHeader";
import Breadcrump from "../../components/utils/Breacrump";
import { TableIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import NewEmailTemplatesModal from "../../components/emailtemplates/NewEmailTemplatesModal";
import TableLandingPages from "../../components/landingpages/TableLandingPages";

export default function LandingPages() {
  const [newModalOpen, setNewModalOpen] = useState(false);
  return (
    <>
      <Breadcrump icon={<TableIcon/>} title="Landing Pages" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CardHeader />
        </div>
      </div>
      <Button className="text-md mt-5 mb-3" onClick={()=> setNewModalOpen(true)}>New Landing Page</Button>

      <TableLandingPages/>

      <NewEmailTemplatesModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
      />
    </>
  );
}