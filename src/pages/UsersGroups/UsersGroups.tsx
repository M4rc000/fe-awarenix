import { useState } from "react";
import CardHeader from "../../components/usersgroups/CardHeader";
import Breadcrump from "../../components/utils/Breacrump";
import {GroupIcon} from "../../icons";
import Button from "../../components/ui/button/Button";
import NewGroupModal from "../../components/usersgroups/NewGroupModal";
import TableUsersGroups from "../../components/usersgroups/TableUsersGroups";

export default function UsersGroups() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Breadcrump icon={<GroupIcon/>} title="Users & Groups" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CardHeader />
        </div>
      </div>
      <Button className="text-md mt-5 mb-3" onClick={()=> setModalOpen(true)}>New Group</Button>

      <TableUsersGroups/>

      <NewGroupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}