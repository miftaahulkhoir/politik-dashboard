import { Button, Card, Modal, Switch, Tooltip } from "antd";
import { TbDownload, TbEye, TbPencil, TbPlus, TbTrashX } from "react-icons/tb";

import downloadFileFromURL from "../../../utils/services/downloadFileFromURL";
import { deleteSurvey, updateSurveyStatus } from "../../../utils/services/surveys";
import CustomSentimentDataTable from "./CustomSentimentDataTable";

export default function SentimentDataTable({
  filteredSurveys,
  groups,
  setGroups,
  apiNotification,
  setSelectedSurvey,
  setIsResponseDrawerOpen,
  setIsFormEdit,
  setIsFormOpen,
  setSelectedSurveyId,
  occupationLevel,
}) {
  const groupColumn = [
    {
      name: "No.",
      selector: (row) => row.no,
      width: "80px",
      center: true,
      sortable: true,
    },
    {
      name: "Judul Group",
      selector: (row) => row.name,
      sortable: true,
      grow: 1000,
      maxWidth: "600px",
    },
    {
      name: "",
      compact: true,
      minWidth: "0px",
      grow: 1,
    },
    {
      name: "",
      width: "200px",
      right: true,
      selector: (row) => {
        const isAdmin = occupationLevel === 1;
        const canDownload = row?.total_respondent > 0 && isAdmin;
        const canSee = row?.total_respondent > 0;
        return (
          <div className="d-flex gap-2">
            {/* <Tooltip title="Unduh excel">
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
                disabled={!canSee}
                icon={<TbEye size={20} color={canDownload ? "#016CEE" : "#cccccc"} />}
                shape="circle"
                onClick={() => {
                  setIsResponseDrawerOpen(true);
                  setSelectedSurvey(row);
                }}
              ></Button>
            </Tooltip> */}
            <Tooltip title="Tambah topik">
              <Button
                type="text"
                disabled={!isAdmin}
                icon={<TbPlus size={20} color={isAdmin ? "#7287A5" : "#cccccc"} />}
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
            <Tooltip title="Hapus group">
              <Button
                type="text"
                disabled={!isAdmin}
                icon={<TbTrashX size={20} color={isAdmin ? "#B12E2E" : "#cccccc"} />}
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

                        const newSurveys = groups.filter((s) => s.id !== row.id);
                        setGroups([...newSurveys]);

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

  const topicColumn = [
    {
      name: "",
      compact: true,
      minWidth: "0px",
      grow: 0.1,
    },
    {
      name: "Judul Topik",
      selector: (row) => row.name,
      sortable: true,
      grow: 1000,
      maxWidth: "600px",
    },
    {
      name: "",
      compact: true,
      minWidth: "0px",
      grow: 1,
    },
    {
      name: "",
      width: "200px",
      right: true,
      selector: (row) => {
        const isAdmin = occupationLevel === 1;
        const canDownload = row?.total_respondent > 0 && isAdmin;
        const canSee = row?.total_respondent > 0;
        return (
          <div className="d-flex gap-2">
            {/* <Tooltip title="Unduh excel">
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
                disabled={!canSee}
                icon={<TbEye size={20} color={canDownload ? "#016CEE" : "#cccccc"} />}
                shape="circle"
                onClick={() => {
                  setIsResponseDrawerOpen(true);
                  setSelectedSurvey(row);
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Ubah group">
              <Button
                type="text"
                disabled={!isAdmin}
                icon={<TbPencil size={20} color={isAdmin ? "#7287A5" : "#cccccc"} />}
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
            </Tooltip> */}
            <Tooltip title="Hapus group">
              <Button
                type="text"
                disabled={!isAdmin}
                icon={<TbTrashX size={20} color={isAdmin ? "#B12E2E" : "#cccccc"} />}
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

                        const newSurveys = groups.filter((s) => s.id !== row.id);
                        setGroups([...newSurveys]);

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
      <CustomSentimentDataTable
        columns={groupColumn}
        topicColumn={topicColumn}
        data={filteredSurveys}
        style={{ width: "100%" }}
      />
    </Card>
  );
}
