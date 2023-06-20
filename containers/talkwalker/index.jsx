import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Button, Drawer, Grid, Tooltip } from "antd";
import { TbDownload, TbEye, TbFileUpload, TbTrashX } from "react-icons/tb";

import DashboardLayout from "@/layouts/DashboardLayout";

import FormAddFile from "./components/FormAdd";
import FilePreview from "./components/FilePreview";

const CustomDataTable = dynamic(() => import("@/components/elements/customDataTable/CustomDataTable"), {
  ssr: false,
});

export const dummyData = [
  {
    id: 1,
    nama: "Sample PDF",
    created_date: "2023/02/01",
    file: "/sample.pdf",
    category: "Kategori 1",
  },
  {
    id: 2,
    nama: "Sample 2 PDF",
    created_date: "2022/02/01",
    file: "/sample2.pdf",
    category: "Kategori 2",
  },
];

export default function TalkwalkerContainer({ profile }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataTable, setDataTable] = useState(dummyData);
  const [selectedFile, setSelectedFile] = useState(dataTable[0]);

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleRemove = (id) => {
    const filteredArr = dataTable.filter((item) => item.id !== id);
    setDataTable(filteredArr);
    setSelectedFile(filteredArr[0]);
  };

  const ButtonAdd = () => (
    <div className="flex justify-end w-full">
      <Button onClick={() => setOpenDrawer(true)} icon={<TbFileUpload />} className="bg-primary flex items-center">
        Upload data
      </Button>
    </div>
  );

  const screen = Grid.useBreakpoint();
  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const columns = useMemo(() => {
    return [
      {
        name: "Nama File",
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
        selector: (row) => row.nama,
      },
      {
        name: "Kategori",
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
        selector: (row) => row.category,
      },
      {
        name: "Tanggal Dibuat",
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
        selector: (row) => row.created_date,
      },
      {
        name: "Aksi",
        maxWidth: "600px",
        grow: 1000,
        minWidth: 200,
        sortable: true,
        selector: (row) => {
          return (
            <div className="d-flex gap-2">
              <Tooltip title="Lihat File">
                <Button
                  type="text"
                  icon={<TbEye size={20} color="#016CEE" />}
                  shape="circle"
                  onClick={() => setSelectedFile(row)}
                />
              </Tooltip>
              <Tooltip title="Unggah">
                <Button
                  type="text"
                  icon={<TbDownload size={20} color="#7287A5" />}
                  shape="circle"
                  onClick={() => handleDownload(row?.file)}
                />
              </Tooltip>
              <Tooltip title="Hapus File">
                <Button
                  type="text"
                  icon={<TbTrashX size={20} color="#7287A5" />}
                  shape="circle"
                  onClick={() => handleRemove(row?.id)}
                />
              </Tooltip>
            </div>
          );
        },
      },
    ];
  });

  return (
    <>
      <Drawer
        title="Upload Data"
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        closable={true}
        width={isSM ? "100%" : "500px"}
        headerStyle={{ border: "none", fontSize: "32px" }}
      >
        <FormAddFile />
      </Drawer>
      <DashboardLayout
        profile={profile}
        topBarConfig={{
          isShowSearchRegion: true,
          title: "Analisis Sosial",
          hideMapButton: true,
          customRender: <ButtonAdd />,
        }}
      >
        <div className="flex col mt-14 ml-[62px] bg-[#222222] h-[calc(100vh-134px)] overflow-auto ">
          <div className="w-1/3">
            <CustomDataTable columns={columns} data={dataTable} pagination theme="dark" />
          </div>
          <div className="w-2/3">
            <FilePreview selectedFile={selectedFile} />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
