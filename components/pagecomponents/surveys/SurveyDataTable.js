import { Button, Card, Modal, Switch, Tooltip } from "antd";
import { TbDownload, TbEye, TbPencil, TbTrashX } from "react-icons/tb";

import downloadFileFromURL from "../../../utils/services/downloadFileFromURL";
import { deleteSurvey, updateSurveyStatus } from "../../../utils/services/surveys";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

export default function SurveyDataTable({
  filteredSurveys,
  surveys,
  setSurveys,
  apiNotification,
  setSelectedSurvey,
  setIsResponseDrawerOpen,
  setIsFormEdit,
  setIsFormOpen,
  setSelectedSurveyId,
}) {
  const columns = [
    {
      name: "No.",
      selector: (row) => row.no,
      width: "80px",
      center: true,
      sortable: true,
    },
    {
      name: "Judul Survei",
      selector: (row) => row.survey_name,
      sortable: true,
      grow: 2.5,
    },
    {
      name: "Tanggal",
      sortable: true,
      width: "170px",
      selector: (row) => {
        const date = new Date(row?.created_at);
        const text = new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          hour12: false,
          minute: "2-digit",
        }).format(date);
        return text;
      },
    },
    {
      name: "Responden",
      selector: (row) => row?.total_respondent + " orang",
      width: "150px",
      sortable: true,
      right: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <Switch defaultChecked={row?.status} onChange={async () => await changeStatusHandler(row.id)} />
      ),
      width: "100px",
      center: true,
      sortable: true,
    },
    {
      name: "Aksi",
      width: "200px",
      center: true,
      selector: (row) => {
        const canDownload = row?.total_respondent > 0;
        return (
          <div className="d-flex gap-2">
            <Tooltip title="Unduh excel">
              <Button
                type="text"
                disabled={!canDownload}
                icon={<TbDownload size={20} color={canDownload ? "#29a229" : "#cccccc"} />}
                shape="circle"
                onClick={() => {
                  downloadFileFromURL(`/api/exports/${row.id}`);
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Lihat responden">
              <Button
                type="text"
                icon={<TbEye size={20} color="#016CEE" />}
                shape="circle"
                onClick={() => {
                  setIsResponseDrawerOpen(true);
                  setSelectedSurvey(row);
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Ubah survei">
              <Button
                type="text"
                icon={<TbPencil size={20} color="#7287A5" />}
                shape="circle"
                onClick={() => {
                  if (row?.total_respondent > 0) {
                    apiNotification.error({
                      message: "Gagal",
                      description: "Tidak bisa mengubah survei karena telah memiliki responden",
                    });
                    return;
                  }
                  setIsFormEdit(true);
                  setSelectedSurveyId(row.id);
                  setIsFormOpen(true);
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Hapus survei">
              <Button
                type="text"
                icon={<TbTrashX size={20} color="#B12E2E" />}
                shape="circle"
                onClick={async () => {
                  try {
                    if (row?.total_respondent > 0) {
                      apiNotification.error({
                        message: "Gagal",
                        description: "Tidak bisa menghapus survei karena telah memiliki responden",
                      });
                      return;
                    }

                    Modal.confirm({
                      title: "Peringatan",
                      content: `Apakah kamu yakin ingin menghapus ${row.survey_name}`,
                      okText: "Ya",
                      okType: "danger",
                      cancelText: "Tidak",
                      onOk: async function () {
                        const res = await deleteSurvey(row?.id);
                        if (!res?.data?.status) throw new Error("unknown error");

                        const newSurveys = surveys.filter((s) => s.id !== row.id);
                        setSurveys([...newSurveys]);

                        apiNotification.success({
                          message: "Berhasil",
                          description: `Survei ${row?.survey_name} berhasil dihapus`,
                        });
                      },
                    });
                  } catch (error) {
                    apiNotification.error({
                      message: "Gagal",
                      description: "Terjadi kesalahan",
                    });
                  }
                }}
              ></Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const changeStatusHandler = async (id) => {
    try {
      const res = await updateSurveyStatus(id);
      if (!res?.data?.status) throw new Error("unknown error");
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan dalam mengubah status aktif",
      });
    }
  };

  return (
    <Card bodyStyle={{ padding: "0px" }} style={{ overflow: "hidden" }}>
      <CustomDataTable columns={columns} data={filteredSurveys} style={{ width: "100%" }} />
    </Card>
  );
}
