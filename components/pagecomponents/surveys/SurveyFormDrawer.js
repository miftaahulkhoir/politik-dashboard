import { Button, Col, Drawer, Form, Grid, Input, Row, Space, Switch, Tooltip, Typography } from "antd";
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
  setSelectedSurveyId,
  apiNotification,
  setSurveys,
}) {
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const { survey } = useFindOneSurvey(selectedSurveyId);

  useEffect(() => {
    if (isEdit && survey) {
      form.setFieldsValue({
        title: survey?.survey_name ?? "",
        isActive: survey?.status ? 1 : 0,
        questions: survey?.questions ?? [],
      });
    } else {
      form.setFieldsValue({
        title: "",
        isActive: false,
        questions: [
          {
            ...defaultSurveyQuestion.text,
          },
        ],
      });
    }
  }, [survey, form, isEdit]);

  const clearForm = () => {
    form.resetFields();
  };

  const onClose = () => {
    setSelectedSurveyId(null);
    setOpen(false);
    setIsEdit(true);
    clearForm();
  };

  const getFormattedSurvey = (formValues) => {
    const { questions, title, isActive } = formValues;
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
  };

  const submitHandler = async (formValues) => {
    try {
      const survey = getFormattedSurvey(formValues);
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
      <Form form={form} onFinish={submitHandler}>
        <Row
          style={{ padding: "24px", background: "white", flexDirection: isSM ? "column-reverse" : "row", gap: "16px" }}
        >
          <Col span={isSM ? 24 : 16}>
            <Typography.Title level={5}>Judul Survei</Typography.Title>
            <Form.Item
              name="title"
              rules={[
                { required: true, message: "Judul pertanyaan harus di isi" },
                { max: 100, message: "Judul pertanyaan maksimal 100 karakter" },
              ]}
              style={{ marginBottom: "0px" }}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={isSM ? 24 : 8}>
            <Typography.Title level={5}>Status</Typography.Title>
            <Space>
              <Typography.Text>Tidak Aktif</Typography.Text>
              <Form.Item valuePropName="checked" name="isActive" style={{ margin: 0 }}>
                <Switch />
              </Form.Item>
              <Typography.Text>Aktif</Typography.Text>
            </Space>
          </Col>
        </Row>
        <Form.List
          name="questions"
          rules={[
            {
              validator: async (_, questions) => {
                if (questions) {
                  const emptyOptionsList = questions.map((q) => q.options && q.options.length === 0);
                  return emptyOptionsList.some((v) => v === true)
                    ? Promise.reject(
                        new Error(
                          `${emptyOptionsList.reduce((acc, cur, index) => {
                            if (cur) {
                              return acc === "" ? index : `${acc},${index}`;
                            } else {
                              return acc;
                            }
                          }, "")}`,
                        ),
                      )
                    : undefined;
                }
              },
            },
          ]}
        >
          {(fields, { add }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <>
                  <SurveyFormCard
                    key={index}
                    name={name}
                    restField={restField}
                    index={index}
                    questions={form.getFieldValue("questions")}
                    setQuestions={(questions) => {
                      form.validateFields();
                      form.setFieldValue("questions", questions);
                    }}
                    isSM={isSM}
                    hasEmptyOptions={
                      errors && errors.toString() ? errors.toString().split(",").includes(String(index)) : false
                    }
                  />
                </>
              ))}
              <Row justify="space-between" style={{ margin: "24px" }}>
                <Button onClick={() => add({ ...defaultSurveyQuestion.text })}>Tambah Pertanyaan</Button>
                <Button type="primary" style={{ fontWeight: 600, letterSpacing: "0.8px" }} htmlType="submit">
                  SIMPAN
                </Button>
              </Row>
            </>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
}
