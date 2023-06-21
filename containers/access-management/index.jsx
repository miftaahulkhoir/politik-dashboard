import { ACCESS_LIST } from "@/constants/access-list";
import { useUpdateUserAccess } from "@/utils/services/update-user-access";
import { useFindOneUserAccess } from "@/utils/services/users";
import { Switch } from "antd";
import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import UserCard from "./components/user-card";

const AccessManagement = ({ data, apiNotification }) => {
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

  const { mutate, isLoading } = useUpdateUserAccess();

  return (
    <div className="h-[calc(100%-48px)] w-full mt-4">
      <div className="grid grid-cols-3 w-full">
        <div className="w-full px-4 py-6 h-[calc(100vh-225px)]  max-h-[calc(100vh-225px)] overflow-auto border-r border-t border-t-neutral-500 border-r-neutral-500">
          {!isEmpty(data) ? (
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
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p>Pengguna tidak ditemukan</p>
            </div>
          )}
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
                onChange={() => handleSwitch(ACCESS_LIST?.MONITORING)}
                checked={access.includes(ACCESS_LIST?.MONITORING)}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Survei</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.SURVEY)}
                checked={access.includes(ACCESS_LIST?.SURVEY)}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Manajemen Akses</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_ACCESS)}
                checked={access.includes(ACCESS_LIST?.MANAGEMENT_ACCESS)}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Manajemen Pengguna</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_USER)}
                checked={access.includes(ACCESS_LIST?.MANAGEMENT_USER)}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Tambah Pengguna</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.ADD_USER)}
                disabled={!access?.includes(ACCESS_LIST?.MANAGEMENT_USER)}
                checked={access?.includes(ACCESS_LIST?.MANAGEMENT_USER) && access.includes(ACCESS_LIST?.ADD_USER)}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Ubah Pengguna</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.EDIT_USER)}
                disabled={!access?.includes(ACCESS_LIST?.MANAGEMENT_USER)}
                checked={access?.includes(ACCESS_LIST?.MANAGEMENT_USER) && access.includes(ACCESS_LIST?.EDIT_USER)}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Hapus Pengguna</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.REMOVE_USER)}
                disabled={!access?.includes(ACCESS_LIST?.MANAGEMENT_USER)}
                checked={access?.includes(ACCESS_LIST?.MANAGEMENT_USER) && access.includes(ACCESS_LIST?.REMOVE_USER)}
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Ubah Password Pengguna</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.CHANGE_PASSWORD_USER)}
                disabled={!access?.includes(ACCESS_LIST?.MANAGEMENT_USER)}
                checked={
                  access?.includes(ACCESS_LIST?.MANAGEMENT_USER) && access.includes(ACCESS_LIST?.CHANGE_PASSWORD_USER)
                }
                className="bg-neutral-500 -mt-5"
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Manajemen Data</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_DATA)}
                checked={access.includes(ACCESS_LIST?.MANAGEMENT_DATA)}
                className="bg-neutral-500 -mt-5"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Download Data</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_DOWNLOAD_DATA)}
                checked={
                  access.includes(ACCESS_LIST?.MANAGEMENT_DATA) &&
                  access.includes(ACCESS_LIST?.MANAGEMENT_DOWNLOAD_DATA)
                }
                className="bg-neutral-500 -mt-5"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Upload Data</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_UPLOAD_DATA)}
                checked={
                  access.includes(ACCESS_LIST?.MANAGEMENT_DATA) && access.includes(ACCESS_LIST?.MANAGEMENT_UPLOAD_DATA)
                }
                className="bg-neutral-500 -mt-5"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Hapus Data</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_DELETE_DATA)}
                checked={
                  access.includes(ACCESS_LIST?.MANAGEMENT_DATA) && access.includes(ACCESS_LIST?.MANAGEMENT_DELETE_DATA)
                }
                className="bg-neutral-500 -mt-5"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Manajemen Isu</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_ISSUE)}
                checked={access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE)}
                className="bg-neutral-500 -mt-5"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Tambah Isu</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_ADD_ISSUE)}
                disabled={!access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE)}
                checked={
                  access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE) && access.includes(ACCESS_LIST?.MANAGEMENT_ADD_ISSUE)
                }
                className="bg-neutral-500 -mt-5"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Tambah Sub Isu</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_ADD_SUB_ISSUE)}
                disabled={!access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE)}
                checked={
                  access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE) &&
                  access.includes(ACCESS_LIST?.MANAGEMENT_ADD_SUB_ISSUE)
                }
                className="bg-neutral-500 -mt-5"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-center gap-2 mb-6">
                <div className="text-white text-sm font-semibold">Talkwalker</div>
              </div>
              <Switch
                onChange={() => handleSwitch(ACCESS_LIST?.TALKWALKER)}
                checked={access.includes(ACCESS_LIST?.TALKWALKER)}
                className="bg-neutral-500 -mt-5"
              />
            </div>
          </div>

          <div className="w-full flex justify-end px-8 pb-7 mt-64">
            <button
              disabled={isLoading}
              type="button"
              class="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() =>
                mutate(
                  { id: selectedUser?.id, payload: access },
                  {
                    onSuccess: () => {
                      apiNotification.success({
                        message: "Berhasil",
                        description: "Berhasil mengubah akses",
                      });
                    },
                  },
                )
              }
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
