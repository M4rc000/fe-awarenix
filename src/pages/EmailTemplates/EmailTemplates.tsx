import { useState } from "react";
import CardHeader from "../../components/emailtemplates/CardHeader";
import Breadcrump from "../../components/utils/Breacrump";
import {MailIcon} from "../../icons";
import Button from "../../components/ui/button/Button";
import NewEmailTemplatesModal from "../../components/emailtemplates/NewEmailTemplatesModal";
import TableEmailTemplates from "../../components/emailtemplates/TableEmailTemplates";

export default function Campaigns() {
  const [newModalOpen, setNewModalOpen] = useState(false);
  return (
    <>
      <Breadcrump icon={<MailIcon/>} title="Email Templates" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CardHeader />
        </div>
      </div>
      <Button className="text-md mt-5 mb-3" onClick={()=> setNewModalOpen(true)}>New Email Template</Button>

      <TableEmailTemplates/>

      <NewEmailTemplatesModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
      />
    </>
  );
}