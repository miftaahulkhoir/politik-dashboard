import {
  Button,
  Col,
  DatePicker,
  Divider, Drawer,
  Input,
  notification,
  Row,
  Select,
  Space,
  Switch,
  Typography
} from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Card from "../components/elements/card/Card";
import SocialChartCard from "../components/pagecomponents/home/SocialChartCard";
import SocialSummaryCard from "../components/pagecomponents/home/SocialSummaryCard";
import {
  TbPlus,
  TbSearch,
} from "react-icons/tb";
const { RangePicker } = DatePicker;

const { TextArea } = Input;
const { Text, Title } = Typography;

export default function SocialReports(pageProps) {
  const [summaryImpressions, setSummaryImpressions] = useState(null);
  const [summaryEngagements, setSummaryEngagements] = useState(null);
  const [summaryEngagementRate, setSummaryEngagementRate] = useState(null);
  const [summaryPostLinkClicks, setSummaryPostLinkClicks] = useState(null);
  const [audienceGrowthData, setAudienceGrowthData] = useState([]);
  const [impressionData, setImpressionData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [engagementRateData, setEngagementRateData] = useState([]);
  const [videoViewsData, setVideoViewsData] = useState([]);
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const [mtkUrl, setMtkUrl] = useState("");
  const [mtkToken, setMtkToken] = useState("");
  const [mtkOrgId, setMtkOrgId] = useState("");
  
  const [isGroupAssigned, setIsGroupAssigned] = useState(false);
  const [isTopicAssigned, setIsTopicAssigned] = useState(false);
  const [isDateAssigned, setIsDateAssigned] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  
  const [filterSearch, setFilterSearch] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [selectedGroupData, setSelectedGroup] = useState("");
  const [selectedTopicData, setSelectedTopic] = useState("");
  const [filterDate, setFilterDate] = useState([]);

  useEffect(() => {
    if (!pageProps?.reports) return;
    setGroupData(pageProps.reports.data.groups);
    setMtkToken(pageProps.mediatoolkit.token);
    setMtkUrl(pageProps.mediatoolkit.url);
    setMtkOrgId(pageProps.mediatoolkit.orgid);
    console.log("process:", pageProps);
  }, []);

  useEffect(() => {
    if (isGroupAssigned && isTopicAssigned && isDateAssigned) {
      fetchSocialData();
    }
  }, [selectedGroupData, selectedTopicData, filterDate]);

  const selectGroupHandler = useCallback(
    debounce((value) => {
      setSelectedGroup(Number(value));
      setIsGroupAssigned(true);
    }, 300)
  );

  const selectTopicHandler = useCallback(
    debounce((value) => {
      setSelectedTopic(Number(value));
      setIsTopicAssigned(true);
    }, 300)
  );

  const selectDateHandler = useCallback(
    debounce((_, valueString) => {
      let res = [];
      valueString.forEach((value, index) => {
        res[index] = new Date(parseInt(value.slice(0, 4)), parseInt(value.slice(5, 7))-1, parseInt(value.slice(8, 10))).getTime() / 1000;
      });
      setFilterDate(res);
      setIsDateAssigned(true);
    }, 300)
  );
  
  // 1. get report time
  // 2. get report 
  const fetchSocialData = async () => {
    try {
      console.log(`${process.env.APP_BASEURL}api/social/${mtkOrgId}/reports`)
      const res = await axios.post(
        `${process.env.APP_BASEURL}api/social/${mtkOrgId}/reports`,
        {
          keyword_id: selectedTopicData,
          from_time: filterDate[0],
          to_time: filterDate[1],
          dimension_type: "time"
        }
      ).then((response) => {
        console.log(res);
        console.log(response);
      });
      if (!res?.data?.status) throw new Error('unknown error');
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan dalam pengambilan data reports"
      });
    }
  };

  return (
    <>
      <Head>
        <title>Sentimen Analisis · Patrons</title>
      </Head>

      <div className='col-12 pb-5 mb-24'>
        <h1>Sentimen Analisis</h1>
      </div>

      <SurveyFormDrawer
        open={isFormOpen}
        setOpen={setIsFormOpen}
        isEdit={isFormEdit}
        setIsEdit={setIsFormEdit}
        selectedSurveyId={selectedSurveyId}
        apiNotification={apiNotification}
      />

      <Space direction='vertical' size='middle'>
        <SearchBar
            groupData={groupData}
            selectGroupHandler={selectGroupHandler}
            selectTopicHandler={selectTopicHandler}
            selectDateHandler={selectDateHandler}

            selectedGroupData={selectedGroupData}
            addSurveyHandler={() => setIsFormOpen(true)}
          />

        <div className='col-12'>
          <Card noPadding>
            <SocialSummaryCard
              title={"Performance Summary"}
              subtitle={
                "View your key profile performance metrics from the reporting period."
              }
              impressions={summaryImpressions}
              engagements={summaryEngagements}
              engagementRate={summaryEngagementRate}
              postLinkClicks={summaryPostLinkClicks}
            />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard
              title={"Audience Growth"}
              data={audienceGrowthData}
            />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard title={"Impressions"} data={impressionData} />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard title={"Engagement"} data={engagementData} />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard
              title={"Engagement Rate"}
              data={engagementRateData}
            />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard title={"Video Views"} data={videoViewsData} />
          </Card>
        </div>
      
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  let { token } = parseCookies(ctx);
  let reports, mediatoolkit;
  
  // get groups
  await axios
    .get(`${process.env.APP_BASEURL}api/social/156097`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      reports = res.data.data;
      mediatoolkit = {
        orgid: `156097`
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return { props: { reports, mediatoolkit } };
}

function SearchBar({
  groupData,
  selectGroupHandler,
  selectTopicHandler,
  selectDateHandler,
  selectedGroupData,
  addSurveyHandler,
}) {
  let groupList = [{}];
  console.log('group data', groupData);
  groupData.forEach((value, index) => {
    groupList[index] = {
      value: value.id,
      label: value.name
    };
  })

  let topicList = [{}];
  if (selectedGroupData != "") {
    let temp = groupData.find(value => value.id == selectedGroupData);
    temp.keywords.forEach((value, index) => {
      topicList[index] = {
        value: value.id,
        label: value.name
      };
    })
  }

  // console.log("yes", selectedGroup.keywords);
  // selectedGroup.keywords.forEach((value, index) => {
  //   console.log(value.id, value.name);
  //   topicList[index].value = value.id
  //   topicList[index].label = value.name
  // })

  return (
    <Row justify='space-between'>
      <Col span={18}>
        <Row gutter={16}>
          <Col span={8}>
            <Select
              placeholder={"Pilih Group..."}
              style={{ width: "100%" }}
              onChange={selectGroupHandler}
              options={groupList}
            />
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Pilih Topik..."}
              style={{ width: "100%" }}
              onChange={selectTopicHandler}
              options={topicList}
            />
          </Col>
          <Col span={8}>
            <RangePicker
              style={{ width: "100%" }}
              placeholder={['Tanggal Awal', 'Tanggal Akhir']}
              onChange={selectDateHandler}
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button icon={<TbPlus />} type='primary' onClick={addSurveyHandler}>
          Tambah Survei
        </Button>
      </Col>
    </Row>
  );
}

const defaultSurveyQuestion = {
  text: {
    input_type: "text",
    question_name: "",
    question_subject: "",
    section: "",
    options: null,
  },
  long_text: {
    input_type: "long_type",
    question_name: "",
    question_subject: "",
    section: "",
    options: null,
  },
  yes_no_question: {
    input_type: "yes_no_question",
    question_name: "",
    question_subject: "",
    section: "",
    options: [
      {
        option_name: "ya",
      },
      {
        option_name: "tidak",
      },
    ],
  },
  radio_button: {
    input_type: "radio_button",
    question_name: "",
    question_subject: "",
    section: "",
    options: [
      {
        option_name: "opsi 1",
      },
      {
        option_name: "opsi 2",
      },
    ],
  },
  dropdown: {
    input_type: "dropdown",
    question_name: "",
    question_subject: "",
    section: "",
    options: [
      {
        option_name: "opsi 1",
      },
      {
        option_name: "opsi 2",
      },
    ],
  },
};

function SurveyFormDrawer({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  selectedSurveyId,
  apiNotification,
}) {
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [questions, setQuestions] = useState([
    { ...defaultSurveyQuestion.text },
  ]);

  useEffect(() => {
    if (!isEdit) return;
    (async function () {
      try {
        const res = await axios.get(
          `${process.env.APP_BASEURL}api/survey/${selectedSurveyId}`
        );
        const data = res?.data?.data;
        setTitle(data?.survey_name);
        setIsActive(data?.status ? 1 : 0);
        setQuestions(data?.questions);
      } catch (error) {}
    })();
  }, [isEdit]);

  const addQuestionHandler = () => {
    setQuestions([...questions, { ...defaultSurveyQuestion.text }]);
  };

  const onClose = () => {
    setOpen(false);
  };

  const submitHandler = async () => {
    try {
      const newQuestions = questions.map((question, i) => {
        const newQuestion = question;
        newQuestion.question_number = i + 1;
        newQuestion.section = "section1";
        newQuestion.question_subject = "subject1";
        newQuestion.options = newQuestion?.options?.map((option, j) => {
          const newOption = option;
          newOption.value = j + 1;
          return newOption;
        });
        return newQuestion;
      });
      console.log("new quests", newQuestions);
      if (isEdit) {
        // update

        // FIXME: update ideas:
        // loop req options -> ada api update sendiri
        // loop req questions -> ada api update sendiri
        // req survey -> hanya judul
        // req status -> ada api update sendiri

        // 1. update survey name
        const survey = {
          survey_name: title,
        };

        await axios.put(
          `${process.env.APP_BASEURL}api/survey/${selectedSurveyId}`,
          survey
        );

        // // 2. update/create questions
        // const newOptions = [];
        // await Promise.all(
        //   newQuestions.forEach(async (q) => {
        //     if (q.id) {
        //       // update question
        //       await axios.put(
        //         `${process.env.APP_BASEURL}api/survey/${q.id}`,
        //         q
        //       );

        //       // menambah options yang perlu diupdate
        //       if (q.options) {
        //         q.options.forEach((o) => {
        //           o.question_id = q.id;
        //           newOptions.push(o);
        //         });
        //       }
        //       return;
        //     }
        //     // create question
        //     q.survey_id = selectedSurveyId;
        //     await axios.post(`${process.env.APP_BASEURL}api/survey`, q);
        //   })
        // );

        // // 3. update options untuk question yang sudah ada

        // console.log('options', options);
        // await Promise.all(
        //   newOptions.forEach(async (option) => {
        //     if (option.id) {
        //       // update
        //       await axios.put(
        //         `${process.env.APP_BASEURL}api/survey/${option.ques}`,
        //         survey
        //       );
        //       return;
        //     }
        //     // create
        //   })
        // );

        apiNotification.success({
          message: "Berhasil",
          description: "Perubahan survei telah disimpan",
        });
        setIsEdit(false);
      } else {
        // create
        const survey = {
          survey_name: title,
          status: isActive ? 1 : 0,
          questions: newQuestions || null,
        };

        const res = await axios.post(
          `${process.env.APP_BASEURL}api/survey`,
          survey
        );
        if (!res?.data?.status) throw new Error("unknown error");

        apiNotification.success({
          message: "Berhasil",
          description: "Survei telah ditambahkan",
        });
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan saat menambahkan survei",
      });
    }
  };

  return (
    <Drawer
      title={isEdit ? "Pengubahan Survei" : "Penambahan Survei"}
      placement='right'
      onClose={onClose}
      open={open}
      closable={false}
      width='60%'
      headerStyle={{ border: "none", fontSize: "32px" }}
      bodyStyle={{ background: "#EEEEEE", padding: "0px", overflowX: "hidden" }}
      stye>
      <Row gutter={32} style={{ padding: "24px", background: "white" }}>
        <Col span={16}>
          <Title level={5}>Judul Survei</Title>
          <TextArea
            rows={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Title level={5}>Status</Title>
          <Space>
            <Text>Tidak Aktif</Text>
            <Switch checked={isActive} onChange={setIsActive} />
            <Text>Aktif</Text>
          </Space>
        </Col>
      </Row>
      {questions.map((question, index) => (
        <SurveyFormCard
          key={index}
          index={index}
          questions={questions}
          setQuestions={setQuestions}
        />
      ))}
      <Row justify='space-between' style={{ margin: "24px" }}>
        <Button onClick={addQuestionHandler}>Tambah pertanyaan</Button>
        <Button type='primary' onClick={submitHandler}>
          Simpan survei
        </Button>
      </Row>
    </Drawer>
  );
}

function SurveyFormCard({ index, questions, setQuestions }) {
  const type = useMemo(() => {
    return questions[index].input_type;
  }, [questions]);

  const labels = useMemo(() => {
    return questions[index]?.options?.map((option) => option.option_name);
  }, [questions]);

  const setLabels = useCallback(
    (values) => {
      const newQuestions = [...questions];
      newQuestions[index].options = values?.map((value) => ({
        option_name: value,
      }));
      setQuestions([...newQuestions]);
    },
    [questions]
  );

  const formElement = useMemo(() => {
    if (type === "text") return <Input value='Isian singkat' disabled />;
    if (type === "long_text") return <TextArea value='Paragraf' disabled />;
    if (type === "dropdown")
      return <DropdownInputEditable labels={labels} setLabels={setLabels} />;
    if (type === "radio_button")
      return <MultiRadioEditable labels={labels} setLabels={setLabels} />;
  }, [type, labels, setLabels]);

  return (
    <Card style={{ margin: "24px" }}>
      <Row gutter={32}>
        <Col span={16}>
          <Title level={5}>Pertanyaan</Title>
          <TextArea
            rows={2}
            value={questions[index].question_name}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].question_name = e.target.value;
              setQuestions([...newQuestions]);
            }}
          />
        </Col>
        <Col span={8}>
          <Title level={5}>Jenis jawaban</Title>
          <Select
            defaultValue='text'
            style={{ width: "160px" }}
            options={[
              {
                value: "text",
                label: "Isian singkat",
              },
              {
                value: "long_text",
                label: "Paragraf",
              },
              {
                value: "dropdown",
                label: "Dropdown",
              },
              {
                value: "radio_button",
                label: "Pilihan ganda",
              },
            ]}
            value={type}
            onChange={(value) => {
              const newQuestions = [...questions];
              newQuestions[index].input_type = value;
              newQuestions[index].options =
                defaultSurveyQuestion[value].options;
              setQuestions([...newQuestions]);
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={32}>
        <Col span={16}>{formElement}</Col>
      </Row>
    </Card>
  );
}
