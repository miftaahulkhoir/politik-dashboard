import { ACCESS_LIST } from "@/constants/access-list";
import AccessManagement from "@/containers/access-management";
import DashboardLayout from "@/layouts/DashboardLayout";
import accessChecker from "@/utils/helpers/accessChecker";
import { handleAccess } from "@/utils/helpers/handle-access-serverside";

import { notification, Button } from "antd";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { TbPlus } from "react-icons/tb";

import UserFormDrawer from "../../components/pagecomponents/users/UserFormDrawer";
import UserSearchBar from "../../components/pagecomponents/users/UserSearchBar";
import { useFindProfile } from "../../utils/services/profiles";
import { useFindAllUsers } from "../../utils/services/users";

export default function ManagementAccessPage({ profile }) {
  const [users, setUsers] = useState([]);
  const { users: fetchUsers } = useFindAllUsers();
  useEffect(() => {
    if (!fetchUsers?.length) return;
    setUsers(fetchUsers);
  }, [fetchUsers]);

  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const { profile: currentUser } = useFindProfile();

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
    return filteredUsers.map((user, i) => ({ ...user, no: i + 1 }));
  }, [filteredUsers]);

  const [canAddUser] = accessChecker([ACCESS_LIST?.ADD_USER], profile?.accesses || []);

  return (
    <DashboardLayout
      profile={profile}
      title="Manajemen Akses · Chakra"
      topBarConfig={{
        isShowSearchRegion: true,
        title: "Manajemen Akses",
        hideMapButton: true,
        customRender: canAddUser && (
          <div className="flex justify-end w-full">
            <Button className="btn-primary" icon={<TbPlus />} onClick={() => setIsDrawerActive(true)}>
              Tambah Pengguna
            </Button>
          </div>
        ),
      }}
    >
      <div className="flex flex-col mt-14 ml-[62px] bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white">
        {contextHolderNotification}

        <div className="px-10 py-5">
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
        </div>
        <div className="!h-full !flex-1">
          <div className="px-10">
            <UserSearchBar
              filterSearchHandler={filterSearchHandler}
              filterDateHandler={filterDateHandler}
              filterGenderHandler={filterGenderHandler}
              addUserHandler={() => setIsDrawerActive(true)}
            />
          </div>

          <AccessManagement data={filteredRoleUsers} apiNotification={apiNotification} profile={profile} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(ctx) {
  await handleAccess(ctx, ACCESS_LIST.MANAGEMENT_ACCESS);
  return { props: {} };
}
