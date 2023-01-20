import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Switch,
  Tooltip,
  notification,
} from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TbEye, TbPencil, TbTrashX } from 'react-icons/tb';
import CustomDataTable from '../components/elements/customDataTable/CustomDataTable';
import SurveyFormDrawer from '../components/pagecomponents/surveys/SurveyFormDrawer';
import SurveyResponseDrawer from '../components/pagecomponents/surveys/SurveyResponseDrawer';
import SurveySearchBar from '../components/pagecomponents/surveys/SurveySearchBar';

export default function Surveys(pageProps) {
  const [surveysList, setSurveysList] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterActive, setFilterActive] = useState(-1);
  const [filterDate, setFilterDate] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState({});

  const [isResponseDrawerOpen, setIsResponseDrawerOpen] = useState(false);

  const [apiNotification, contextHolderNotification] =
    notification.useNotification();

  useEffect(() => {
    if (!pageProps?.surveys) return;
    const surveys = [];
    pageProps.surveys.forEach((element, index) => {
      surveys.push({ no: index + 1, ...element });
    });
    setSurveysList([...surveys]);
  }, [pageProps]);

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
    debounce((_, valueString) => {
      setFilterDate(valueString);
    }, 300)
  );

  const changeStatusHandler = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.APP_BASEURL}api/survey/update-status/${id}`
      );
      if (!res?.data?.status) throw new Error('unknown error');
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: 'Gagal',
        description: 'Terjadi kesalahan dalam mengubah status aktif',
      });
    }
  };

  const columns = [
    {
      name: 'No.',
      selector: (row) => row.no,
      width: '80px',
      center: true,
      sortable: true,
    },
    {
      name: 'Judul Survei',
      selector: (row) => row.survey_name,
      sortable: true,
      grow: 2.5,
    },
    {
      name: 'Tanggal Rilis',
      sortable: true,
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
            <p className="p-0 m-0 mb-1" style={{ color: '#191D23' }}>
              {dateText}
            </p>
            <p className="p-0 m-0" style={{ color: '#7287A5' }}>
              {hourText}
            </p>
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
        <Switch
          defaultChecked={row?.status}
          onChange={async () => await changeStatusHandler(row.id)}
        />
      ),
      width: '100px',
      center: true,
      sortable: true,
    },
    {
      name: 'Aksi',
      selector: (row) => (
        <div className="d-flex gap-2">
          <Tooltip title="Ubah survei">
            <Button
              type="text"
              icon={<TbPencil size={20} color="#7287A5" />}
              shape="circle"
              onClick={() => {
                if (row?.total_respondent > 0) {
                  apiNotification.error({
                    message: 'Gagal',
                    description:
                      'Tidak bisa mengubah survei karena telah memiliki responden',
                  });
                  return;
                }
                setIsFormEdit(true);
                setSelectedSurveyId(row.id);
                setIsFormOpen(true);
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Hapus survei">
            <Button
              type="text"
              icon={<TbTrashX size={20} color="#B12E2E" />}
              shape="circle"
              onClick={async () => {
                try {
                  if (row?.total_respondent > 0) {
                    apiNotification.error({
                      message: 'Gagal',
                      description:
                        'Tidak bisa menghapus survei karena telah memiliki responden',
                    });
                    return;
                  }

                  const res = await axios.delete(
                    `${process.env.APP_BASEURL}api/survey/${row?.id}`
                  );
                  if (!res?.data?.status) throw new Error('unknown error');

                  const newSurveys = surveysList.filter((s) => s.id !== row.id);
                  setSurveysList([...newSurveys]);

                  apiNotification.success({
                    message: `Survei ${row?.survey_name} berhasil dihapus`,
                  });
                } catch (error) {
                  apiNotification.error({
                    message: 'Gagal',
                    description: 'Terjadi kesalahan',
                  });
                }
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Lihat responden">
            <Button
              type="text"
              icon={<TbEye size={20} color="#016CEE" />}
              shape="circle"
              onClick={() => {
                setIsResponseDrawerOpen(true);
                setSelectedSurvey(row);
                console.log(row);
              }}
            ></Button>
          </Tooltip>
        </div>
      ),
      width: '220px',
      center: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Manajemen Survei · Patrons</title>
      </Head>

      {contextHolderNotification}

      <div className="col-12 pdv-3 mb-12">
        <h1>Manajemen Survei</h1>
      </div>

      <SurveyFormDrawer
        open={isFormOpen}
        setOpen={setIsFormOpen}
        isEdit={isFormEdit}
        setIsEdit={setIsFormEdit}
        selectedSurveyId={selectedSurveyId}
        apiNotification={apiNotification}
      />

      <SurveyResponseDrawer
        open={isResponseDrawerOpen}
        setOpen={setIsResponseDrawerOpen}
        selectedSurvey={selectedSurvey}
      />

      <Space direction="vertical" size="middle">
        <SurveySearchBar
          filterSearchHandler={filterSearchHandler}
          filterActiveHandler={filterActiveHandler}
          filterDateHandler={filterDateHandler}
          addSurveyHandler={() => setIsFormOpen(true)}
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
      surveys = res.data.data || [];
    })
    .catch((err) => {});
  return { props: { surveys } };
}
