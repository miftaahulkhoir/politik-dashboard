import { Button, Col, Drawer, Form, Grid, Input, InputNumber, Radio, Row, Select, Typography, message } from "antd";
import React, { useEffect, useMemo } from "react";

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

  const { occupations } = useFindAllOccupations();
  const { regencies } = useFindAllRegencies();
  const { districts } = useFindAllDistrictsByRegencyID();

  const { user: userComplete } = useFindOneUser(selectedUser?.id);

  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    form.resetFields();
  };

  const updateUserHandler = (data) => {
    updateUser(userComplete?.id, data)
      .then(() => {
        setUsers((prevUsers) => {
          const newUsers = prevUsers.map((user) => {
            if (user?.id === userComplete?.id) {
              return { ...user, ...data };
            }
            return user;
          });
          return [...newUsers];
        });

        apiNotification.success({
          message: "Berhasil",
          description: "Perubahan Pengguna telah disimpan",
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
          description: "Pengguna baru ditambahkan",
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
        message.error(errMessage || "Proses Gagal!");
      });
  };

  const submitHandler = (data) => {
    const {
      occupation_id: occupationId,
      nik,
      name,
      email,
      password,
      phone,
      gender,
      district_id: districtId,
      latitude,
      longitude,
    } = data || {};
    const bodyData = {
      occupation_id: occupationId,
      nik: nik.toString(),
      name,
      email,
      password,
      phone: phone.toString(),
      gender,
      district_id: districtId,
      latitude,
      longitude,
    };

    if (!isEdit) return addUserHandler(bodyData);
    return updateUserHandler({ name });
  };

  const onFinishFailed = () => {
    message.error("Proses Gagal!");
  };

  useEffect(() => {
    if (open && !isEdit) return form.resetFields();
    return form.setFieldsValue({
      name: userComplete.name,
      nik: userComplete.nik?.toString(),
      email: userComplete.email,
      password: userComplete.password,
      phone: userComplete.phone,
      gender: userComplete.gender,
      district_id: userComplete.district,
      occupation_id: userComplete.occupation_id,
      latitude: userComplete.latitude,
      longitude: userComplete.longitude,
    });
  }, [userComplete, open, isEdit]);

  return (
    <Drawer
      title={isEdit ? "Edit Pengguna" : "Tambah Pengguna"}
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
              <Input />
            </Form.Item>
          </Col>

          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Jenis Kelamin</Typography.Title>
            <Form.Item name="gender" rules={[{ required: true, message: "Pilih Jenis Kelamin" }]}>
              <Radio.Group
                disabled={isEdit}
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
              <InputNumber className="w-full" controls={false} disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Nomor WhatsApp</Typography.Title>
            <Form.Item name="phone" rules={[{ required: true, message: "Masukkan Nomor WhatsApp" }]}>
              <InputNumber className="w-full" controls={false} disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Email</Typography.Title>
            <Form.Item name="email" rules={[{ required: true, message: "Masukkan Email" }]}>
              <Input disabled={isEdit} />
            </Form.Item>
          </Col>
          {!isEdit && (
            <Col span={24} style={{ marginBottom: "24px" }}>
              <Typography.Title level={5}>Password</Typography.Title>
              <Form.Item name="password" rules={[{ required: true, message: "Masukkan Password" }]}>
                <Input.Password />
              </Form.Item>
            </Col>
          )}
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Jabatan</Typography.Title>
            <Form.Item name="occupation_id" rules={[{ required: true, message: "Pilih Jabatan" }]}>
              <Select
                showSearch
                placeholder="Pilih Role"
                disabled={isEdit}
                style={{ width: "100%" }}
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                options={occupations
                  .filter((o) => o.level > currentUser?.occupation?.level)
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
              disabled={isEdit}
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
              disabled={isEdit || !form.getFieldValue("regency")}
              style={{ width: "100%" }}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={districts.map((d) => ({ label: d.name, value: d.id }))}
            />
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Lokasi (Latitude)</Typography.Title>
            <Input disabled={isEdit} />
          </Col>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <Typography.Title level={5}>Lokasi (Longitude)</Typography.Title>
            <Input disabled={isEdit} />
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
