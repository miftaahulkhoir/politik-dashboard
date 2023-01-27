import { Space, notification } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useEffect, useMemo, useState } from "react";

import SurveyDataTable from "../components/pagecomponents/surveys/SurveyDataTable";
import SurveyFormDrawer from "../components/pagecomponents/surveys/SurveyFormDrawer";
import SurveyResponseDrawer from "../components/pagecomponents/surveys/SurveyResponseDrawer";
import SurveySearchBar from "../components/pagecomponents/surveys/SurveySearchBar";

export default function Surveys(pageProps) {
  const [surveysList, setSurveysList] = useState([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [filterActive, setFilterActive] = useState(-1);
  const [filterDate, setFilterDate] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState({});

  const [isResponseDrawerOpen, setIsResponseDrawerOpen] = useState(false);

  const [apiNotification, contextHolderNotification] = notification.useNotification();

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
      filterSearch === ""
        ? surveysList
        : surveysList.filter((survey) => {
            return survey.survey_name.toLowerCase().includes(filterSearch.toLowerCase());
          });

    const filteredActive =
      filterActive === -1 ? filteredSearch : filteredSearch.filter((survey) => survey.status === filterActive);

    const dateInput = new Date(filterDate);
    const filteredDate =
      filterDate === ""
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

  const filterSearchHandler = debounce((e) => setFilterSearch(e.target.value), 300);

  const filterActiveHandler = debounce((value) => setFilterActive(Number(value)), 300);

  const filterDateHandler = debounce((_, valueString) => {
    setFilterDate(valueString);
  }, 300);

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
        setSurveysList={setSurveysList}
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

        {/* <Card bodyStyle={{ padding: "0px" }} style={{ overflow: "hidden" }}>
          <CustomDataTable columns={columns} data={filteredSurveys} style={{ width: "100%" }} />
        </Card> */}
        <SurveyDataTable
          filteredSurveys={filteredSurveys}
          surveysList={surveysList}
          setSurveysList={setSurveysList}
          apiNotification={apiNotification}
          setSelectedSurvey={setSelectedSurvey}
          setIsResponseDrawerOpen={setIsResponseDrawerOpen}
          setIsFormEdit={setIsFormEdit}
          setIsFormOpen={setIsFormOpen}
          setSelectedSurveyId={setSelectedSurveyId}
        />
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const { req } = ctx;
  let baseURL = "";
  if (`http://${req.headers.host}/` !== process.env.APP_BASEURL_DEFAULT) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if (`http://${req.headers.host}/` !== process.env.APP_BASEURL_PATRON) {
    baseURL = process.env.APP_BASEURL_PATRON;
  }

  let surveys = [];
  await axios
    .get(`${baseURL}api/survey`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      surveys = res.data.data || [];
    })
    .catch((err) => {});
  return { props: { surveys } };
}
