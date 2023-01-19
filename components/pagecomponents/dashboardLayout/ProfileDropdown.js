import { Avatar, Dropdown } from 'antd';
import { TbLogout, TbUser } from 'react-icons/tb';
import { logoutUser } from '../../../utils/auth';

export default function ProfileDropdown() {
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
        <Avatar size="large" icon={<TbUser />} />
      </div>
    </Dropdown>
  );
}
