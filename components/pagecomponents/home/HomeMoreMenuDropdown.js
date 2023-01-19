import { Button, Dropdown } from 'antd';
import Router from 'next/router';
import { TbChevronDown, TbUser } from 'react-icons/tb';

export default function HomeMoreMenuDropdown() {
  const items = [
    // {
    //   key: '1',
    //   label: 'Laporan Kegiatan',
    //   icon: <TbFileReport size={16} />,
    //   onClick: () => Router.push('/ongoing'),
    // },
    // {
    //   key: '2',
    //   label: 'Manajemen Kegiatan',
    //   icon: <TbCalendarEvent size={16} />,
    //   onClick: () => Router.push('/ongoing'),
    // },
    // {
    //   key: '3',
    //   label: 'Pengaduan',
    //   icon: <TbMessageReport size={16} />,
    //   onClick: () => Router.push('/ongoing'),
    // },
    {
      key: '4',
      label: 'Manajemen Pengguna',
      icon: <TbUser size={16} />,
      onClick: () => Router.push('/users'),
    },
    // {
    //   key: '5',
    //   label: 'Manajemen Akses Admin',
    //   icon: <TbUsers size={16} />,
    //   onClick: () => Router.push('/ongoing'),
    // },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
    >
      <Button type="text">
        Lainnya
        <TbChevronDown />
      </Button>
    </Dropdown>
  );
}
