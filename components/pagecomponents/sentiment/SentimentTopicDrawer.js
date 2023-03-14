import { Button, Col, Divider, Drawer, Grid, Input, Radio, Row, Select, Tooltip, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import SentimentFormCard from "./SentimentFormCard";

import defaultSentimentKeyword from "../../../utils/constants/defaultSentimentKeyword";
import defaultCountries from "../../../utils/constants/countries";
import defaultLanguages from "../../../utils/constants/languages";
import sourceTypes from "../../../utils/constants/sentimentPlatforms";

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

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const [isActive, setIsActive] = useState(false);
  const [isTrial, setIsTrial] = useState(true);

  // input topic form
  const [topic, setTopic] = useState("");
  const [languages, setLanguages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [keywords, setKeywords] = useState([{ ...defaultSentimentKeyword }]);

  // empty checking
  const checkKeywordEmpty = (values) => {
    let isNull = false;
    if (values.length === 0) {
      isNull = true;
    } else {
      values.forEach((value) => {
        if (value.clause === null) {
          isNull = true;
        } else if (value.text === "") {
          isNull = true;
        }
      });
    }
    if (isNull === true) {
      return true;
    } else {
      return false;
    }
  };

  const hasEmpty = useMemo(() => {
    const topicEmpty = topic === "";
    const languageEmpty = languages.length === 0;
    const locationEmpty = locations.length === 0;
    const platformEmpty = platforms.length === 0;
    const keywordEmpty = checkKeywordEmpty(keywords);

    return topicEmpty || languageEmpty || platformEmpty || locationEmpty || keywordEmpty;
    // return titleEmpty || questionEmpty;
  }, [topic, languages, locations, platforms, keywords]);
  // }, [title, keywords]);

  const clearForm = () => {
    setTopic("");
    setLanguages([]);
    setLocations([]);
    setPlatforms([]);
    const empty = { ...defaultSentimentKeyword };
    empty.text = null;
    setKeywords([empty]);
  };

  const addQuestionHandler = () => {
    setKeywords([...keywords, { ...defaultSentimentKeyword }]);
  };

  const onClose = () => {
    setOpen(false);
    clearForm();
  };

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

        onClose();
      })
      .catch((err) => {
        console.log("error:", err);
        if (isTrial) {
          apiNotification.error({
            message: "Gagal",
            description: "Tidak dapat membuat topik dalam masa trial",
          });
        } else {
          apiNotification.error({
            message: "Gagal",
            description: "Gagal membuat topik",
          });
        }
      });
  };

  const submitHandler = () => {
    const data = {
      ayrshare_token: topic,
    };
    updateAdsHandler(data);
  };

  return (
    <Drawer
      title={"Buat topik baru"}
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
        <Col span={24}>
          <Typography.Title level={5}>Nama topik</Typography.Title>
          <Input value={topic} placeholder={"ex: indonesia"} onChange={(e) => setTopic(e.target.value)} />
        </Col>
        <Divider />
        <Col span={24}>
          <Typography.Title level={5}>Bahasa</Typography.Title>
          <Select
            mode={"multiple"}
            placeholder="Masukkan bahasa"
            style={{ width: "100%" }}
            options={defaultLanguages}
            value={languages}
            onChange={(value) => setLanguages(value)}
          />
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>Negara</Typography.Title>
          <Select
            mode={"multiple"}
            placeholder="Masukkan negara"
            style={{ width: "100%" }}
            options={defaultCountries}
            value={locations}
            onChange={(value) => setLocations(value)}
          />
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>Platform</Typography.Title>
          <Select
            mode={"multiple"}
            placeholder="Masukkan platform"
            style={{ width: "100%" }}
            options={sourceTypes}
            value={platforms}
            onChange={(value) => setPlatforms(value)}
          />
        </Col>
      </Row>
      {keywords?.map((question, index) => (
        <SentimentFormCard key={index} index={index} keywords={keywords} setKeywords={setKeywords} isSM={isSM} />
      ))}
      <Row justify="space-between" style={{ margin: "24px" }}>
        <Button onClick={addQuestionHandler}>Tambah Query</Button>
        <Tooltip
          placement="topRight"
          title={hasEmpty ? "Nama topik serta semua input dalam form tidak boleh kosong!" : ""}
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
