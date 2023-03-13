import { Button, Checkbox, Col, Drawer, Input, Radio, Row, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { createGroup } from "../../../utils/services/sentimentAnalysis";

export default function SentimentGroupDrawer({
  open,
  setOpen,
  selectedUser,
  apiNotification,
  setGroupData,
  setEmail,
  setDropdown,
  setUserAnalytics,
  setShowResult,
  setSelectedSocmedID,
}) {
  // input form states
  const [name, setName] = useState("");
  const [publics, setPublics] = useState(false);

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
    setName("");
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      clearForm();
    }, 500);
  };

  // handler
  const updateAdsHandler = (data) => {
    createGroup(data)
      .then((res) => {
        // console.log("update:", res.data.data.google_ads_id, res.data.data.google_ads_name, res.data.data.results);
        console.log("brcomplete", res);
        setGroupData(res.data.data.data.groups);
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
          description: "Tidak dapat membuat group baru",
        });
      });
  };

  const submitHandler = () => {
    const data = {
      name: name,
      public: false,
    };
    if (publics === "public") {
      data.public = true;
    }
    updateAdsHandler(data);
  };

  return (
    <Drawer
      title={"Buat group baru"}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="500px"
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Row>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Nama group</Typography.Title>
          <Input value={name} placeholder={"ex: Politik"} onChange={(e) => setName(e.target.value)} />
          <Checkbox.Group style={{ width: "100%", marginTop: "15px" }} onChange={setPublics}>
            <Row>
              <Col span={16}>
                <Checkbox value="public" defaultChecked={false}>
                  Publik
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
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
