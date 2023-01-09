import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
export default function Users(pageProps) {
  const [usersList, setUsersList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    pageProps.users.forEach((element, index) => {
      setUsersList((prev) => [...prev, { no: index + 1, ...element }]);
    });
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "80px",
      center: true,
      sortable: true,
    },
    {
      name: "NIK",
      width: "80px",
      selector: (row) => row.NIK,
    },
    {
      name: "Nama",
      selector: (row) => row?.name,
    },
    {
      name: "Jenis Kelamin",
      selector: (row) => row?.gender,
      width: "150px",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Aksi",
      selector: (row) => "",
      width: "220px",
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#fafafa",
      },
    },
  };

  const handleSearch = (search) => {
    setSearch(search);
    let getlist = usersList.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
    getlist.forEach((element, index) => {
      getlist[index].no = index + 1;
    });
    setSearchList(getlist);
  };

  return (
    <>
      <div className='col-12 pdv-3'>
        <h1>Manajemen User</h1>
      </div>
      <div className='col-12 pdv-3 custom-tabs'>
        <ul>
          <li>Kordinator</li>
          <li>Relawan</li>
          <li>Pemilih</li>
        </ul>
      </div>
      <div className='col-12 pdv-3'>
        <div className='row'>
          <div className='col-3'>
            <input className='form-control'></input>
          </div>
          <div className='col-3'>
            <input className='form-control' type='date'></input>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <div className='card-body p-0'>
            <DataTable
              columns={columns}
              data={search !== "" ? searchList : usersList}
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>
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
