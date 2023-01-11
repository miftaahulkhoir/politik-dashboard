import { useState } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
import Card from '../components/elements/card/Card';
import CustomDataTable from '../components/elements/customDataTable/CustomDataTable';
import NameAvatar from '../components/elements/nameAvatar/NameAvatar';
import SummaryCard from '../components/elements/summaryCard/SummaryCard';
import BlueCard from '../components/pagecomponents/home/BlueCard';
import ChartCard from '../components/pagecomponents/home/ChartCard';

export default function Index({ pageProps }) {
  const [ranks, setRanks] = useState([
    {
      no: 1,
      nama: 'Ananda Pratama Putra Nugraha',
      relawan: 312,
      pemilih: 2049,
      role: 'Koordinator',
    },
    {
      no: 2,
      nama: 'Ananda Pratama Putra Nugraha',
      relawan: 312,
      pemilih: 2049,
      role: 'Koordinator',
    },
    {
      no: 3,
      nama: 'Ananda Pratama Putra Nugraha',
      relawan: 312,
      pemilih: 2049,
      role: 'Koordinator',
    },
    {
      no: 4,
      nama: 'Ananda Pratama Putra Nugraha',
      relawan: 312,
      pemilih: 2049,
      role: 'Koordinator',
    },
    {
      no: 5,
      nama: 'Ananda Pratama Putra Nugraha',
      relawan: 312,
      pemilih: 2049,
      role: 'Koordinator',
    },
    {
      no: 6,
      nama: 'Ananda Pratama Putra Nugraha',
      relawan: 312,
      pemilih: 2049,
      role: 'Koordinator',
    },
  ]);

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
          <NameAvatar shortName="AP" />
          <div className="ml-12">{row.nama}</div>
        </div>
      ),
    },
    {
      name: 'Relawan',
      selector: (row) => row.relawan + ' relawan',
    },
    {
      name: 'Pemilih',
      selector: (row) => row.pemilih + ' pemilih',
    },
    {
      name: '',
      selector: (row) => <span style={{ color: '#016CEE' }}>{row.role}</span>,
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
            {/* <button
              className="btn border border-1"
              style={{
                fontSize: '12px',
                padding: '7px 12px',
                borderColor: '#DDDDDD',
              }}
            >
              <TbPlus style={{ color: '#016CEE', marginRight: '4px' }} />
              <span>Tambah survei</span>
            </button> */}
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
  return { props: {} };
}
