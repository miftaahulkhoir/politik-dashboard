import { Button, Col, Drawer, Input, Radio, Row, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { updateGoogleCustomer } from "../../../utils/services/panelAds";

export default function AdsFormDrawer({
  open,
  setOpen,
  selectedUser,
  apiNotification,
  setUserName,
  setUserId,
  setTable,
}) {
  // input form states
  const [googleId, setGoogleId] = useState("");

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
  const updateAdsHandler = (data) => {
    updateGoogleCustomer(data)
      .then((res) => {
        console.log("update:", res);
        setUserId(res.data.google_ads_id);
        setUserName(res.data.google_ads_name);
        setTable(res.data.results);

        apiNotification.success({
          message: "Berhasil",
          description: "Perubahan user telah disimpan",
        });

        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = () => {
    const data = {
      google_ads_id: googleId,
    };
    updateAdsHandler(data);
  };

  return (
    <Drawer
      title={"Edit Akun Google Ads"}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="500px"
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Row>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Google Ads ID</Typography.Title>
          <Input value={googleId} onChange={(e) => setGoogleId(e.target.value)} />
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
