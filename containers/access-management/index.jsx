import { ACCESS_LIST } from "@/constants/access-list";
import { useUpdateUserAccess } from "@/utils/services/update-user-access";
import { useFindOneUserAccess } from "@/utils/services/users";
import { Button, Collapse, Switch } from "antd";
import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import UserCard from "./components/user-card";
import _ from "lodash";
import accessChecker from "@/utils/helpers/accessChecker";

const AccessManagement = ({ data, apiNotification, profile }) => {
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

  const [canChangeAccess] = accessChecker([ACCESS_LIST?.MANAGEMENT_CHANGE_ACCESS], profile?.accesses || []);

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
            <Collapse className="!w-full" defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}>
              <Collapse.Panel header="Monitoring" key="1">
                <div className="w-full h-full flex justify-between items-center">
                  <div className="flex flex-col justify-center gap-2 mb-6">
                    <div className="text-white text-sm font-semibold">Lihat Monitoring</div>
                  </div>
                  <Switch
                    disabled={!canChangeAccess}
                    onChange={() => handleSwitch(ACCESS_LIST?.MONITORING)}
                    checked={access.includes(ACCESS_LIST?.MONITORING)}
                    className="bg-neutral-500 -mt-5"
                  />
                </div>
              </Collapse.Panel>

              <Collapse.Panel header="Talkwalker" key="2">
                <div className="full h-full flex flex-col gap-2 items-center">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center gap-2 mb-6">
                      <div className="text-white text-sm font-semibold">Lihat Talkwalker</div>
                    </div>
                    <Switch
                      disabled={!canChangeAccess}
                      onChange={() => handleSwitch(ACCESS_LIST?.TALKWALKER)}
                      checked={access.includes(ACCESS_LIST?.TALKWALKER)}
                      className="bg-neutral-500 -mt-5"
                    />
                  </div>
                </div>
              </Collapse.Panel>

              <Collapse.Panel header="Survey" key="3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col justify-center gap-2 mb-6">
                    <div className="text-white text-sm font-semibold">Lihat Survei</div>
                  </div>
                  <Switch
                    disabled={!canChangeAccess}
                    onChange={() => handleSwitch(ACCESS_LIST?.SURVEY)}
                    checked={access.includes(ACCESS_LIST?.SURVEY)}
                    className="bg-neutral-500 -mt-5"
                  />
                </div>
              </Collapse.Panel>

              <Collapse.Panel header="Manajemen Data" key="4">
                <div className="full h-full flex flex-col gap-2 items-center">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center gap-2 mb-6">
                      <div className="text-white text-sm font-semibold">Lihat Manajemen Data</div>
                    </div>
                    <Switch
                      onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_DATA)}
                      disabled={!canChangeAccess}
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
                      disabled={!canChangeAccess || !access.includes(ACCESS_LIST?.MANAGEMENT_DATA)}
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
                      disabled={!canChangeAccess || !access.includes(ACCESS_LIST?.MANAGEMENT_DATA)}
                      checked={
                        access.includes(ACCESS_LIST?.MANAGEMENT_DATA) &&
                        access.includes(ACCESS_LIST?.MANAGEMENT_UPLOAD_DATA)
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
                      disabled={!canChangeAccess || !access.includes(ACCESS_LIST?.MANAGEMENT_DATA)}
                      checked={
                        access.includes(ACCESS_LIST?.MANAGEMENT_DATA) &&
                        access.includes(ACCESS_LIST?.MANAGEMENT_DELETE_DATA)
                      }
                      className="bg-neutral-500 -mt-5"
                    />
                  </div>
                </div>
              </Collapse.Panel>

              <Collapse.Panel header="Manajemen Pengguna" key="5">
                <div className="full h-full flex flex-col gap-2 items-center">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center gap-2 mb-6">
                      <div className="text-white text-sm font-semibold">Lihat Pengguna</div>
                    </div>
                    <Switch
                      onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_USER)}
                      disabled={!canChangeAccess}
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
                      disabled={!canChangeAccess || !access?.includes(ACCESS_LIST?.MANAGEMENT_USER)}
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
                      disabled={!canChangeAccess || !access?.includes(ACCESS_LIST?.MANAGEMENT_USER)}
                      checked={
                        access?.includes(ACCESS_LIST?.MANAGEMENT_USER) && access.includes(ACCESS_LIST?.EDIT_USER)
                      }
                      className="bg-neutral-500 -mt-5"
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center gap-2 mb-6">
                      <div className="text-white text-sm font-semibold">Hapus Pengguna</div>
                    </div>
                    <Switch
                      onChange={() => handleSwitch(ACCESS_LIST?.REMOVE_USER)}
                      disabled={!canChangeAccess || !access?.includes(ACCESS_LIST?.MANAGEMENT_USER)}
                      checked={
                        access?.includes(ACCESS_LIST?.MANAGEMENT_USER) && access.includes(ACCESS_LIST?.REMOVE_USER)
                      }
                      className="bg-neutral-500 -mt-5"
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center gap-2 mb-6">
                      <div className="text-white text-sm font-semibold">Ubah Password Pengguna</div>
                    </div>
                    <Switch
                      onChange={() => handleSwitch(ACCESS_LIST?.CHANGE_PASSWORD_USER)}
                      disabled={!canChangeAccess || !access?.includes(ACCESS_LIST?.MANAGEMENT_USER)}
                      checked={
                        access?.includes(ACCESS_LIST?.MANAGEMENT_USER) &&
                        access.includes(ACCESS_LIST?.CHANGE_PASSWORD_USER)
                      }
                      className="bg-neutral-500 -mt-5"
                    />
                  </div>
                </div>
              </Collapse.Panel>

              <Collapse.Panel header="Majemen Hak Akses" key="6">
                <div className="w-full h-full flex gap-3 flex-col items-center">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center gap-2 mb-6">
                      <div className="text-white text-sm font-semibold">Lihat Akses</div>
                    </div>
                    <Switch
                      disabled={!canChangeAccess}
                      onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_ACCESS)}
                      checked={access.includes(ACCESS_LIST?.MANAGEMENT_ACCESS)}
                      className="bg-neutral-500 -mt-5"
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center gap-2 mb-6">
                      <div className="text-white text-sm font-semibold">Ubah Akses</div>
                    </div>
                    <Switch
                      onChange={() => handleSwitch(ACCESS_LIST?.MANAGEMENT_CHANGE_ACCESS)}
                      checked={
                        access.includes(ACCESS_LIST?.MANAGEMENT_ACCESS) &&
                        access.includes(ACCESS_LIST?.MANAGEMENT_CHANGE_ACCESS)
                      }
                      disabled={!canChangeAccess || !access.includes(ACCESS_LIST?.MANAGEMENT_ACCESS)}
                      className="bg-neutral-500 -mt-5"
                    />
                  </div>
                </div>
              </Collapse.Panel>

              <Collapse.Panel header="Manajemen Isu" key="7">
                <div className="full h-full flex flex-col gap-2 items-center">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col justify-center gap-2 mb-6">
                      <div className="text-white text-sm font-semibold">Lihat Manajemen Isu</div>
                    </div>
                    <Switch
                      disabled={!canChangeAccess}
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
                      disabled={!canChangeAccess || !access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE)}
                      checked={
                        access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE) &&
                        access.includes(ACCESS_LIST?.MANAGEMENT_ADD_ISSUE)
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
                      disabled={!canChangeAccess || !access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE)}
                      checked={
                        access.includes(ACCESS_LIST?.MANAGEMENT_ISSUE) &&
                        access.includes(ACCESS_LIST?.MANAGEMENT_ADD_SUB_ISSUE)
                      }
                      className="bg-neutral-500 -mt-5"
                    />
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>

            <div className="w-full flex justify-end h-[100px] mt-5 pb-7">
              <Button
                disabled={isLoading || _.isEmpty(_.xor(user?.accesses, access))}
                className="btn-primary"
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
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;
