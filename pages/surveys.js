import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  notification,
} from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TbCircle,
  TbPencil,
  TbPlus,
  TbSearch,
  TbSquare,
  TbTrashX,
  TbX,
} from "react-icons/tb";
import CustomDataTable from "../components/elements/customDataTable/CustomDataTable";

const { TextArea } = Input;
const { Text, Title } = Typography;

export default function Surveys(pageProps) {
  const [surveysList, setSurveysList] = useState([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [filterActive, setFilterActive] = useState(-1);
  const [filterDate, setFilterDate] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

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
      filterSearch === ""
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
      if (!res?.data?.status) throw new Error("unknown error");
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan dalam mengubah status aktif",
      });
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "80px",
      center: true,
      sortable: true,
    },
    {
      name: "Judul survei",
      selector: (row) => row.survey_name,
      sortable: true,
      grow: 2.5,
    },
    {
      name: "Tanggal rilis",
      sortable: true,
      selector: (row) => {
        const date = new Date(row?.created_at);
        const dateText = new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(date);
        const hourText = new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          hour12: false,
          minute: "2-digit",
        }).format(date);
        return (
          <div>
            <p className='text-default'>{dateText}</p>
            <p className='text-light'>{hourText}</p>
          </div>
        );
      },
    },
    {
      name: "Responden",
      selector: (row) => row?.total_respondent + " orang",
      width: "150px",
      sortable: true,
      right: true,
    },
    {
      name: "Status Aktif",
      selector: (row) => (
        <Switch
          defaultChecked={row?.status}
          onChange={async () => await changeStatusHandler(row.id)}
        />
      ),
      width: "130px",
      // FIXME: sortable not working here
      sortable: true,
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div className='d-flex gap-2'>
          <Button
            type='text'
            icon={<TbPencil size={20} color='#7287A5' />}
            shape='circle'
            onClick={() => {
              if (row?.total_respondent > 0) {
                apiNotification.error({
                  message: "Gagal",
                  description:
                    "Tidak bisa mengubah survei karena telah memiliki responden",
                });
                return;
              }
              setIsFormEdit(true);
              setSelectedSurveyId(row.id);
              setIsFormOpen(true);
            }}></Button>
          <Button
            type='text'
            icon={<TbTrashX size={20} color='#B12E2E' />}
            shape='circle'
            onClick={async () => {
              try {
                if (row?.total_respondent > 0) {
                  apiNotification.error({
                    message: "Gagal",
                    description:
                      "Tidak bisa menghapus survei karena telah memiliki responden",
                  });
                  return;
                }

                const res = await axios.delete(
                  `${process.env.APP_BASEURL}api/survey/${row?.id}`
                );
                if (!res?.data?.status) throw new Error("unknown error");

                const newSurveys = surveysList.filter((s) => s.id !== row.id);
                setSurveysList([...newSurveys]);

                apiNotification.success({
                  message: `Survei ${row?.survey_name} berhasil dihapus`,
                });
              } catch (error) {
                apiNotification.error({
                  message: "Gagal",
                  description: "Terjadi kesalahan",
                });
              }
            }}></Button>
        </div>
      ),
      width: "220px",
      center: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Manajemen Survei · Patrons</title>
      </Head>

      {contextHolderNotification}

      <div className='col-12 pb-5 mb-24'>
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

      <Space direction='vertical' size='middle'>
        <SearchBar
          filterSearchHandler={filterSearchHandler}
          filterActiveHandler={filterActiveHandler}
          filterDateHandler={filterDateHandler}
          addSurveyHandler={() => setIsFormOpen(true)}
        />

        <Row justify='end'>
          <Col span={24}>
            <Card bodyStyle={{ padding: "0px" }} style={{ overflow: "hidden" }}>
              <CustomDataTable
                columns={columns}
                data={filteredSurveys}
                style={{ width: "100%" }}
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

function SearchBar({
  filterSearchHandler,
  filterActiveHandler,
  filterDateHandler,
  addSurveyHandler,
}) {
  return (
    <Row justify='space-between'>
      <Col span={18}>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder='Pencarian'
              prefix={<TbSearch />}
              onChange={filterSearchHandler}
            />
          </Col>
          <Col span={8}>
            <Select
              defaultValue='-1'
              style={{ width: "100%" }}
              onChange={filterActiveHandler}
              options={[
                {
                  value: "-1",
                  label: "Aktif dan tidak aktif",
                },
                {
                  value: "1",
                  label: "Aktif",
                },
                {
                  value: "0",
                  label: "Tidak aktif",
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder='Tanggal'
              onChange={filterDateHandler}
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

function DropdownInputEditable({ labels, setLabels }) {
  return (
    <MultiInputEditable
      listIcon={<></>}
      labels={labels}
      setLabels={setLabels}
    />
  );
}

function MultiCheckboxEditable({ labels, setLabels }) {
  return (
    <MultiInputEditable
      listIcon={<TbSquare color='#016CEE' size={20}></TbSquare>}
      labels={labels}
      setLabels={setLabels}
    />
  );
}

function MultiRadioEditable({ labels, setLabels }) {
  return (
    <MultiInputEditable
      listIcon={<TbCircle color='#016CEE' size={20}></TbCircle>}
      labels={labels}
      setLabels={setLabels}
    />
  );
}

function MultiInputEditable({ listIcon, labels, setLabels }) {
  return (
    <>
      <Space
        direction='vertical'
        size={0}
        style={{
          width: "100%",
          border: "1px solid #EEEEEE",
          borderRadius: "8px",
        }}>
        {labels.map((label, index) => (
          <div key={index}>
            <Row
              justify='space-between'
              align='middle'
              style={{ padding: "8px 16px" }}>
              <Col span={21}>
                <Space>
                  {listIcon}
                  <Text
                    editable={{
                      onChange: (value) => {
                        const newLabels = [...labels];
                        newLabels[index] = value;
                        setLabels([...newLabels]);
                      },
                    }}>
                    {label}
                  </Text>
                </Space>
              </Col>
              <Col span={3}>
                <Row justify='end'>
                  <Button
                    type='text'
                    icon={<TbX size={20} color='red' />}
                    shape='circle'
                    onClick={() => {
                      const newLabels = labels.filter((_, i) => i !== index);
                      setLabels([...newLabels]);
                    }}></Button>
                </Row>
              </Col>
            </Row>
            {index < labels.length - 1 ? (
              <Divider style={{ margin: "0" }}></Divider>
            ) : null}
          </div>
        ))}
      </Space>
      <Row justify='space-between' align='middle' style={{ padding: "8px 0" }}>
        <Col>
          <Button
            icon={<TbPlus size={16} />}
            type='primary'
            onClick={() => {
              setLabels([...labels, ""]);
            }}>
            Tambah Opsi
          </Button>
        </Col>
      </Row>
    </>
  );
}
