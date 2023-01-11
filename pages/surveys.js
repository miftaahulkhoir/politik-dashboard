import axios from 'axios';
import debounce from 'lodash.debounce';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Card from '../components/elements/card/Card';
import CustomDataTable from '../components/elements/customDataTable/CustomDataTable';

export default function Surveys(pageProps) {
  const [surveysList, setSurveysList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState(-1);
  const [filterDate, setFilterDate] = useState('');

  // console.log(surveysList);

  useEffect(() => {
    const surveys = [];
    pageProps.surveys.forEach((element, index) => {
      surveys.push({ no: index + 1, ...element });
    });
    setSurveysList([...surveys]);
  }, []);

  const filteredSurveys = useMemo(() => {
    const filteredSearch =
      search === ''
        ? surveysList
        : surveysList.filter((survey) => {
            return survey.survey_name
              .toLowerCase()
              .includes(search.toLowerCase());
          });

    const filteredActive =
      filterActive === -1
        ? filteredSearch
        : filteredSearch.filter((survey) => survey.status === filterActive);

    const dateInput = new Date(filterDate);
    const filteredDate =
      filterDate === ''
        ? filteredActive
        : filteredActive.filter((survey) => {
            const date = new Date(survey.created_at);
            console.log('date', date.toISOString());

            return (
              date.getFullYear() === dateInput.getFullYear() &&
              date.getMonth() === dateInput.getMonth() &&
              date.getDate() === dateInput.getDate()
            );
          });

    return filteredDate;
  }, [surveysList, search, filterActive, filterDate]);

  const searchDebounceHandler = useCallback((e) => {
    console.log(e.target.value);
    debounce(() => {
      console.log(1111);
      setSearch(e.target.value);
    }, 1000);
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
      selector: (row) => row?.total_respondent + ' orang',
      width: '150px',
      sortable: true,
      right: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <div className="form-check form-switch d-flex align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={row?.status}
            // style={{ height: '20px', width: '36px' }}
          />
          <span className="ml-8">{row?.status ? 'Aktif' : 'Tidak aktif'}</span>
        </div>
      ),
      width: '130px',
      sortable: true,
    },
    {
      name: 'Aksi',
      selector: (row) => (
        <div className="d-flex">
          <div className="bg-primary" style={{ width: '16px', height: '16px' }}>
            1
          </div>
          <div
            className="bg-secondary ml-8"
            style={{ width: '16px', height: '16px' }}
          >
            2
          </div>
        </div>
      ),
      width: '220px',
      center: true,
      sortable: true,
    },
  ];

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
              onChange={debounce((e) => {
                setSearch(e.target.value);
              }, 1000)}
            />
          </div>
          <div className="col-3">
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue="-1"
              style={{ height: '36px' }}
              onChange={(e) => {
                console.log(e.target);
                setFilterActive(Number(e.target.value));
              }}
            >
              <option value="-1">Aktif dan tidak aktif</option>
              <option value="1">Aktif</option>
              <option value="0">Tidak aktif</option>
            </select>
          </div>
          <div className="col-3">
            <input
              type="date"
              className="form-control"
              placeholder="Tanggal rilis"
              aria-label="Tanggal rilis"
              onChange={(e) => setFilterDate(e.target.value)}
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
        <Card noPadding>
          <CustomDataTable columns={columns} data={filteredSurveys} />
        </Card>
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
