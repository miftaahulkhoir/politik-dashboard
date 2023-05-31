import IssueManagement from "@/containers/issue-management";
import DashboardLayout from "@/layouts/DashboardLayout";
import { TbPlus, TbSearch } from "react-icons/tb";

import { Button, Input, notification } from "antd";
import { useState } from "react";

export default function ManagementIssuePage() {
  const [apiNotification, contextHolderNotification] = notification.useNotification();
  const [showModalIssue, setModalIssue] = useState(false);
  const [showModalSubIssue, setModalSubIssue] = useState(false);

  const issueDatas = [];

  return (
    <DashboardLayout
      title="Manajemen Isu · Chakra"
      topBarConfig={{
        title: "Manajemen Isu",
        hideMapButton: true,
        customRender: (
          <div className="flex justify-end w-full">
            <Button className="btn-primary" icon={<TbPlus />} onClick={() => setModalIssue(true)}>
              Tambah Isu
            </Button>
          </div>
        ),
      }}
    >
      <div className="flex flex-col mt-14 ml-[62px] bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white">
        {contextHolderNotification}
        <div className="!h-full !flex-1">
          <div className="px-8 pt-6 pb-2">
            <Input className="w-max" placeholder="Pencarian" prefix={<TbSearch />} />
          </div>
          <IssueManagement
            showModalIssue={showModalIssue}
            setModalIssue={setModalIssue}
            showModalSubIssue={showModalSubIssue}
            setModalSubIssue={setModalSubIssue}
            data={issueDatas}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
