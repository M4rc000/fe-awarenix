import { useEffect, useState } from "react";
import CardHeader from "../../components/usersgroups/CardHeader";
import Breadcrump from "../../components/utils/Breacrump";
import {GroupIcon} from "../../icons";
import ManageGroup from "./ManageGroup";
import ManageUser from "./ManageUser";

export default function UsersGroups() {
  const [activeTab, setActiveTab] = useState('Groups');
  const tabs = ['Groups', 'Users'];
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Groups':
        return <ManageGroup reloadTrigger={reloadTrigger} onReload={() => setReloadTrigger(r => r + 1)}/>;
      case 'Users':
        return <ManageUser reloadTrigger={reloadTrigger} onReload={() => setReloadTrigger(r => r + 1)}/>;
      default:
        return null;
    }
  };

  return (
    <>
      <Breadcrump icon={<GroupIcon/>} title="Users & Groups" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CardHeader reloadTrigger={reloadTrigger}/>
        </div>
      </div>
      {/* Navigation */}
      <nav className="border-b border-slate-400 dark:border-slate-700 mt-5 mx-4">
        <div className="px-8 py-2">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-lg font-medium transition-colors duration-200 px-4 py-2 rounded-md ${
                  activeTab === tab
                    ? 'text-gray-200 bg-gray-700 dark:bg-gray-800'
                    : 'text-slate-700 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="px-8 py-8">
        <div className="max-w-4xl">
          {renderTabContent()}
        </div>
      </main>
    </>
  );
}