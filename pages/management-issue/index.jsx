import IssueManagement from "@/containers/issue-management";
import DashboardLayout from "@/layouts/DashboardLayout";
import { TbSearch } from "react-icons/tb";

import { Input, notification } from "antd";

export default function ManagementIssuePage() {
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const issueDatas = [];

  return (
    <DashboardLayout
      title="Manajemen Isu · Patrons"
      topBarConfig={{ isShowSearchRegion: true, title: "Manajemen Isu", hideMapButton: true }}
    >
      <div className="flex flex-col mt-14 ml-[62px] bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white">
        {contextHolderNotification}
        <div className="!h-full !flex-1">
          <div className="px-8 pt-6 pb-2">
            <Input className="w-max" placeholder="Pencarian" prefix={<TbSearch />} />
          </div>
          <IssueManagement data={issueDatas} />
        </div>
      </div>
    </DashboardLayout>
  );
}
