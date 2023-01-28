import { Button, Col, Drawer, Input, Row, Space, Switch, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import SurveyFormCard from "./SurveyFormCard";

import defaultSurveyQuestion from "../../../utils/constants/defaultSurveyQuestion";

export default function SurveyFormDrawer({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  selectedSurveyId,
  apiNotification,
  setSurveysList,
  pageProps,
}) {
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [questions, setQuestions] = useState([{ ...defaultSurveyQuestion.text }]);

  useEffect(
    (pageProps) => {
      if (!isEdit) return;
      (async function () {
        try {
          const res = await axios.get(`${pageProps.baseURL}api/survey/${selectedSurveyId}`);
          const data = res?.data?.data;
          setTitle(data?.survey_name);
          setIsActive(data?.status ? 1 : 0);
          setQuestions(data?.questions);
        } catch (error) {}
      })();
    },
    [isEdit, selectedSurveyId],
  );

  const clearForm = () => {
    setTitle("");
    setIsActive(false);
    setQuestions([{ ...defaultSurveyQuestion.text }]);
  };

  const addQuestionHandler = () => {
    setQuestions([...questions, { ...defaultSurveyQuestion.text }]);
  };

  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    clearForm();
  };

  const getFormattedSurvey = () => {
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

    const survey = {
      survey_name: title,
      status: isActive ? 1 : 0,
      questions: newQuestions || null,
    };

    return survey;
  };

  const submitHandler = async () => {
    try {
      const survey = getFormattedSurvey();
      if (isEdit) {
        await updateSurvey(survey);
      } else {
        await createSurvey(survey);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const createSurvey = async (survey) => {
    try {
      const res = await axios.post("/api/survey", survey);
      const newSurvey = res.data.data;

      setSurveysList((prevSurveys) => {
        newSurvey.no = prevSurveys.length + 1;
        return [...prevSurveys, newSurvey];
      });

      apiNotification.success({
        message: "Berhasil",
        description: "Survei telah ditambahkan",
      });
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan saat menambahkan survei",
      });
    }
  };

  const updateSurvey = async (survey) => {
    try {
      const res = await axios.put(`/api/survey/${selectedSurveyId}`, survey);
      const newSurvey = res.data.data;

      // TODO: update the state

      apiNotification.success({
        message: "Berhasil",
        description: "Survei telah diedit",
      });
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan saat menyimpan perubahan survei",
      });
    }
  };

  return (
    <Drawer
      title={isEdit ? "Pengubahan Survei" : "Penambahan Survei"}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="60%"
      headerStyle={{ border: "none", fontSize: "32px" }}
      bodyStyle={{ background: "#EEEEEE", padding: "0px", overflowX: "hidden" }}
      stye
    >
      <Row gutter={32} style={{ padding: "24px", background: "white" }}>
        <Col span={16}>
          <Typography.Title level={5}>Judul Survei</Typography.Title>
          <Input.TextArea rows={2} value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
        <Col span={8}>
          <Typography.Title level={5}>Status</Typography.Title>
          <Space>
            <Typography.Text>Tidak Aktif</Typography.Text>
            <Switch checked={isActive} onChange={setIsActive} />
            <Typography.Text>Aktif</Typography.Text>
          </Space>
        </Col>
      </Row>
      {questions.map((question, index) => (
        <SurveyFormCard key={index} index={index} questions={questions} setQuestions={setQuestions} />
      ))}
      <Row justify="space-between" style={{ margin: "24px" }}>
        <Button onClick={addQuestionHandler}>Tambah Pertanyaan</Button>
        <Button type="primary" onClick={submitHandler} style={{ fontWeight: 600, letterSpacing: "0.8px" }}>
          SIMPAN
        </Button>
      </Row>
    </Drawer>
  );
}
