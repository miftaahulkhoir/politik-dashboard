import { Space, notification } from "antd";
import debounce from "lodash.debounce";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import SentimentDataTable from "../components/pagecomponents/sentiment/SentimentDataTable";
import SurveyResponseDrawer from "../components/pagecomponents/surveys/SurveyResponseDrawer";
import SentimentSearchBar from "../components/pagecomponents/sentiment/SentimentSearchBar";
import SentimentGroupDrawer from "../components/pagecomponents/sentiment/SentimentGroupDrawer";
import SentimentOrganizationDrawer from "../components/pagecomponents/sentiment/SentimentOrganizationDrawer";
import SentimentTopicDrawer from "../components/pagecomponents/sentiment/SentimentTopicDrawer";
import { useGetUserGroups } from "../utils/services/sentimentAnalysis";

export default function Surveys({ profile }) {
  const { groups: fetchSentiments } = useGetUserGroups();
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    if (!fetchSentiments?.length) return;
    setGroups(fetchSentiments);
  }, [fetchSentiments]);

  const [isGroupDrawerActive, setIsGroupDrawerActive] = useState(false);
  const [isTopicDrawerActive, setIsTopicDrawerActive] = useState(false);
  const [isOrganizationDrawerActive, setIsOrganizationDrawerActive] = useState(false);

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
        ? groups
        : groups.filter((group) => {
            return group.survey_name.toLowerCase().includes(filterSearch.toLowerCase());
          });

    const filteredActive =
      filterActive === -1 ? filteredSearch : filteredSearch.filter((group) => group.status === filterActive);

    const formatted = filteredActive.map((group, index) => {
      group.no = index + 1;
      return group;
    });

    return formatted;
  }, [groups, filterSearch, filterActive]);

  const filterSearchHandler = debounce((e) => setFilterSearch(e.target.value), 300);

  const filterActiveHandler = debounce((value) => setFilterActive(Number(value)), 300);

  const filterDateHandler = debounce((_, valueString) => {
    setFilterDate(valueString);
  }, 300);

  return (
    <>
      <Head>
        <title>Manajemen Sentimen · Patrons</title>
      </Head>

      {contextHolderNotification}

      <div className="col-12 pdv-3 mb-12">
        <h1>Manajemen Sentimen</h1>
      </div>

      <SurveyResponseDrawer
        open={isResponseDrawerOpen}
        setOpen={setIsResponseDrawerOpen}
        selectedSurvey={selectedSurvey}
      />

      <SentimentGroupDrawer
        open={isGroupDrawerActive}
        setOpen={setIsGroupDrawerActive}
        apiNotification={apiNotification}
        setGroupData={setGroups}
        // setEmail={setAyrshareName}
        // setDropdown={setSocmedsList}
        // setUserAnalytics={setUserAnalytics}
        // setShowResult={setShowResult}
        // setSelectedSocmedID={setSelectedSocmedID}
      />
      <SentimentTopicDrawer
        open={isTopicDrawerActive}
        setOpen={setIsTopicDrawerActive}
        apiNotification={apiNotification}
        // setEmail={setAyrshareName}
        // setDropdown={setSocmedsList}
        // setUserAnalytics={setUserAnalytics}
        // setShowResult={setShowResult}
        // setSelectedSocmedID={setSelectedSocmedID}
      />
      <SentimentOrganizationDrawer
        open={isOrganizationDrawerActive}
        setOpen={setIsOrganizationDrawerActive}
        apiNotification={apiNotification}
        // setEmail={setAyrshareName}
        // setDropdown={setSocmedsList}
        // setUserAnalytics={setUserAnalytics}
        // setShowResult={setShowResult}
        // setSelectedSocmedID={setSelectedSocmedID}
      />

      <Space direction="vertical" size="middle">
        <SentimentSearchBar
          filterSearchHandler={filterSearchHandler}
          filterActiveHandler={filterActiveHandler}
          filterDateHandler={filterDateHandler}
          occupationLevel={profile?.occupation?.level}
          addSurveyHandler={() => setIsGroupDrawerActive(true)}
          editOrganizationHandler={() => setIsOrganizationDrawerActive(true)}
        />

        <SentimentDataTable
          filteredSurveys={filteredSurveys}
          groups={groups}
          setGroups={setGroups}
          apiNotification={apiNotification}
          setSelectedSurvey={setSelectedSurvey}
          setIsResponseDrawerOpen={setIsResponseDrawerOpen}
          setIsFormEdit={setIsFormEdit}
          setIsFormOpen={setIsTopicDrawerActive}
          setSelectedSurveyId={setSelectedSurveyId}
          occupationLevel={profile?.occupation?.level}
        />
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
