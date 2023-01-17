import { Avatar, Dropdown } from 'antd';
import { TbLogout, TbSettings, TbUser } from 'react-icons/tb';
import { logoutUser } from '../../../utils/auth';

export default function ProfileDropdown() {
  const items = [
    {
      key: '1',
      label: 'Profil',
      icon: <TbUser size={16} />,
    },
    {
      key: '2',
      label: 'Pengaturan',
      icon: <TbSettings size={16} />,
    },
    {
      key: '3',
      label: 'Keluar',
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
      <div type="button">
        <Avatar size="large" src="/images/avtar/3.jpg" />
      </div>
    </Dropdown>
  );
}

// export default function ProfileDropdown() {
//   return <div>hai</div>;
// }
