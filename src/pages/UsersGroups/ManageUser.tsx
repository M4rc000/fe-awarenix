import { useState } from "react";
import Button from "../../components/ui/button/Button";
import NewUserModal from "../../components/usersgroups/NewUserModal";
import TableUsers from "../../components/usersgroups/TableUsers";

export default function ManageGroup() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="">
            <Button className="text-md mt-2 mb-3" onClick={()=> setModalOpen(true)}>New User</Button>
            <TableUsers/>
            <NewUserModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}