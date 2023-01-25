import { Button, Card, Col, Modal, Row } from "antd";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { TbPencil, TbTrashX } from "react-icons/tb";

import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

export default function UserDataTable({
  data,
  currentUser,
  setSelectedUser,
  setIsFormEdit,
  setIsDrawerActive,
  apiNotification,
  usersList,
  setUsersList,
}) {
  const deleteUserHandler = useCallback(
    (row) => {
      Modal.confirm({
        title: "Peringatan",
        content: `Apakah kamu yakin ingin menghapus ${row.name}`,
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        onOk: function () {
          axios
            .delete(`${process.env.APP_BASEURL}api/users/${row?.id}`)
            .then(() => {
              const newUsers = usersList.filter((s) => s.id !== row?.id);
              setUsersList([...newUsers]);

              apiNotification.success({
                message: "Sukses",
                description: `User ${row?.name} berhasil dihapus`,
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
    [apiNotification, setUsersList, usersList],
  );

  const updateUserHandler = useCallback(
    (row) => {
      setSelectedUser(row);
      setIsFormEdit(true);
      setIsDrawerActive(true);
    },
    [setIsDrawerActive, setIsFormEdit, setSelectedUser],
  );

  const columns = useMemo(() => {
    return [
      {
        name: "No",
        selector: (row) => row.no,
        width: "80px",
        center: true,
        sortable: true,
      },
      {
        name: "NIK",
        selector: (row) => row?.nik || "-",
      },
      {
        name: "Nama",
        selector: (row) => row?.name,
      },
      {
        name: "Jenis Kelamin",
        selector: (row) => (row?.gender === "male" ? "Laki-laki" : row?.gender === "female" ? "Perempuan" : "-"),
        width: "140px",
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row?.email || "-",
      },
      {
        name: "Aksi",
        selector: (row) => {
          const canModify = currentUser?.occupation?.level + 1 === row?.occupation?.level;
          return (
            <div className="d-flex gap-2">
              <Button
                type="text"
                disabled={!canModify}
                icon={<TbPencil size={20} color={canModify ? "#7287A5" : "#cccccc"} />}
                shape="circle"
                onClick={() => updateUserHandler(row)}
              ></Button>
              <Button
                type="text"
                disabled={!canModify}
                icon={<TbTrashX size={20} color={canModify ? "#B12E2E" : "#cccccc"} />}
                shape="circle"
                onClick={() => deleteUserHandler(row)}
              ></Button>
            </div>
          );
        },
        width: "130px",
        center: true,
      },
    ];
  }, [currentUser?.occupation?.level, deleteUserHandler, updateUserHandler]);

  return (
    <Row justify="end">
      <Col span={24}>
        <Card bodyStyle={{ padding: "0px" }} style={{ overflow: "hidden" }}>
          <CustomDataTable columns={columns} data={data} pagination />
        </Card>
      </Col>
    </Row>
  );
}
