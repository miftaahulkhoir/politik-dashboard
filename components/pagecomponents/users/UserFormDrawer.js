import { Button, Col, Drawer, Grid, Input, Radio, Row, Select, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import { useFindAllDistrictsByRegencyID, useFindAllRegencies } from "../../../utils/services/locations";
import { createUser, updateUser, useFindAllOccupations, useFindOneUser } from "../../../utils/services/users";

export default function UserFormDrawer({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  selectedUser,
  apiNotification,
  setUsers,
  currentUser,
}) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  // input form states
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nik, setNik] = useState("");
  const [wa, setWa] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [regency, setRegency] = useState("");
  const [district, setDistrict] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // forms selects
  const { occupations } = useFindAllOccupations();
  const { regencies } = useFindAllRegencies();
  const { districts } = useFindAllDistrictsByRegencyID(regency);

  // fill form if edit
  const { user: userComplete } = useFindOneUser(selectedUser?.id);
  useEffect(() => {
    if (!isEdit) return;
    // swr not auto update if hit multipe time with same id
    setName(selectedUser?.name);

    setOccupation(userComplete?.occupation_id);
    setNik(userComplete?.nik);
    setEmail(userComplete?.nik);
    setPassword("********");
    setWa(userComplete?.phone);
    setGender(userComplete?.gender);
    setRegency(userComplete?.distric_id?.substring(0, 4));
    setDistrict(userComplete?.distric_id);
    setLatitude(userComplete?.latitude);
    setLongitude(userComplete?.longitude);
  }, [isEdit, userComplete, selectedUser]);

  const clearForm = () => {
    setOccupation("");
    setName("");
    setNik("");
    setEmail("");
    setPassword("");
    setWa("");
    setGender("");
    setRegency("");
    setDistrict("");
    setLatitude("");
    setLongitude("");
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      setIsEdit(false);
      clearForm();
    }, 500);
  };

  // handler
  const updateUserHandler = (data) => {
    updateUser(selectedUser?.id, data)
      .then((res) => {
        setUsers((prevUsers) => {
          const newUsers = prevUsers.map((user) => {
            if (user?.id === selectedUser?.id) {
              return { ...user, ...data };
            }
            return user;
          });
          return [...newUsers];
        });

        apiNotification.success({
          message: "Berhasil",
          description: "Perubahan user telah disimpan",
        });

        onClose();
      })
      .catch((err) => {});
  };

  const addUserHandler = (data) => {
    createUser(data)
      .then((res) => {
        apiNotification.success({
          message: "Berhasil",
          description: "User baru ditambahkan",
        });

        setUsers((prevUsers) => {
          const data = res.data.data;
          data.no = prevUsers.length + 1;
          return [...prevUsers, data];
        });

        onClose();
      })
      .catch((err) => {});
  };

  const submitHandler = () => {
    if (!isEdit) {
      const data = {
        occupation_id: occupation,
        nik: nik,
        name: name,
        email: email,
        password: password,
        phone: wa,
        gender: gender,
        distric_id: district,
        latitude: latitude,
        longitude: longitude,
      };
      addUserHandler(data);
    } else {
      const data = {
        name: name,
      };
      updateUserHandler(data);
    }
  };

  return (
    <Drawer
      title={isEdit ? "Edit User" : "Tambah Pengguna"}
      placement="right"
      onClose={onClose}
      open={open}
      closable={true}
      width={isSM ? "100%" : "500px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Row>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Nama Lengkap</Typography.Title>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Col>

        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Jenis Kelamin</Typography.Title>
          <Radio.Group
            disabled={isEdit}
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
          <Typography.Title level={5}>NIK</Typography.Title>
          <Input value={nik} disabled={isEdit} onChange={(e) => setNik(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Nomor WhatsApp</Typography.Title>
          <Input value={wa} disabled={isEdit} onChange={(e) => setWa(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Email</Typography.Title>
          <Input value={email} disabled={isEdit} onChange={(e) => setEmail(e.target.value)} />
        </Col>
        {!isEdit ? (
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Password</Typography.Title>
            <Input.Password value={password} disabled={isEdit} onChange={(e) => setPassword(e.target.value)} />
          </Col>
        ) : null}
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Jabatan</Typography.Title>
          <Select
            showSearch
            placeholder="Pilih Role"
            value={occupation || undefined}
            disabled={isEdit}
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
          <Typography.Title level={5}>Kabupaten</Typography.Title>
          <Select
            showSearch
            placeholder="Pilih Kota/Kabupaten"
            value={regency || undefined}
            disabled={isEdit}
            onChange={(value) => setRegency(value)}
            style={{ width: "100%" }}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            options={regencies.map((r) => ({ label: r.name, value: r.id }))}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Kecamatan</Typography.Title>
          <Select
            showSearch
            placeholder="Pilih Kecamatan"
            value={district || undefined}
            disabled={isEdit || !regency}
            onChange={(value) => setDistrict(value)}
            style={{ width: "100%" }}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            options={districts.map((d) => ({ label: d.name, value: d.id }))}
          />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Lokasi (Latitude)</Typography.Title>
          <Input value={latitude} disabled={isEdit} onChange={(e) => setLatitude(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: "24px" }}>
          <Typography.Title level={5}>Lokasi (Longitude)</Typography.Title>
          <Input value={longitude} disabled={isEdit} onChange={(e) => setLongitude(e.target.value)} />
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
