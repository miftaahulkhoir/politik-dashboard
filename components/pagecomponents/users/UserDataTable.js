import { Button, Card, Col, Modal, Row, Tooltip } from "antd";
import { useCallback, useMemo } from "react";
import { TbPencil, TbTrashX, TbUserOff } from "react-icons/tb";

import formateDateTime from "../../../utils/helpers/formatDateTime";
import { deleteUser, updateUserOccupation, useFindAllOccupations } from "../../../utils/services/users";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";
import LimitedText from "../../elements/typography/LimitedText";

export default function UserDataTable({
  data,
  currentUser,
  setSelectedUser,
  setIsFormEdit,
  setIsDrawerActive,
  apiNotification,
  users,
  setUsers,
}) {
  const { occupations } = useFindAllOccupations();
  const blacklistOccupation = useMemo(() => {
    if (occupations?.length === 0) return "";
    return occupations[occupations.length - 1];
  }, [occupations]);

  const deleteUserHandler = useCallback(
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
              // const newUsers = users.filter((s) => s.id !== row?.id);
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
        width: "180px",
        sortable: true,
      },
      {
        name: "Nama",
        selector: (row) => (row?.name ? <LimitedText text={row.name} /> : "-"),
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: "Tanggal",
        selector: (row) =>
          formateDateTime(row?.created_at, {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        sortable: true,
        sortFunction: (a, b) => {
          return new Date(a?.created_at).getTime() - new Date(b?.created_at).getTime();
        },
        width: "130px",
        center: true,
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
        minWidth: "250px",
        maxWidth: "400px",
        sortable: true,
      },
      {
        name: "",
        compact: true,
        minWidth: "0px",
        grow: 1,
      },
      {
        name: "Aksi",
        selector: (row) => {
          const canModify = currentUser?.occupation?.level + 1 === row?.occupation?.level;
          const canBlacklist = canModify && row?.occupation?.level !== 5;
          return (
            <div className="d-flex gap-2">
              <Tooltip title="Edit pengguna">
                <Button
                  type="text"
                  disabled={!canModify}
                  icon={<TbPencil size={20} color={canModify ? "#FFFFFF" : "#cccccc"} />}
                  shape="circle"
                  onClick={() => updateUserHandler(row)}
                ></Button>
              </Tooltip>
              <Tooltip title="Masukkan ke daftar hitam">
                <Button
                  type="text"
                  disabled={!canBlacklist}
                  icon={<TbUserOff size={20} color={canBlacklist ? "#FFFFFF" : "#cccccc"} />}
                  shape="circle"
                  onClick={() => blacklistUserHandler(row)}
                ></Button>
              </Tooltip>
              <Tooltip title="Hapus pengguna">
                <Button
                  type="text"
                  disabled={!canModify}
                  icon={<TbTrashX size={20} color={canModify ? "#B12E2E" : "#cccccc"} />}
                  shape="circle"
                  onClick={() => deleteUserHandler(row)}
                ></Button>
              </Tooltip>
            </div>
          );
        },
        width: "150px",
        center: true,
      },
    ];
  }, [blacklistUserHandler, currentUser?.occupation?.level, deleteUserHandler, updateUserHandler]);

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
