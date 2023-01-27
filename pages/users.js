import { Space, notification } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useMemo, useState } from "react";

import UserDataTable from "../components/pagecomponents/users/UserDataTable";
import UserFormDrawer from "../components/pagecomponents/users/UserFormDrawer";
import UserRoleSelect from "../components/pagecomponents/users/UserRoleSelect";
import UserSearchBar from "../components/pagecomponents/users/UserSearchBar";

export default function Users(pageProps) {
  const [usersList, setUsersList] = useState([]);

  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [activeRoleLevel, setActiveRoleLevel] = useState(1);

  const [apiNotification, contextHolderNotification] = notification.useNotification();

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
      .get(`${baseURL}api/profile`)
      .then((res) => {
        setCurrentUser(res.data.data);
      })
      .catch((err) => {});
  }, []);

  // filters
  const [filterSearch, setFilterSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredUsers = useMemo(() => {
    const filteredSearch =
      filterSearch === ""
        ? usersList
        : usersList.filter((user) => {
            return user.name.toLowerCase().includes(filterSearch.toLowerCase());
          });

    const dateInput = new Date(filterDate);
    const filteredDate =
      filterDate === ""
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
    debounce((e) => setFilterSearch(e.target.value), 300),
    [],
  );

  const filterDateHandler = useCallback(
    debounce((_, valueString) => {
      setFilterDate(valueString);
    }, 300),
    [],
  );

  const filteredRoleUsers = useMemo(() => {
    return filteredUsers
      .filter((user) => user?.occupation?.level === activeRoleLevel)
      .map((user, i) => ({ ...user, no: i + 1 }));
  }, [activeRoleLevel, filteredUsers]);

  return (
    <>
      {contextHolderNotification}

      <UserFormDrawer
        open={isDrawerActive}
        setOpen={setIsDrawerActive}
        apiNotification={apiNotification}
        isEdit={isFormEdit}
        setIsEdit={setIsFormEdit}
        selectedUser={selectedUser}
        setUsersList={setUsersList}
        currentUser={currentUser}
      />

      <Head>
        <title>Manajemen Pengguna · Patrons</title>
      </Head>

      <div className="col-12 pdv-3 mb-12">
        <h1>Manajemen Pengguna</h1>
      </div>

      <Space direction="vertical" size="middle">
        <UserRoleSelect currentUser={currentUser} activeLevel={activeRoleLevel} setActiveLevel={setActiveRoleLevel} />

        <UserSearchBar
          filterSearchHandler={filterSearchHandler}
          filterDateHandler={filterDateHandler}
          addUserHandler={() => setIsDrawerActive(true)}
        />

        <UserDataTable
          data={filteredRoleUsers}
          currentUser={currentUser}
          setSelectedUser={setSelectedUser}
          setIsFormEdit={setIsFormEdit}
          setIsDrawerActive={setIsDrawerActive}
          apiNotification={apiNotification}
          usersList={usersList}
          setUsersList={setUsersList}
        />
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const { req } = ctx;
  let baseURL = "";
  if (`http://${req.headers.host}/` !== process.env.APP_BASEURL_DEFAULT) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if(`http://${req.headers.host}/` !== process.env.APP_BASEURL_PATRON) {
    baseURL = process.env.APP_BASEURL_PATRON;
  }
  pageProps.baseURL = baseURL;

  let users = [];
  await axios
    .get(`${baseURL}api/users`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      users = res.data.data;
    })
    .catch((err) => {});

  return { props: { users } };
}
