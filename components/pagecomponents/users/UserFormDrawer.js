import { Button, Col, Drawer, Input, Radio, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserFormDrawer({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  selectedUser,
  apiNotification,
  setUsersList,
  currentUser,
}) {
  // input form states
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nik, setNik] = useState("");
  const [wa, setWa] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [regency, setRegency] = useState("");
  const [distric, setDistric] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // forms selects
  const [occupations, setOccupations] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districs, setDistrics] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`/api/occupations`);
        setOccupations(res.data.data);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`/api/regency`);
        setRegencies(res.data.data);
        setDistric("");
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (!regency) return;
    (async function () {
      try {
        const res = await axios.get(`/api/distric?regencyid=${regency}`);
        setDistrics(res.data.data);
      } catch (error) {}
    })();
  }, [regency]);

  // fill form if edit
  useEffect(() => {
    if (!isEdit) return;
    // get regency and district list

    if (selectedUser?.distric_id) {
      axios.get(`/api/distric/${selectedUser.distric_id}`).then((res) => {
        setRegency(res.data.data.regency_id);
        // fetch semua distric di regency itu, sudah dihandle useEffect atasnya
      });
    }

    axios.get(`/api/users/${selectedUser.id}`).then((res) => {
      const data = res.data.data;
      setOccupation(data.occupation_id);
      setName(data.name);
      setNik(data.nik);
      setEmail(data.email);
      setWa(data.phone);
      setGender(data.gender);
      setDistric(data.distric_id);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
    });
  }, [isEdit, selectedUser.distric_id, selectedUser.id]);

  const clearForm = () => {
    setOccupation("");
    setName("");
    setNik("");
    setEmail("");
    setPassword("");
    setWa("");
    setGender("");
    setRegency("");
    setDistric("");
    setLatitude("");
    setLongitude("");
  };

  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    clearForm();
  };

  // handler
  const updateUser = (data) => {
    axios
      .put(`/api/users/${selectedUser.id}`, data)
      .then((res) => {
        apiNotification.success({
          message: "Berhasil",
          description: "Perubahan user telah disimpan",
        });

        setUsersList((prevUsers) => [
          ...prevUsers.map((u) => {
            if (u.id !== selectedUser.id) return u;
            // data.id = selectedUser.id;
            // data.no = u.no;
            const newData = {
              ...u,
              ...data,
            };
            return newData;
          }),
        ]);

        setIsEdit(false);
        setOpen(false);
        clearForm();
      })
      .catch((err) => {});
  };

  const addUser = (data) => {
    console.log(data);
    axios
      .post(`/api/users/create`, data)
      .then((res) => {
        apiNotification.success({
          message: "Berhasil",
          description: "User baru ditambahkan",
        });

        setUsersList((prevUsers) => {
          const data = res.data.data;
          data.no = prevUsers.length + 1;
          return [...prevUsers, data];
        });

        setOpen(false);
        clearForm();
      })
      .catch((err) => {});
  };

  const submitHandler = () => {
    const data = {
      occupation_id: occupation,
      nik: nik,
      name: name,
      email: email,
      password: password,
      phone: wa,
      gender: gender,
      distric_id: distric,
      latitude: latitude,
      longitude: longitude,
    };
    if (!isEdit) {
      addUser(data);
    } else {
      updateUser(data);
    }
  };

  return (
    <Drawer
      title={isEdit ? "Edit User" : "Tambah Pengguna"}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="500px"
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Row>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Input placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Radio.Group
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            optionType="button"
            buttonStyle="solid"
            options={[
              { label: "Laki-laki", value: "male" },
              { label: "Perempuan", value: "female" },
            ]}
          ></Radio.Group>
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Input placeholder="NIK" value={nik} onChange={(e) => setNik(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Input placeholder="Nomor WhatsApp" value={wa} onChange={(e) => setWa(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Input placeholder="Alamat Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Input.Password
            placeholder="Kata Sandi"
            value={password}
            disabled={isEdit}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Select
            showSearch
            placeholder="Pilih Role"
            value={occupation || undefined}
            onChange={(value) => setOccupation(value)}
            style={{ width: "100%" }}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            options={occupations
              // .filter((o) => o.level > currentUser?.occupation?.level)
              .filter((o) => o.level === currentUser?.occupation?.level + 1)
              .map((o) => ({ label: o.name, value: o.id }))}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Select
            showSearch
            placeholder="Pilih Kota/Kabupaten"
            value={regency || undefined}
            onChange={(value) => setRegency(value)}
            style={{ width: "100%" }}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            options={regencies.map((r) => ({ label: r.name, value: r.id }))}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Select
            showSearch
            placeholder="Pilih Kecamatan"
            value={distric || undefined}
            onChange={(value) => setDistric(value)}
            style={{ width: "100%" }}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            options={districs.map((d) => ({ label: d.name, value: d.id }))}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Input placeholder="Lokasi (latitude)" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Input placeholder="Lokasi (longitude)" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
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
