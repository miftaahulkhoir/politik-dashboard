import { Button, Col, Drawer, Grid, Input, Row, Space, Switch, Tooltip, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import SurveyFormCard from "./SurveyFormCard";

import defaultSurveyQuestion from "../../../utils/constants/defaultSurveyQuestion";
import { createSurvey, updateSurvey, useFindOneSurvey } from "../../../utils/services/surveys";

export default function SurveyFormDrawer({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  selectedSurveyId,
  apiNotification,
  setSurveys,
}) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [questions, setQuestions] = useState([{ ...defaultSurveyQuestion.text }]);

  // empty checking
  const hasEmpty = useMemo(() => {
    const titleEmpty = title === "";
    const questionEmpty = questions.some((question) => {
      if (question.question_name === "") return true;
      if (question?.options) {
        return question.options.some((option) => option.option_name === "");
      }
      return false;
    });

    return titleEmpty || questionEmpty;
  }, [title, questions]);

  // end empty checking

  const { survey } = useFindOneSurvey(selectedSurveyId);
  useEffect(() => {
    if (!isEdit) return;
    if (!survey) return;
    setTitle(survey?.survey_name);
    setIsActive(survey?.status ? 1 : 0);
    setQuestions(survey?.questions);
  }, [isEdit, survey]);

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

  const getFormattedSurvey = useCallback(() => {
    const newQuestions = questions?.map((question, i) => {
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
  }, [isActive, questions, title]);

  const submitHandler = async () => {
    try {
      const survey = getFormattedSurvey();
      if (isEdit) {
        await updateSurveyHandler(survey);
      } else {
        await createSurveyHandler(survey);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const createSurveyHandler = async (survey) => {
    try {
      const res = await createSurvey(survey);
      const newSurvey = res.data.data;

      setSurveys((prevSurveys) => [...prevSurveys, newSurvey]);

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

  const updateSurveyHandler = async (survey) => {
    try {
      const res = await updateSurvey(selectedSurveyId, survey);
      const newSurvey = res.data.data;

      setSurveys((prevSurveys) => prevSurveys.map((survey) => (survey?.id === newSurvey?.id ? newSurvey : survey)));

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
      closable={true}
      width={isSM ? "100%" : "750px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
      bodyStyle={{ background: "#EEEEEE", padding: "0px", overflowX: "hidden" }}
      stye
    >
      <Row
        style={{ padding: "24px", background: "white", flexDirection: isSM ? "column-reverse" : "row", gap: "16px" }}
      >
        <Col span={isSM ? 24 : 16}>
          <Typography.Title level={5}>Judul Survei</Typography.Title>
          <Input.TextArea rows={2} value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
        <Col span={isSM ? 24 : 8}>
          <Typography.Title level={5}>Status</Typography.Title>
          <Space>
            <Typography.Text>Tidak Aktif</Typography.Text>
            <Switch checked={isActive} onChange={setIsActive} />
            <Typography.Text>Aktif</Typography.Text>
          </Space>
        </Col>
      </Row>
      {questions?.map((question, index) => (
        <SurveyFormCard key={index} index={index} questions={questions} setQuestions={setQuestions} isSM={isSM} />
      ))}
      <Row justify="space-between" style={{ margin: "24px" }}>
        <Button onClick={addQuestionHandler}>Tambah Pertanyaan</Button>
        <Tooltip
          placement="topRight"
          title={hasEmpty ? "Judul serta semua pertanyaan dan opsi jawaban tidak boleh kosong!" : ""}
        >
          <Button
            type="primary"
            onClick={submitHandler}
            style={{ fontWeight: 600, letterSpacing: "0.8px" }}
            disabled={hasEmpty}
          >
            SIMPAN
          </Button>
        </Tooltip>
      </Row>
    </Drawer>
  );
}
