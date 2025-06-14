import { useState } from "react";
import Button from "../../components/ui/button/Button";
import NewUserModal from "../../components/usersgroups/NewUserModal";
import TableUsers from "../../components/usersgroups/TableUsers";

export default function ManageUser() {
    const [modalOpen, setModalOpen] = useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const fetchData = () => {
        // Ubah state agar TableUsers ter-trigger re-fetch
        setReloadTrigger(prev => prev + 1);
    }
    return (
        <div className="">
            <Button className="text-md mt-2 mb-3" onClick={()=> setModalOpen(true)}>New User</Button>
            <TableUsers/>
            <NewUserModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onUserAdded={fetchData} 
            />
        </div>
    );
}