import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
export default function Surveys(pageProps) {
  const [surveysList, setSurveysList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    pageProps.surveys.forEach((element, index) => {
      setSurveysList((prev) => [...prev, { no: index + 1, ...element }]);
    });
  }, []);

  const columns = [
    {
      name: 'No',
      selector: (row) => row.no,
      width: '80px',
      center: true,
      sortable: true,
    },
    {
      name: 'Judul survei',
      selector: (row) => row.survey_name,
    },
    {
      name: 'Tanggal rilis',
      selector: (row) => {
        const date = new Date(row?.created_at);
        const dateText = new Intl.DateTimeFormat('id-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(date);
        const hourText = new Intl.DateTimeFormat('id-ID', {
          hour: '2-digit',
          hour12: false,
          minute: '2-digit',
        }).format(date);
        return (
          <div>
            <p className="text-default">{dateText}</p>
            <p className="text-light">{hourText}</p>
          </div>
        );
      },
    },
    {
      name: 'Responden',
      selector: (row) => row?.total_respondent,
      width: '150px',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row?.status,
      width: '150px',
      sortable: true,
    },
    {
      name: 'Aksi',
      selector: (row) => '',
      width: '220px',
      center: true,
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#fafafa',
      },
    },
  };

  const handleSearch = (search) => {
    setSearch(search);
    let getlist = surveysList.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
    getlist.forEach((element, index) => {
      getlist[index].no = index + 1;
    });
    setSearchList(getlist);
  };

  return (
    <>
      <div className="col-12 pb-5 mb-24">
        <h1>Manajemen Survei</h1>
      </div>

      {/* searchbar */}
      <div className="container-fluid">
        <div className="row g-2 mb-24">
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pencarian"
              aria-label="Pencarian"
            />
          </div>
          <div className="col-3">
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ height: '36px' }}
            >
              <option selected disabled>
                Status
              </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-3">
            <input
              type="date"
              className="form-control"
              placeholder="Tanggal rilis"
              aria-label="Tanggal rilis"
            />
            {/* <DatePicker
              placeholder="Tanggal rilis"
              aria-label="Tanggal rilis"
            /> */}
          </div>
          <div className="col-3 d-flex justify-content-end">
            <button
              className="btn btn-primary btn-sm"
              style={{ padding: '0 16px', height: '36px' }}
            >
              Tambah survei
            </button>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-body p-0">
            <DataTable
              columns={columns}
              data={search !== '' ? searchList : surveysList}
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
  let surveys = [];
  await axios
    .get(`${process.env.APP_BASEURL}api/survey`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      surveys = res.data.data;
    })
    .catch((err) => {});
  return { props: { surveys } };
}
