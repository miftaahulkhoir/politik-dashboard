import { Button, Col, Drawer, Grid, Input, Radio, Row, Select, Tooltip, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import SentimentFormCard from "./SentimentFormCard";

import defaultSurveyQuestion from "../../../utils/constants/defaultSurveyQuestion";

import { updateAyrshareAccount, useGetUserAnalytics } from "../../../utils/services/socmedAnalysis";

export default function SocialTopicDrawer({
  open,
  setOpen,
  selectedUser,
  apiNotification,
  setEmail,
  setDropdown,
  setUserAnalytics,
  setShowResult,
  setSelectedSocmedID,
}) {
  const screen = Grid.useBreakpoint();

  // input form states
  const [ayrshareToken, setGoogleId] = useState("");

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [questions, setQuestions] = useState([{ ...defaultSurveyQuestion.text }]);

  // empty checking
  const hasEmpty = useMemo(() => {
    const titleEmpty = title === "";
    const questionEmpty = questions?.some((question) => {
      if (question.question_name === "") return true;
      if (question?.options) {
        return question.options.some((option) => option.option_name === "");
      }
      return false;
    });

    return titleEmpty || questionEmpty;
  }, [title, questions]);

  const clearForm = () => {
    setTitle("");
    setIsActive(false);
    setQuestions([{ ...defaultSurveyQuestion.text }]);
  };

  const addQuestionHandler = () => {
    setQuestions([...questions, { ...defaultSurveyQuestion.text }]);
  };

  // const onClose = () => {
  //   setSelectedSurveyId(null);
  //   setOpen(false);
  //   setIsEdit(false);
  //   clearForm();
  // };

  // handler
  const updateAdsHandler = (data) => {
    updateAyrshareAccount(data)
      .then((res) => {
        // console.log("update:", res.data.data.google_ads_id, res.data.data.google_ads_name, res.data.data.results);
        console.log("brcomplete", res);
        setShowResult(false);
        setSelectedSocmedID("");
        setEmail(res.data.data.email);
        setDropdown(res.data.data.displayNames);

        apiNotification.success({
          message: "Berhasil",
          description: "Perubahan user telah disimpan",
        });

        // onClose();
      })
      .catch((err) => {
        console.log("error:", err);
        apiNotification.error({
          message: "Gagal",
          description: "Ayrshare API Token tidak valid",
        });
      });
  };

  const submitHandler = () => {
    const data = {
      ayrshare_token: ayrshareToken,
    };
    updateAdsHandler(data);
  };

  return (
    <Drawer
      title={"Buat topik baru"}
      placement="right"
      // onClose={onClose}
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
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Nama topik</Typography.Title>
          <Input value={ayrshareToken} placeholder={"ex: indonesia"} onChange={(e) => setGoogleId(e.target.value)} />
        </Col>
        <Col span={isSM ? 24 : 8}>
          <Typography.Title level={5}>Bahasa</Typography.Title>
          <Select
            defaultValue="text"
            style={{ width: "160px" }}
            options={[
              {
                value: "text",
                label: "Isian Singkat",
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
                label: "Pilihan Ganda",
              },
              {
                value: "yes_no_question",
                label: "Ya dan Tidak",
              },
              {
                value: "location",
                label: "Lokasi",
              },
            ]}
            // value={type}
            // onChange={(value) => {
            //   const newQuestions = [...questions];
            //   newQuestions[index].input_type = value;
            //   newQuestions[index].options = defaultSurveyQuestion[value].options;
            //   setQuestions([...newQuestions]);
            // }}
          />
        </Col>
        <Col span={isSM ? 24 : 8}>
          <Typography.Title level={5}>Negara</Typography.Title>
          <Select
            defaultValue="text"
            style={{ width: "160px" }}
            options={[
              {
                value: "text",
                label: "Isian Singkat",
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
                label: "Pilihan Ganda",
              },
              {
                value: "yes_no_question",
                label: "Ya dan Tidak",
              },
              {
                value: "location",
                label: "Lokasi",
              },
            ]}
            // value={type}
            // onChange={(value) => {
            //   const newQuestions = [...questions];
            //   newQuestions[index].input_type = value;
            //   newQuestions[index].options = defaultSurveyQuestion[value].options;
            //   setQuestions([...newQuestions]);
            // }}
          />
        </Col>
      </Row>
      {questions?.map((question, index) => (
        <SentimentFormCard key={index} index={index} questions={questions} setQuestions={setQuestions} isSM={isSM} />
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
