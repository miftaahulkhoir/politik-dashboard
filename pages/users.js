import { Button, Card, Col, Row, Space, notification } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TbPencil, TbTrashX } from 'react-icons/tb';
import CustomDataTable from '../components/elements/customDataTable/CustomDataTable';
import UserFormDrawer from '../components/pagecomponents/users/UserFormDrawer';
import UserSearchBar from '../components/pagecomponents/users/UserSearchBar';

export default function Users(pageProps) {
  const [usersList, setUsersList] = useState([]);

  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [apiNotification, contextHolderNotification] =
    notification.useNotification();

  useEffect(() => {
    const users = [];
    pageProps.users.forEach((element, index) => {
      users.push({ no: index + 1, ...element });
    });
    console.log(users);
    setUsersList([...users]);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.APP_BASEURL}api/profile`)
      .then((res) => {
        setCurrentUser(res.data.data);
      })
      .catch((err) => {});
  }, []);

  // filters
  const [filterSearch, setFilterSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filteredUsers = useMemo(() => {
    const filteredSearch =
      filterSearch === ''
        ? usersList
        : usersList.filter((user) => {
            return user.name.toLowerCase().includes(filterSearch.toLowerCase());
          });

    const dateInput = new Date(filterDate);
    const filteredDate =
      filterDate === ''
        ? filteredSearch
        : filteredSearch.filter((survey) => {
            const date = new Date(survey.created_at);

            return (
              date.getFullYear() === dateInput.getFullYear() &&
              date.getMonth() === dateInput.getMonth() &&
              date.getDate() === dateInput.getDate()
            );
          });

    return filteredDate;
  }, [usersList, filterSearch, filterDate]);

  const filterSearchHandler = useCallback(
    debounce((e) => setFilterSearch(e.target.value), 300)
  );

  const filterDateHandler = useCallback(
    debounce((_, valueString) => {
      setFilterDate(valueString);
    }, 300)
  );

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
    <>
      {contextHolderNotification}

      <UserFormDrawer
        token={pageProps.token}
        open={isDrawerActive}
        setOpen={setIsDrawerActive}
        apiNotification={apiNotification}
        isEdit={isFormEdit}
        setIsEdit={setIsFormEdit}
        selectedUser={selectedUser}
        setUsersList={setUsersList}
        currentUser={currentUser}
      />

      <div className="col-12 pdv-3">
        <h1>Manajemen User</h1>
      </div>
      <div className="col-12 pdv-3 custom-tabs">
        <ul>
          <li>Kordinator</li>
          <li>Relawan</li>
          <li>Pemilih</li>
        </ul>
      </div>

      <Space direction="vertical" size="middle">
        <UserSearchBar
          filterSearchHandler={filterSearchHandler}
          filterDateHandler={filterDateHandler}
          addSurveyHandler={() => setIsDrawerActive(true)}
        />

        <Row justify="end">
          <Col span={24}>
            <Card bodyStyle={{ padding: '0px' }} style={{ overflow: 'hidden' }}>
              <CustomDataTable
                columns={columns}
                data={filteredUsers}
                pagination
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  let { token } = parseCookies(ctx);
  let users = [];
  await axios
    .get(`${process.env.APP_BASEURL}api/users`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      users = res.data.data;
    })
    .catch((err) => {});
  return { props: { token, users } };
}
