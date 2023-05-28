import { Button, Card, Col, Modal, Row, Tooltip } from "antd";
import { useCallback, useMemo } from "react";
import { TbTrashX, TbDotsVertical, TbDownload } from "react-icons/tb";

import { deleteUser, updateUserOccupation, useFindAllOccupations } from "../../../utils/services/users";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";
import LimitedText from "../../elements/typography/LimitedText";

export default function IssueDataTable({ data, currentUser, apiNotification, users, setUsers }) {
  const { occupations } = useFindAllOccupations();

  const blacklistOccupation = useMemo(() => {
    if (occupations?.length === 0) return "";
    return occupations[occupations.length - 1];
  }, [occupations]);

  const deleteIssueHandler = useCallback(
    (row) => {
      Modal.confirm({
        title: "Peringatan",
        content: `Apakah kamu yakin ingin menghapus ${row.name}?`,
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        onOk: function () {
          deleteUser(row?.id)
            .then(() => {
              const newUsers = users.filter((s) => s.id !== row?.id);
              setUsers([...newUsers]);

              apiNotification.success({
                message: "Sukses",
                description: `Pengguna ${row?.name} berhasil dihapus`,
              });
            })
            .catch((err) => {
              apiNotification.error({
                message: "Gagal",
                description: "Terjadi kesalahan",
              });
              console.error(err);
            });
        },
      });
    },
    [apiNotification, setUsers, users],
  );

  const blacklistUserHandler = useCallback(
    async (row) => {
      Modal.confirm({
        title: "Peringatan",
        content: `Apakah kamu yakin ingin menambahkan ${row.name} ke daftar hitam?`,
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        onOk: function () {
          updateUserOccupation(row?.id, blacklistOccupation?.id)
            .then(() => {
              setUsers((prevUsers) => {
                const newUsers = prevUsers.map((user) => {
                  if (user?.id === row?.id) {
                    user.occupation = { ...blacklistOccupation };
                  }
                  return user;
                });
                return [...newUsers];
              });
              apiNotification.success({
                message: "Sukses",
                description: `Pengguna ${row?.name} berhasil dimasukkan ke daftar hitam`,
              });
            })
            .catch((err) => {
              apiNotification.error({
                message: "Gagal",
                description: "Terjadi kesalahan",
              });
              console.error(err);
            });
        },
      });
    },
    [apiNotification, setUsers, blacklistOccupation],
  );

  const downloadIssueHandler = (row) => {};

  const columns = useMemo(() => {
    return [
      {
        name: "Nama",
        selector: (row) => (row?.name ? <LimitedText text={row.name} /> : "-"),
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: "Kategori",
        selector: (row) => row?.category_name,
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: "Sub Kategori",
        selector: (row) => row?.sub_category,
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: "Tipe",
        selector: (row) => row?.type,
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: "Bulan",
        selector: (row) => row?.month,
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: "Tahun",
        selector: (row) => row?.year,
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: "Tanggal Upload",
        selector: (row) => row?.upload_date,
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: <TbDotsVertical />,
        selector: (row) => {
          const canModify = false;
          return (
            <div className="d-flex gap-2">
              <Tooltip title="Download">
                <Button
                  type="text"
                  disabled={canModify}
                  icon={<TbDownload size={20} color={canModify ? "#FFFFFF" : "#cccccc"} />}
                  shape="circle"
                  onClick={() => downloadIssueHandler(row)}
                ></Button>
              </Tooltip>
              <Tooltip title="Hapus">
                <Button
                  type="text"
                  disabled={canModify}
                  icon={<TbTrashX size={20} color={canModify ? "#B12E2E" : "#cccccc"} />}
                  shape="circle"
                  onClick={() => deleteIssueHandler(row)}
                ></Button>
              </Tooltip>
            </div>
          );
        },
        width: "150px",
        center: true,
      },
    ];
  }, [blacklistUserHandler, currentUser?.occupation?.level, deleteIssueHandler]);

  return (
    <Row justify="end">
      <Col span={24}>
        <Card bodyStyle={{ padding: "0px" }} style={{ overflow: "hidden" }}>
          <CustomDataTable pagination data={data} columns={columns} />
        </Card>
      </Col>
    </Row>
  );
}
