import { Dropdown } from 'antd';
import Router from 'next/router';
import {
  TbChevronDown,
  TbNotebook,
  TbNotes,
  TbSpeakerphone,
  TbUserExclamation,
  TbUsers,
} from 'react-icons/tb';

export default function HomeMoreMenuDropdown() {
  const items = [
    {
      key: '1',
      label: 'Laporan Kegiatan',
      icon: <TbNotes size={16} />,
      onClick: () => Router.push('/ongoing'),
    },
    {
      key: '2',
      label: 'Manajemen Kegiatan',
      icon: <TbNotebook size={16} />,
      onClick: () => Router.push('/ongoing'),
    },
    {
      key: '3',
      label: 'Pengaduan',
      icon: <TbSpeakerphone size={16} />,
      onClick: () => Router.push('/ongoing'),
    },
    {
      key: '4',
      label: 'Manajemen Pengguna',
      icon: <TbUsers size={16} />,
      onClick: () => Router.push('/users'),
    },
    {
      key: '5',
      label: 'Manajemen Akses Admin',
      icon: <TbUserExclamation size={16} />,
      onClick: () => Router.push('/ongoing'),
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
        Lainnya
        <TbChevronDown />
      </div>
    </Dropdown>
  );
}
