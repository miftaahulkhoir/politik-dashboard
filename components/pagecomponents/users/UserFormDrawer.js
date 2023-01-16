import {
  Button,
  Col,
  Drawer,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const { TextArea } = Input;
const { Text, Title } = Typography;

export default function UserFormDrawer({
  token,
  open,
  setOpen,
  isEdit,
  setIsEdit,
  selectedUserId,
  apiNotification,
  currentUser,
}) {
  // input form states
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [nik, setNik] = useState('');
  const [wa, setWa] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [regency, setRegency] = useState('');
  const [distric, setDistric] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // forms selects
  const [occupations, setOccupations] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districs, setDistrics] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(
          `${process.env.APP_BASEURL}api/occupations`
        );
        setOccupations(res.data.data);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`${process.env.APP_BASEURL}api/regency`);
        setRegencies(res.data.data);
        setDistric('');
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (!regency) return;
    (async function () {
      try {
        const res = await axios.get(
          `${process.env.APP_BASEURL}api/distric?regencyid=${regency}`
        );
        setDistrics(res.data.data);
      } catch (error) {}
    })();
  }, [regency]);

  // fill form if edit
  useEffect(() => {
    if (!isEdit) return;
    axios
      .get(`${process.env.APP_BASEURL}api/users/${selectedUserId}`)
      .then((res) => {
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
  }, [isEdit, selectedUserId]);

  const clearForm = () => {
    setOccupation('');
    setName('');
    setNik('');
    setEmail('');
    setPassword('');
    setWa('');
    setGender('');
    setDistric('');
    setLatitude('');
    setLongitude('');
  };

  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    clearForm();
  };

  // handler
  const updateUser = (data) => {
    axios
      .put(`${process.env.APP_BASEURL}api/users/${selectedUserId}`, data, {
        withCredentials: true,
        headers: { Cookie: `token=${token}` },
      })
      .then((res) => {
        console.log('edit res', res);
      })
      .catch((err) => {});
  };

  const addUser = (data) => {
    console.log(data);
    axios
      .post(`${process.env.APP_BASEURL}api/users/create`, data)
      .then((res) => {
        console.log(res);
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
      title={isEdit ? 'Edit User' : 'Tambah Pengguna'}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="500px"
      headerStyle={{ border: 'none', fontSize: '32px' }}
    >
      <Row>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Nama Lengkap</Title>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Jenis Kelamin</Title>
          <Radio.Group
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            optionType="button"
            buttonStyle="solid"
            options={[
              { label: 'Laki-laki', value: 'male' },
              { label: 'Perempuan', value: 'female' },
            ]}
          ></Radio.Group>
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>NIK</Title>
          <Input value={nik} onChange={(e) => setNik(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Nomor WhatsApp</Title>
          <Input value={wa} onChange={(e) => setWa(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Email</Title>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Password</Title>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Jabatan</Title>
          <Select
            value={occupation}
            onChange={(value) => setOccupation(value)}
            style={{ width: '100%' }}
            options={occupations
              .filter((o) => o.level > currentUser?.occupation?.level)
              .map((o) => ({ label: o.name, value: o.id }))}
          />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Kabupaten</Title>
          <Select
            value={regency}
            onChange={(value) => setRegency(value)}
            style={{ width: '100%' }}
            options={regencies.map((r) => ({ label: r.name, value: r.id }))}
          />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Kecamatan</Title>
          <Select
            value={distric}
            onChange={(value) => setDistric(value)}
            style={{ width: '100%' }}
            options={districs.map((d) => ({ label: d.name, value: d.id }))}
          />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Lokasi (Latitude)</Title>
          <Input
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Col>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <Title level={5}>Lokasi (Longitude)</Title>
          <Input
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Col>
        <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
          <Button type="primary" onClick={submitHandler}>
            Submit
          </Button>
        </div>
      </Row>
    </Drawer>
  );
}
