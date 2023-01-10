import * as echarts from 'echarts';
// import ReactEcharts from 'echarts-for-react';
import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import Card from '../components/elements/card/Card';

import dynamic from 'next/dynamic';
const ReactEcharts = dynamic(() => import('echarts-for-react'), { ssr: false });

import styles from '../styles/index.module.css';

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

  console.log(echarts);
  const option = {
    color: ['#80FFA5'],
    title: {
      text: 'Gradient Stacked Area Chart',
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['Progress anggota'],
      itemStyle: {
        color: 'rgba(1, 108, 238, 1)',
      },
      right: 0,
    },
    toolbox: {
      feature: {
        // saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Progress anggota',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(1, 108, 238, 1)',
            },
            {
              offset: 1,
              color: 'rgba(1, 108, 238, 0.2)',
            },
          ]),
        },
        lineStyle: {
          width: 2,
          color: 'rgba(1, 108, 238, 1)',
        },
        emphasis: {
          focus: 'series',
        },
        data: [140, 232, 101, 264, 90, 340],
      },
    ],
  };

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
          <div
            className="border border-1 border-info d-flex justify-content-center align-items-center rounded-circle mr-12"
            style={{ width: '32px', height: '32px' }}
          >
            AP
          </div>
          <div>{row.nama}</div>
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
      selector: (row) => row.role,
    },
  ];

  return (
    <>
      <div className="col-12 pb-5 mb-24">
        <h1>Dashboard</h1>
      </div>
      <div className="col-12 mb-24">
        <Card>
          <div className="d-flex justify-content-between mb-12">
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>
              Peringkat Koordinator
            </h2>
            <button
              className="btn border border-1"
              style={{
                fontSize: '12px',
                padding: '7px 12px',
                borderColor: '#DDDDDD',
              }}
            >
              Tambah survei
            </button>
          </div>
          <DataTable
            columns={columns}
            data={ranks}
            // customStyles={customStyles}
            pagination
          />
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
        <Card>
          <div className={styles.chart_left}>
            <ReactEcharts opts={{ height: 250 }} option={option} />
          </div>
        </Card>
      </div>
      <div className="col-6 mb-24">
        <div className={styles.card_bottom_right}>
          <div className="row">
            <div className="col-6">
              <div>Target Koordinator</div>
              <div>23%</div>
            </div>
            <div className="col-6">
              <div>Koordinator berprestasi:</div>
              <div>ap ap ap ap ap</div>
            </div>
          </div>
          <div className={styles.hr}></div>
          <div className="row">
            <div className="col-6">
              <div>Total pemilih:</div>
              <div>23%</div>
            </div>
            <div className="col-6">
              <div>Grafik pemilih:</div>
              <div>chart</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}

function SummaryCard({ title, subtitle, number, stat }) {
  const percentage = useMemo(() => {
    const value = stat * 100;
    const isPositive = stat >= 0;
    const text = (isPositive ? value.toFixed(1) : value.toFixed(1) * -1) + '%';
    return { value, text, isPositive };
  }, [stat]);

  const numberSummary = useMemo(() => {
    const summary = {
      M: 1000000000,
      jt: 1000000,
      rb: 1000,
    };

    for (const s in summary) {
      if (number > summary[s]) {
        return parseInt(number / summary[s]) + s + '+';
      }
    }

    return number;
  }, [number]);

  return (
    <Card>
      <div
        className="d-flex justify-content-between align-items-baseline"
        style={{ color: '#7287A5' }}
      >
        <div style={{ fontSize: '16px', fontWeight: 600 }}>{title}</div>
        <div>{subtitle}</div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-8">
        <div
          className="fw-semibold"
          style={{ fontSize: '36px', fontWeight: 600 }}
        >
          {numberSummary}
        </div>
        <div
          className="px-3 py-6"
          style={{
            borderRadius: '8px',
            backgroundColor: percentage.isPositive ? '#DCFCE7' : '#FEE2E2',
            color: percentage.isPositive ? '#2EB263' : '#B12E2E',
          }}
        >
          {percentage.text}
        </div>
      </div>
    </Card>
  );
}
