import { useUpdateUserAccess } from "@/utils/services/update-user-access";
import { useFindOneUserAccess } from "@/utils/services/users";
import { Switch } from "antd";
import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import UserCard from "./components/user-card";

const AccessManagement = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState();
  const [access, setAccess] = useState([]);

  const { user } = useFindOneUserAccess(selectedUser?.id);

  useEffect(() => {
    if (!isEmpty(data)) setSelectedUser(data[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmpty(data)]);

  useEffect(() => {
    if (!isEmpty(user)) setAccess([...(user?.accesses || [])]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSwitch = (param) => {
    setAccess((prevArray) => {
      const newArray = prevArray.includes(param) ? prevArray.filter((item) => item !== param) : [...prevArray, param];
      return newArray;
    });
  };

  const { mutate } = useUpdateUserAccess();

  return (
    <div className="h-[calc(100%-48px)] w-full mt-4">
      <div className="grid grid-cols-3 w-full">
        <div className="w-full px-4 py-6 h-[calc(100vh-225px)]  max-h-[calc(100vh-225px)] overflow-auto border-r border-r-neutral-500">
          <div className="flex flex-col">
            {data?.map((user) => (
              <UserCard
                email={user?.email}
                name={user?.name}
                nik={user?.nik}
                avatar={user?.profile_image}
                key={user?.id}
                isSelected={user?.id === selectedUser?.id}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          </div>
        </div>
        <div className="w-full h-[calc(100vh-225px)]  max-h-[calc(100vh-225px)] overflow-auto flex flex-col border-r border-r-neutral-500">
          <div className="header flex items-center bg-new-black py-3 px-8">
            <div className="text-white text-sm font-semibold">Informasi Pengguna</div>
          </div>
          <div className="w-full h-full p-8 flex flex-col">
            <div className="mb-5">
              {!isEmpty(selectedUser?.profile_image) ? (
                <img class="w-[72px] h-[72px] rounded-full" src={selectedUser?.profile_image} alt="Rounded avatar" />
              ) : (
                <TbUserCircle className="w-[72px] h-[72px]" />
              )}
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <div className="text-white text-sm font-semibold">Nama</div>
              <div className="text-xs text-neutral-400">{selectedUser?.name}</div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="text-white text-sm font-semibold">Email</div>
              <div className="text-xs text-neutral-400">{selectedUser?.email}</div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="text-white text-sm font-semibold">Jenis Kelamin</div>
              <div className="text-xs text-neutral-400">
                {selectedUser?.gender === "male" ? "Laki-laki" : "Perempuan"}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="text-white text-sm font-semibold">No Telepon</div>
              <div className="text-xs text-neutral-400">{selectedUser?.phone}</div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="text-white text-sm font-semibold">Jabatan</div>
              <div className="text-xs text-neutral-400">{selectedUser?.occupation?.name}</div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="text-white text-sm font-semibold">NIK</div>
              <div className="text-xs text-neutral-400">{selectedUser?.nik}</div>
            </div>
          </div>
        </div>

        <div className="w-full h-[calc(100vh-225px)]  max-h-[calc(100vh-225px)] overflow-auto flex flex-col">
          <div className="header flex items-center  py-3 px-8 border border-neutral-500 border-l-0">
            <div className="text-white text-sm font-semibold ">Hak Akses Pengguna</div>
          </div>
          <div className="w-full h-full p-8 flex flex-col gap-3 items-center">
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Monitoring</div>
              </div>
              <Switch
                onChange={() => handleSwitch("monitoring")}
                checked={access.includes("monitoring")}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Survei</div>
              </div>
              <Switch
                onChange={() => handleSwitch("survey")}
                checked={access.includes("survey")}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Manajemen Akses</div>
              </div>
              <Switch
                onChange={() => handleSwitch("access-management")}
                checked={access.includes("access-management")}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Manajemen User</div>
              </div>
              <Switch
                onChange={() => handleSwitch("user-management")}
                checked={access.includes("user-management")}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Manajemen Data</div>
              </div>
              <Switch
                onChange={() => handleSwitch("data-management")}
                checked={access.includes("data-management")}
                className="bg-neutral-500 -mt-5"
              />
            </div>
          </div>

          <div className="w-full flex justify-end px-8 pb-7">
            <button
              type="button"
              class="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => mutate({ id: selectedUser?.id, payload: access })}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;
