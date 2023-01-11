import axios from 'axios';
import dynamic from 'next/dynamic';
import { parseCookies } from 'nookies';
import { useMemo } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
import Card from '../components/elements/card/Card';
import NameAvatar from '../components/elements/nameAvatar/NameAvatar';
import SummaryCard from '../components/elements/summaryCard/SummaryCard';
import BlueCard from '../components/pagecomponents/home/BlueCard';
import ChartCard from '../components/pagecomponents/home/ChartCard';

const CustomDataTable = dynamic(
  () => import('../components/elements/customDataTable/CustomDataTable'),
  { ssr: false }
);

export default function Index({ users }) {
  const ranks = useMemo(() => {
    return users.map((user, i) => {
      user.no = i + 1;
      return user;
    });
  }, [users]);

  const columns = [
    {
      name: 'No',
      selector: (row) => row.no,
      width: '80px',
      center: true,
      sortable: true,
    },
    {
      name: 'Nama Koordinator',
      grow: 3,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <NameAvatar longName={row.name} />
          <div className="ml-12">{row.name}</div>
        </div>
      ),
    },
    {
      name: 'Relawan',
      selector: (row) => row.relawan || 0 + ' relawan',
    },
    {
      name: 'Pemilih',
      selector: (row) => row.pemilih || 0 + ' pemilih',
    },
    {
      name: '',
      selector: (row) => (
        <span style={{ color: '#016CEE' }}>{row.occupation.name}</span>
      ),
    },
    {
      name: '',
      selector: (row) => <TbDotsVertical />,
      width: '45px',
    },
  ];

  return (
    <>
      <div className="col-12 pb-5 mb-24">
        <h1>Dashboard</h1>
      </div>
      <div className="col-12 mb-24">
        <Card>
          <div className="d-flex justify-content-between mb-12 mt-8">
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>
              Peringkat Koordinator
            </h2>
          </div>
          <CustomDataTable columns={columns} data={ranks} />
        </Card>
      </div>
      <div className="col-3 mb-24">
        <SummaryCard title="Total relawan" number={425} stat={-0.051} />
      </div>
      <div className="col-3 mb-24">
        <SummaryCard title="Total pemilih" number={6875} stat={0.128} />
      </div>
      <div className="col-3 mb-24">
        <SummaryCard
          title="Total logistik"
          subtitle="satuan rupiah"
          number={192092251}
          stat={-0.121}
        />
      </div>
      <div className="col-3 mb-24">
        <SummaryCard
          title="Pemilih baru"
          subtitle="2 Des 2022"
          number={6875}
          stat={0.041}
        />
      </div>
      <div className="col-6 mb-24">
        <Card noPadding>
          <ChartCard
            dataX={['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul']}
            dataY={[140, 232, 101, 264, 90, 340]}
          />
        </Card>
      </div>
      <div className="col-6 mb-24">
        <BlueCard />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  let { token } = parseCookies(ctx);
  let users = [];
  await axios
    .get(`${process.env.APP_BASEURL}api/users`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      users = res.data.data;
    })
    .catch((err) => {});
  return { props: { users } };
}
