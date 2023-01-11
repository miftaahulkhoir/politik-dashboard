import { Button, Card, Col, DatePicker, Input, Row, Select, Space } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TbPencil, TbPlus, TbSearch, TbTrashX } from 'react-icons/tb';
import CustomDataTable from '../components/elements/customDataTable/CustomDataTable';

export default function Surveys(pageProps) {
  const [surveysList, setSurveysList] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterActive, setFilterActive] = useState(-1);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const surveys = [];
    pageProps.surveys.forEach((element, index) => {
      surveys.push({ no: index + 1, ...element });
    });
    setSurveysList([...surveys]);
  }, []);

  const filteredSurveys = useMemo(() => {
    const filteredSearch =
      filterSearch === ''
        ? surveysList
        : surveysList.filter((survey) => {
            return survey.survey_name
              .toLowerCase()
              .includes(filterSearch.toLowerCase());
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
  }, [surveysList, filterSearch, filterActive, filterDate]);

  const filterSearchHandler = useCallback(
    debounce((e) => setFilterSearch(e.target.value), 300)
  );

  const filterActiveHandler = useCallback(
    debounce((value) => setFilterActive(Number(value)), 300)
  );

  const filterDateHandler = useCallback(
    debounce((value) => setFilterDate(value), 300)
  );

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
        <div className="d-flex gap-2">
          <TbPencil
            style={{ width: '20px', height: '20px', color: '#7287A5' }}
          />
          <TbTrashX
            style={{ width: '20px', height: '20px', color: '#B12E2E' }}
          />
        </div>
      ),
      width: '220px',
      center: true,
    },
  ];

  return (
    <>
      <div className="col-12 pb-5 mb-24">
        <h1>Manajemen Survei</h1>
      </div>

      <Space direction="vertical" size="middle">
        <SearchBar
          filterSearchHandler={filterSearchHandler}
          filterActiveHandler={filterActiveHandler}
          filterDateHandler={filterDateHandler}
          addSurveyHandler={() => {}}
        />

        <Row justify="end">
          <Col span={24}>
            <Card bodyStyle={{ padding: '0px' }} style={{ overflow: 'hidden' }}>
              <CustomDataTable
                columns={columns}
                data={filteredSurveys}
                style={{ width: '100%' }}
              />
            </Card>
          </Col>
        </Row>
      </Space>
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

function SearchBar({
  filterSearchHandler,
  filterActiveHandler,
  filterDateHandler,
  addSurveyHandler,
}) {
  return (
    <Row justify="space-between">
      <Col span={18}>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="Pencarian"
              prefix={<TbSearch />}
              onChange={filterSearchHandler}
            />
          </Col>
          <Col span={8}>
            <Select
              defaultValue="-1"
              style={{ width: '100%' }}
              onChange={filterActiveHandler}
              options={[
                {
                  value: '-1',
                  label: 'Aktif dan tidak aktif',
                },
                {
                  value: '1',
                  label: 'Aktif',
                },
                {
                  value: '0',
                  label: 'Tidak aktif',
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Tanggal"
              onChange={filterDateHandler}
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button icon={<TbPlus />} type="primary" onClick={addSurveyHandler}>
          Tambah Survei
        </Button>
      </Col>
    </Row>
  );
}
