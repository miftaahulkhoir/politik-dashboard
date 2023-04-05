import { Dropdown } from "antd";
import { TbLogout, TbUser } from "react-icons/tb";

import { logoutUser } from "../../../utils/services/auth";

export default function ProfileDropdown({ profile }) {
  const items = [
    // {
    //   key: '1',
    //   label: 'Profil',
    //   icon: <TbUser size={16} />,
    //   onClick: () => Router.push('/ongoing'),
    // },
    // {
    //   key: '2',
    //   label: 'Pengaturan',
    //   icon: <TbSettings size={16} />,
    //   onClick: () => Router.push('/ongoing'),
    // },
    {
      key: "3",
      label: "Keluar",
      icon: <TbLogout size={16} />,
      danger: true,
      onClick: async function () {
        await logoutUser();
      },
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
    >
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="font-bold">{profile?.name}</div>
        <div className="flex w-9 h-9 justify-center items-center rounded-full bg-gray-600">
          <TbUser color="white" />
        </div>
      </div>
    </Dropdown>
  );
}
