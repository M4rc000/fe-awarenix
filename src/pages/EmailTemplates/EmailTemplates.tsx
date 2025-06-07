import Breadcrump from "../../components/utils/Breacrump";
import { MailIcon } from "../../icons";

export default function EmailTemplates() {
    return (
        <div className="container mx-auto p-4">
            <Breadcrump icon={<MailIcon />} title="Email Templates" />
            <p className="text-gray-700">This page will display the email templates.</p>
            {/* Add your user group components here */}
        </div>
    );
}