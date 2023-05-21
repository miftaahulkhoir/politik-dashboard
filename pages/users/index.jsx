import DashboardLayout from "@/layouts/DashboardLayout";

// export default function TalkwalkerPage(props) {
//   return <DashboardLayout></DashboardLayout>;
// }

import { Space, notification } from "antd";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

import UserDataTable from "../../components/pagecomponents/users/UserDataTable";
import UserFormDrawer from "../../components/pagecomponents/users/UserFormDrawer";
import UserRoleSelect from "../../components/pagecomponents/users/UserRoleSelect";
import UserSearchBar from "../../components/pagecomponents/users/UserSearchBar";
import { useFindProfile } from "../../utils/services/profiles";
import { useFindAllSubordinateUsers } from "../../utils/services/users";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { users: fetchUsers } = useFindAllSubordinateUsers();
  useEffect(() => {
    if (!fetchUsers?.length) return;
    setUsers(fetchUsers);
  }, [fetchUsers]);

  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const { profile: currentUser } = useFindProfile();
  const [activeRoleLevel, setActiveRoleLevel] = useState(1);

  const [apiNotification, contextHolderNotification] = notification.useNotification();

  // filters
  const [filterSearch, setFilterSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterGender, setFilterGender] = useState("");

  const filteredUsers = useMemo(() => {
    const filteredSearch =
      filterSearch === ""
        ? users
        : users.filter((user) => {
            return (
              user?.name?.toLowerCase().includes(filterSearch.toLowerCase()) ||
              user?.nik?.toLowerCase().includes(filterSearch.toLowerCase()) ||
              user?.email?.toLowerCase().includes(filterSearch.toLowerCase())
            );
          });

    const dateInput = new Date(filterDate);
    const filteredDate =
      filterDate === ""
        ? filteredSearch
        : filteredSearch.filter((user) => {
            const date = new Date(user.created_at);

            return (
              date.getFullYear() === dateInput.getFullYear() &&
              date.getMonth() === dateInput.getMonth() &&
              date.getDate() === dateInput.getDate()
            );
          });

    const filteredGender =
      filterGender === "" ? filteredDate : filteredDate.filter((user) => user?.gender === filterGender);

    const formattedUsers = filteredGender.map((user, index) => {
      user.no = index + 1;
      return user;
    });

    return formattedUsers;
  }, [users, filterSearch, filterDate, filterGender]);

  const filterSearchHandler = debounce((e) => setFilterSearch(e.target.value), 300);

  const filterDateHandler = debounce((_, valueString) => {
    setFilterDate(valueString);
  }, 300);

  const filterGenderHandler = debounce((value) => setFilterGender(value), 300);

  const filteredRoleUsers = useMemo(() => {
    return filteredUsers
      .filter((user) => user?.occupation?.level === activeRoleLevel)
      .map((user, i) => ({ ...user, no: i + 1 }));
  }, [activeRoleLevel, filteredUsers]);

  return (
    <DashboardLayout
      title="Manajemen Pengguna · Patrons"
      topBarConfig={{ isShowSearchRegion: true, title: "Manajemen Pengguna", hideMapButton: true }}
    >
      <div className="flex flex-col mt-14 ml-[62px] p-10 bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white">
        {contextHolderNotification}

        <UserFormDrawer
          open={isDrawerActive}
          setOpen={setIsDrawerActive}
          apiNotification={apiNotification}
          isEdit={isFormEdit}
          setIsEdit={setIsFormEdit}
          selectedUser={selectedUser}
          setUsers={setUsers}
          currentUser={currentUser}
        />

        <Space direction="vertical" size="middle">
          <UserSearchBar
            filterSearchHandler={filterSearchHandler}
            filterDateHandler={filterDateHandler}
            filterGenderHandler={filterGenderHandler}
            addUserHandler={() => setIsDrawerActive(true)}
          />

          <UserDataTable
            data={filteredRoleUsers}
            currentUser={currentUser}
            setSelectedUser={setSelectedUser}
            setIsFormEdit={setIsFormEdit}
            setIsDrawerActive={setIsDrawerActive}
            apiNotification={apiNotification}
            users={users}
            setUsers={setUsers}
          />
        </Space>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
