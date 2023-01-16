import { Button, notification } from 'antd';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useMemo, useState } from 'react';
import { TbPencil, TbTrashX } from 'react-icons/tb';
import CustomDataTable from '../components/elements/customDataTable/CustomDataTable';
import UserFormDrawer from '../components/pagecomponents/users/UserFormDrawer';

export default function Users(pageProps) {
  const [usersList, setUsersList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState('');

  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

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
                  setSelectedUserId(row.id);
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

  const handleSearch = (search) => {
    setSearch(search);
    let getlist = usersList.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
    getlist.forEach((element, index) => {
      getlist[index].no = index + 1;
    });
    setSearchList(getlist);
  };

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
        selectedUserId={selectedUserId}
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
      <div className="col-12 pdv-3">
        <div className="row">
          <div className="col-3">
            <input className="form-control"></input>
          </div>
          <div className="col-3">
            <input className="form-control" type="date"></input>
          </div>
          <div className="col-3"></div>
          <div className="col-3 d-flex justify-content-end">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setIsDrawerActive(true)}
            >
              Tambah User
            </button>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-body p-0">
            <CustomDataTable
              columns={columns}
              data={search !== '' ? searchList : usersList}
              pagination
            />
          </div>
        </div>
      </div>
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
