import DashboardLayout from "@/layouts/DashboardLayout";
import "moment/locale/id";

import { Button, DatePicker, Form, Modal, Select, Space, Typography, Upload, notification } from "antd";
import debounce from "lodash.debounce";
import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { TbFileUpload, TbDownload } from "react-icons/tb";

import UserFormDrawer from "@/components/pagecomponents/users/UserFormDrawer";
import IssueSearchBar from "@/components/pagecomponents/issues/IssueSearchBar";
import { useFindProfile } from "@/utils/services/profiles";
import { useFindAllUsers } from "@/utils/services/users";
import IssueDataTable from "@/components/pagecomponents/issues/IssueDataTable";
import accessChecker from "@/utils/helpers/accessChecker";
import { ACCESS_LIST } from "@/constants/access-list";
import Link from "next/link";
import moment from "moment";
import { importIssues, useFindAllIssues, useFindAllSubIssues } from "@/utils/services/issue";
import { useFindAllData } from "@/utils/services/data";
import { useMemo } from "react";

export default function ManagementDataContainer({ profile }) {
  const [users, setUsers] = useState([]);
  const { users: fetchUsers } = useFindAllUsers();
  const { allData, mutate: refetchAllData } = useFindAllData();

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
  const [filterIssue, setFilterIssue] = useState("");

  const filterSearchHandler = debounce((e) => setFilterSearch(e.target.value), 300);

  const filterDateHandler = debounce((_, valueString) => {
    setFilterDate(valueString);
  }, 300);

  const filterIssueHandler = debounce((value) => setFilterIssue(value), 300);
  const [showModalUpload, setModalUpload] = useState(false);

  const issueOption = useMemo(
    () => [
      { label: "Semua isue", value: "" },
      ...uniqBy(
        allData?.map?.((data) => ({
          label: data?.issue_type,
          value: data?.issue_type,
        })),
        "value",
      ),
    ],
    [allData],
  );

  const mappedData = useMemo(() => {
    return allData
      ?.map((data) => ({
        name: data?.name,
        category_name: data?.issue_type,
        sub_category: data?.sub_issue,
        type: "",
        file_url: data?.file_url,
        month: moment(data?.created_at)?.locale("id")?.format("MMMM"),
        year: moment(data?.created_at)?.locale("id")?.format("YYYY"),
        upload_date: moment(data?.created_at)?.locale("id")?.format("DD MMM YYYY"),
      }))
      ?.filter?.((data) => data?.name?.toLowerCase().includes(filterSearch?.toLowerCase()))
      ?.filter?.((data) => data?.category_name?.includes(filterIssue))
      ?.filter?.((data) => moment(data?.created_at)?.locale("id")?.format("YYYY").includes(filterDate));
  }, [allData, filterDate, filterIssue, filterSearch]);

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

  // const [mode, setMode] = useState("pinpoint");
  const [form] = Form.useForm();
  const [selectedIssue, setSelectedIssue] = useState({});

  // const handleModeChange = (e) => {
  //   setMode(e.target.value);
  // };

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("file", data?.file?.file?.originFileObj);
    formData.append("year", moment(data?.year).format("YYYY"));
    formData.append("issue", data?.issue);

    await importIssues(formData)
      .then(() => {
        refetchAllData?.();
        apiNotification.success({
          message: "Berhasil",
          description: `Data berhasil ditambahkan`,
        });
        setModalUpload(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error(error);
        apiNotification.error({
          message: "Gagal",
          description: "Terjadi kesalahan saat menambahkan data",
        });
        setModalUpload(false);
        form.resetFields();
      });
  };

  const { data: issues = [] } = useFindAllIssues({
    onSuccess: (data) => {
      setSelectedIssue(data[0]);
    },
  });

  const { data: subIssue = [], isLoading } = useFindAllSubIssues(
    { id: selectedIssue?.id },
    { enable: selectedIssue?.id },
  );

  const [canUploadData] = accessChecker([ACCESS_LIST?.MANAGEMENT_UPLOAD_DATA], profile?.accesses || []);
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
            <div>
              <Link target="_blank" href="/template_manajemen_data.xlsx">
                <Button className="btn-white" icon={<TbDownload />}>
                  Unduh layout
                </Button>
              </Link>
            </div>
          </div>
          <div className="pl-10 leading-7">
            {/* <div>
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
            </div> */}
            <Form form={form} onFinish={(formValues) => submitHandler(formValues)}>
              <div>
                <label>Isu:</label>
                <Form.Item name="issue" rules={[{ required: true, message: "Isu harus di isi" }]}>
                  <Select
                    onChange={(value) => {
                      const issue = issues?.find((item) => item.value === value);
                      setSelectedIssue(issue);
                    }}
                    options={issues?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div>
                <label>Sub Isu:</label>
                <Form.Item name="sub_issue">
                  <Select
                    options={subIssue?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    className="w-full"
                    loading={isLoading}
                  />
                </Form.Item>
              </div>
              <div>
                <label>Tahun:</label>
                <Form.Item name="year">
                  <DatePicker format="YYYY" className="w-full" picker="year" />
                  <span className="text-[12px]">Tahun data diambil</span>
                </Form.Item>
              </div>
              <div>
                <label>File Excel:</label>
                <Form.Item name="file" rules={[{ required: true, message: "File harus di isi" }]}>
                  <Upload name="file" type="file" className=" flex w-full">
                    <Button className="w-full">Choose file...</Button>
                  </Upload>
                </Form.Item>
                <span className="text-[12px]">{`minimum file < 3mb`}</span>
              </div>

              <Button htmlType="submit" className="btn-primary w-full mt-10">
                Upload Sekarang
              </Button>
            </Form>
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
          customRender: canUploadData && <ButtonUpload />,
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
              filterIssueHandler={filterIssueHandler}
              issueOptions={issueOption}
              addUserHandler={() => setIsDrawerActive(true)}
            />

            <IssueDataTable
              data={mappedData}
              currentUser={currentUser}
              setSelectedUser={setSelectedUser}
              setIsFormEdit={setIsFormEdit}
              setIsDrawerActive={setIsDrawerActive}
              apiNotification={apiNotification}
              users={users}
              setUsers={setUsers}
              profile={profile}
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
