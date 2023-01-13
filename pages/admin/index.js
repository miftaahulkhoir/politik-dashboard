import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const MapAdmin = dynamic(
  () => import('../../components/pagecomponents/adminhome/MapAdmin'),
  { ssr: false }
);

export default function AdminHome() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <MapAdmin></MapAdmin>
      </div>
    </>
  );
}

// export function getServerSideProps() {
//   // generate random data
//   const xmin = -7.013167;
//   const ymin = 107.490522;
//   const xmax = -6.858344;
//   const ymax = 107.701195;

//   const data = [];
//   for (let i = 0; i < 50; i++) {
//     const longitude = (Math.random() * (xmax - xmin) + xmin).toFixed(4);
//     const latitude = (Math.random() * (ymax - ymin) + ymin).toFixed(4);
//     const value = parseInt(Math.floor(Math.random() * 2000));

//     let role = 'blacklist';
//     const x = Math.random();
//     if (x < 3 / 4) role = 'coordinator';
//     if (x < 2 / 4) role = 'pemilih';
//     if (x < 1 / 4) role = 'relawan';

//     const obj = { position: [longitude, latitude], value: value, role: role };
//     data.push(obj);
//   }
//   console.log(JSON.stringify(data));

//   return { props: {} };
// }
