import { Space, notification } from "antd";
import debounce from "lodash.debounce";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import SurveyDataTable from "../components/pagecomponents/surveys/SurveyDataTable";
import SurveyFormDrawer from "../components/pagecomponents/surveys/SurveyFormDrawer";
import SurveyResponseDrawer from "../components/pagecomponents/surveys/SurveyResponseDrawer";
import SurveySearchBar from "../components/pagecomponents/surveys/SurveySearchBar";
import { useFindAllSurveys } from "../utils/services/surveys";

export default function Surveys() {
  const { surveys: fetchSurveys } = useFindAllSurveys();
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    setSurveys(fetchSurveys);
  }, [fetchSurveys]);

  const [filterSearch, setFilterSearch] = useState("");
  const [filterActive, setFilterActive] = useState(-1);
  const [filterDate, setFilterDate] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState({});

  const [isResponseDrawerOpen, setIsResponseDrawerOpen] = useState(false);

  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const filteredSurveys = useMemo(() => {
    const filteredSearch =
      filterSearch === ""
        ? surveys
        : surveys.filter((survey) => {
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

    const formatted = filteredDate.map((survey, index) => {
      survey.no = index + 1;
      return survey;
    });

    return formatted;
  }, [surveys, filterSearch, filterActive, filterDate]);

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
        setSurveys={setSurveys}
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

        <SurveyDataTable
          filteredSurveys={filteredSurveys}
          surveys={surveys}
          setSurveys={setSurveys}
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
  return { props: {} };
}
