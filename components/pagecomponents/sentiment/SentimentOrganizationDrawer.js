import { Button, Col, Drawer, Input, Radio, Row, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { updateOrganization } from "../../../utils/services/sentimentAnalysis";

export default function SocialOrganizationDrawer({
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
  // input form states
  const [ayrshareToken, setGoogleId] = useState("");

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

  const clearForm = () => {
    setGoogleId("");
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      clearForm();
    }, 500);
  };

  // handler
  const updateOrganizationHandler = (data) => {
    updateOrganization(data)
      .then((res) => {
        // console.log("update:", res.data.data.google_ads_id, res.data.data.google_ads_name, res.data.data.results);
        console.log("brcomplete", res);
        // setShowResult(false);
        // setSelectedSocmedID("");
        // setEmail(res.data.data.email);
        // setDropdown(res.data.data.displayNames);

        apiNotification.success({
          message: "Berhasil",
          description: "Perubahan user telah disimpan",
        });

        onClose();
      })
      .catch((err) => {
        console.log("error:", err);
        apiNotification.error({
          message: "Gagal",
          description: "Organization ID tidak valid",
        });
      });
  };

  const submitHandler = () => {
    const data = {
      determ_id: ayrshareToken,
    };
    updateOrganizationHandler(data);
  };

  return (
    <Drawer
      title={"Ubah organisasi"}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="500px"
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Row>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>ID organisasi</Typography.Title>
          <Input value={ayrshareToken} placeholder={"ex: 157456"} onChange={(e) => setGoogleId(e.target.value)} />
        </Col>

        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <Button type="primary" onClick={submitHandler} style={{ fontWeight: 600, letterSpacing: "0.8px" }}>
            SIMPAN
          </Button>
        </div>
      </Row>
    </Drawer>
  );
}
