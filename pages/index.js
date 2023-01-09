import { useMemo } from 'react';

export default function Index({ pageProps }) {
  return (
    <>
      <div className="col-12 pb-5 mb-5">
        <h1>Dashboard</h1>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-body"></div>
        </div>
      </div>
      <div className="col-3">
        <SummaryCard title="Total relawan" number={425} stat={-0.051} />
      </div>
      <div className="col-3">
        <SummaryCard title="Total pemilih" number={6875} stat={0.128} />
      </div>
      <div className="col-3">
        <SummaryCard
          title="Total logistik"
          subtitle="satuan rupiah"
          number={192092251}
          stat={-0.121}
        />
      </div>
      <div className="col-3">
        <SummaryCard
          title="Pemilih baru"
          subtitle="2 Des 2022"
          number={6875}
          stat={0.041}
        />
      </div>
      <div className="col-6">
        <div className="card">
          <div className="card-body"></div>
        </div>
      </div>
      <div className="col-6">
        <div className="card">
          <div className="card-body"></div>
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
    <div
      className="card border border-1 shadow-none"
      style={{ borderRadius: '12px' }}
    >
      <div className="card-body py-20">
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
              backgroundColor: '#FEE2E2',
              borderRadius: '8px',
              color: '#B12E2E',
            }}
          >
            {percentage.text}
          </div>
        </div>
      </div>
    </div>
  );
}
