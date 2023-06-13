import DashboardLayout from "@/layouts/DashboardLayout";

import { Button, DatePicker, Input, Modal, Radio, Select, Space, Typography, Upload, notification } from "antd";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { TbFileUpload, TbDownload } from "react-icons/tb";

import UserFormDrawer from "@/components/pagecomponents/users/UserFormDrawer";
import IssueSearchBar from "@/components/pagecomponents/issues/IssueSearchBar";
import { useFindProfile } from "@/utils/services/profiles";
import { useFindAllUsers } from "@/utils/services/users";
import { dummyTable } from "@/components/pagecomponents/issues/constant";
import IssueDataTable from "@/components/pagecomponents/issues/IssueDataTable";

export default function ManagementDataContainer({ profile }) {
  const [users, setUsers] = useState([]);
  const { users: fetchUsers } = useFindAllUsers();
  useEffect(() => {
    if (!fetchUsers?.length) return;
    setUsers(fetchUsers);
  }, [fetchUsers]);

  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const { profile: currentUser } = useFindProfile();
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  // filters
  const [filterSearch, setFilterSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterGender, setFilterGender] = useState("");

  const filterSearchHandler = debounce((e) => setFilterSearch(e.target.value), 300);

  const filterDateHandler = debounce((_, valueString) => {
    setFilterDate(valueString);
  }, 300);

  const filterGenderHandler = debounce((value) => setFilterGender(value), 300);
  const [showModalUpload, setModalUpload] = useState(false);

  const ButtonUpload = () => (
    <div className="flex justify-end w-full">
      <Button
        icon={<TbFileUpload />}
        className="bg-primary flex items-center"
        onClick={() => setModalUpload((prev) => !prev)}
      >
        Upload data
      </Button>
    </div>
  );

  const [mode, setMode] = useState("pinpoint");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <>
      <Modal
        title={<Typography.Title level={4}>Upload data</Typography.Title>}
        open={showModalUpload}
        centered
        width={800}
        onOk={() => setModalUpload(false)}
        onCancel={() => setModalUpload(false)}
        footer={false}
      >
        <div className="grid grid-cols-2">
          <div className="h-[528px] bg-[#14171E] rounded-lg p-8 leading-10">
            <img style={{ width: "30%", maxHeight: "280px" }} src="/images/ms-excel.svg" alt="select" />
            <Typography.Title level={4}>Perhatian</Typography.Title>
            <Typography>
              Pastikan file excel yang diunggah sesuai dengan template yang diberikan. Seperti dibawah
            </Typography>
            <Typography.Text>Unduh layout excel</Typography.Text>
            <ul className="ml-6">
              <li className="list-disc">
                Layout data <strong>pinpoint</strong>
              </li>
              <Button className="btn-white" icon={<TbDownload />}>
                Induh layout pinpoint
              </Button>
              <li className="list-disc">
                Layout data <strong>tematik</strong>
              </li>
              <Button className="btn-white" icon={<TbDownload />}>
                Unduh layout tematik
              </Button>
            </ul>
          </div>
          <div className="pl-10 leading-7">
            <div>
              <label>Tipe Pemetaan:</label>
              <Radio.Group
                className="flex"
                label="asdads"
                onChange={handleModeChange}
                value={mode}
                style={{ marginBottom: 8 }}
              >
                <Radio.Button value="pinpoint">Pinpoint</Radio.Button>
                <Radio.Button value="tematik">Tematik</Radio.Button>
              </Radio.Group>
            </div>

            <div>
              <label>Nama:</label>
              <Input className="w-full" />
            </div>

            <div>
              <label>Isu:</label>
              <Select className="w-full" />
            </div>

            <div>
              <label>Sub Isu:</label>
              <Select className="w-full" />
            </div>

            <div>
              <label>Bulan/Tahun:</label>
              <DatePicker className="w-full" />
              <span className="text-[12px]">Bulan dan tahun data diambil</span>
            </div>

            <div>
              <label>File Excel:</label>
              <Upload className=" flex w-full">
                <Button className="w-full">Choose file...</Button>
              </Upload>
              <span className="text-[12px]">{`minimum file < 3mb`}</span>
            </div>

            <Button className="btn-primary w-full mt-10" onClick={() => setModalUpload(false)}>
              Upload Sekarang
            </Button>
          </div>
        </div>
      </Modal>
      <DashboardLayout
        profile={profile}
        title="Manajemen Data · Cakra"
        topBarConfig={{
          isShowSearchRegion: true,
          title: "Manajemen Data",
          hideMapButton: true,
          customRender: <ButtonUpload />,
        }}
      >
        <div className="flex flex-col mt-14 ml-[62px] p-10 bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white">
          {contextHolderNotification}

          <UserFormDrawer
            open={isDrawerActive}
            setOpen={setIsDrawerActive}
            apiNotification={apiNotification}
            isEdit={isFormEdit}
            setIsEdit={setIsFormEdit}
            selectedUser={selectedUser}
            setUsers={setUsers}
            currentUser={currentUser}
          />

          <Space direction="vertical" size="middle">
            <IssueSearchBar
              filterSearchHandler={filterSearchHandler}
              filterDateHandler={filterDateHandler}
              filterGenderHandler={filterGenderHandler}
              addUserHandler={() => setIsDrawerActive(true)}
            />

            <IssueDataTable
              data={dummyTable.data}
              currentUser={currentUser}
              setSelectedUser={setSelectedUser}
              setIsFormEdit={setIsFormEdit}
              setIsDrawerActive={setIsDrawerActive}
              apiNotification={apiNotification}
              users={users}
              setUsers={setUsers}
            />
          </Space>
        </div>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
