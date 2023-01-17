import { Button, Card, Col, Row } from 'antd';
import { useMemo } from 'react';
import { TbPencil, TbTrashX } from 'react-icons/tb';
import CustomDataTable from '../../elements/customDataTable/CustomDataTable';

export default function UserDataTable({
  data,
  currentUser,
  setSelectedUser,
  setIsFormEdit,
  setIsDrawerActive,
}) {
  const columns = useMemo(() => {
    return [
      {
        name: 'No',
        selector: (row) => row.no,
        width: '80px',
        center: true,
        sortable: true,
      },
      {
        name: 'NIK',
        selector: (row) => row.nik,
      },
      {
        name: 'Nama',
        selector: (row) => row?.name,
      },
      {
        name: 'Jenis Kelamin',
        selector: (row) => (row?.gender === 'male' ? 'Laki-laki' : 'Perempuan'),
        width: '140px',
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.email,
        sortable: true,
      },
      {
        name: 'Aksi',
        selector: (row) => {
          const canModify =
            currentUser?.occupation?.level + 1 === row?.occupation?.level;
          return (
            <div className="d-flex gap-2">
              <Button
                type="text"
                disabled={!canModify}
                icon={
                  <TbPencil
                    size={20}
                    color={canModify ? '#7287A5' : '#cccccc'}
                  />
                }
                shape="circle"
                onClick={() => {
                  setSelectedUser(row);
                  setIsFormEdit(true);
                  setIsDrawerActive(true);
                }}
              ></Button>
              <Button
                type="text"
                disabled={!canModify}
                icon={
                  <TbTrashX
                    size={20}
                    color={canModify ? '#B12E2E' : '#cccccc'}
                  />
                }
                shape="circle"
                onClick={async () => {
                  try {
                    await axios.delete(
                      `${process.env.APP_BASEURL}api/users/${row?.id}`
                    );

                    const newUsers = usersList.filter((s) => s.id !== row.id);
                    setUsersList([...newUsers]);

                    apiNotification.success({
                      message: 'Sukses',
                      description: `User ${row?.name} berhasil dihapus`,
                    });
                  } catch (error) {
                    apiNotification.error({
                      message: 'Gagal',
                      description: 'Terjadi kesalahan',
                    });
                  }
                }}
              ></Button>
            </div>
          );
        },
        width: '130px',
        center: true,
      },
    ];
  }, [currentUser]);
  return (
    <Row justify="end">
      <Col span={24}>
        <Card bodyStyle={{ padding: '0px' }} style={{ overflow: 'hidden' }}>
          <CustomDataTable columns={columns} data={data} pagination />
        </Card>
      </Col>
    </Row>
  );
}
