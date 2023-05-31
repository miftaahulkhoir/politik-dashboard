import { Button, Col, Drawer, Form, Grid, Input, InputNumber, Radio, Row, Select, Typography, message } from "antd";
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
  const [form] = Form.useForm();

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

        form.resetFields();
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

        form.resetFields();
        onClose();
      })
      .catch((err) => {
        const { message: errMessage = "" } = err?.response?.data || {};
        message.error(errMessage || "Submit failed!");
      });
  };

  const submitHandler = () => {
    if (!isEdit) {
      const data = {
        occupation_id: occupation,
        nik: nik.toString(),
        name: name,
        email: email,
        password: password,
        phone: wa.toString(),
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

  const onFinishFailed = () => {
    message.error("Submit failed!");
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
      <Form form={form} onFinish={submitHandler} onFinishFailed={onFinishFailed}>
        <Row>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Nama Lengkap</Typography.Title>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Masukkan Nama" },
                { max: 50, message: "Nama maksimal 50 karakter" },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
          </Col>

          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Jenis Kelamin</Typography.Title>
            <Form.Item name="gender" rules={[{ required: true, message: "Pilih Jenis Kelamin" }]}>
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
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>NIK</Typography.Title>
            <Form.Item name="nik" rules={[{ required: true, message: "Masukkan NIK" }]}>
              <InputNumber
                className="w-full"
                controls={false}
                value={nik}
                disabled={isEdit}
                onChange={(e) => setNik(e)}
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Nomor WhatsApp</Typography.Title>
            <Form.Item name="phone" rules={[{ required: true, message: "Masukkan Nomor WhatsApp" }]}>
              <InputNumber
                className="w-full"
                controls={false}
                value={wa}
                disabled={isEdit}
                onChange={(e) => setWa(e)}
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Email</Typography.Title>
            <Form.Item name="email" rules={[{ required: true, message: "Masukkan Email" }]}>
              <Input value={email} disabled={isEdit} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Password</Typography.Title>
            <Form.Item name="password" rules={[{ required: true, message: "Masukkan Password" }]}>
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Jabatan</Typography.Title>
            <Form.Item name="occupation_id" rules={[{ required: true, message: "Pilih Jabatan" }]}>
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
            </Form.Item>
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

          <div style={{ display: "flex", justifyContent: "end", width: "100%", gap: "20px" }}>
            <Button
              className="btn-white"
              onClick={() => {
                form.resetFields();
                setOpen(false);
              }}
              style={{ fontWeight: 600, letterSpacing: "0.8px" }}
            >
              BATAL
            </Button>
            <Button
              htmlType="submit"
              type="submit"
              className="btn-primary"
              style={{ fontWeight: 600, letterSpacing: "0.8px" }}
            >
              SIMPAN
            </Button>
          </div>
        </Row>
      </Form>
    </Drawer>
  );
}
