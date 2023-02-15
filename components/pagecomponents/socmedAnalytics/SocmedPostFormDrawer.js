import { Button, Checkbox, Col, Drawer, Input, Radio, Row, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { postToSocialMedia } from "../../../utils/services/socmedAnalysis";

export default function SocmedPostFormDrawer({ open, setOpen, selectedUser, apiNotification, setEmail, setDropdown }) {
  // input form states

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const res = await axios.get(`/api/occupations`);
  //       setOccupations(res.data.data);
  //     } catch (error) {}
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const res = await axios.get(`/api/regency`);
  //       setRegencies(res.data.data);
  //       setDistric("");
  //     } catch (error) {}
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (!regency) return;
  //   (async function () {
  //     try {
  //       const res = await axios.get(`/api/distric?regencyid=${regency}`);
  //       setDistrics(res.data.data);
  //     } catch (error) {}
  //   })();
  // }, [regency]);

  // fill form if edit
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [platforms, setPlatforms] = useState([]);

  const clearForm = () => {
    setCaption("");
    setMediaUrl("");
    setPlatforms("");
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      clearForm();
    }, 500);
  };

  // handler
  const updateAdsHandler = (data) => {
    postToSocialMedia(data)
      .then((res) => {
        // console.log("update:", res.data.data.google_ads_id, res.data.data.google_ads_name, res.data.data.results);
        console.log("brcomplete", res);
        // setEmail(res.data.data.email);
        // setDropdown(res.data.data.displayNames);

        apiNotification.success({
          message: "Berhasil",
          description: "Berhasil Posting ke Media Sosial",
        });

        onClose();
      })
      .catch((err) => {
        console.log("error:", err);
        apiNotification.error({
          message: "Gagal",
          description: "Sesuatu telah terjadi",
        });
      });
  };

  const submitHandler = () => {
    const data = {
      post: caption,
      mediaUrls: [mediaUrl],
      platforms: platforms,
    };
    updateAdsHandler(data);
  };

  return (
    <Drawer
      title={"Posting ke Sosial Media"}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="500px"
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Row>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Caption</Typography.Title>
          <Input
            value={caption}
            placeholder={"Tulis disini"}
            onChange={(e) => setCaption(e.target.value)}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Media URL</Typography.Title>
          <Input
            value={mediaUrl}
            placeholder={"http://image.google.com/test.png"}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
        </Col>
        <Typography.Title level={5}>Platform Media Sosial</Typography.Title>
        <Checkbox.Group style={{ width: '100%' }} onChange={setPlatforms}>
          <Row>
            <Col span={16}>
              <Checkbox value="facebook">Facebook</Checkbox>
            </Col>
            <Col span={16}>
              <Checkbox value="twitter">Twitter</Checkbox>
            </Col>
            <Col span={16}>
              <Checkbox value="instagram" defaultChecked={false} disabled>Instagram</Checkbox>
            </Col>
            <Col span={16}>
              <Checkbox value="tiktok" defaultChecked={false} disabled>TikTok</Checkbox>
            </Col>
            <Col span={16}>
              <Checkbox value="linkedin" defaultChecked={false} disabled>LinkedIn</Checkbox>
            </Col>
            <Col span={16}>
              <Checkbox value="pinterest" defaultChecked={false} disabled>Pinterest</Checkbox>
            </Col>
            <Col span={16}>
              <Checkbox value="telegram" defaultChecked={false} disabled>Telegram</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>

        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <Button type="primary" onClick={submitHandler} style={{ fontWeight: 600, letterSpacing: "0.8px" }}>
            POST
          </Button>
        </div>
      </Row>
    </Drawer>
  );
}
