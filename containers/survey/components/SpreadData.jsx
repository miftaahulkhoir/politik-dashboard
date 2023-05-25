import { Card } from "antd";
import districts from "../data/districts";
import users from "../data/users";

function SpreadData({ data }) {
  const koordinator = users.filter((x) => x.occupation?.level === 2);
  const relawan = users.filter((x) => x.occupation?.level === 3);
  const pemilih = users.filter((x) => x.occupation?.level === 4);
  const daftarhitam = users.filter((x) => x.occupation?.level === 5);

  const dataTable = [
    {
      name: "Total koordinator",
      total: koordinator.length,
    },
    {
      name: "Total relawan",
      total: relawan.length,
    },
    {
      name: "Total kecamatan",
      total: districts.length,
    },
    {
      name: "Total pemilih",
      total: pemilih.length,
    },
    {
      name: "Total daftar hitam",
      total: daftarhitam.length,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Card style={{ background: "#151922" }} title={<div className="text-white">Data Persebaran</div>} size="small">
        {dataTable.map((item) => (
          <div className="flex justify-between text-white py-1 gap-10" key={item.name}>
            <span>{item.name}</span>
            <span>{item.total}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default SpreadData;
