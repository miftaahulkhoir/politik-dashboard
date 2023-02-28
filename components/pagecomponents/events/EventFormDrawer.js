import { Button, Col, DatePicker, Drawer, Input, Row, Space, TimePicker, Typography, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";

import { createEvent, updateEvent } from "../../../utils/services/events";

export default function EventFormDrawer({
  open,
  setOpen,
  isSM,
  apiNotification,
  isEdit = false,
  setIsEdit,
  selectedEvent,
  setEvents,
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [contact, setContact] = useState("");
  const [dateStart, setDateStart] = useState(dayjs());
  const [timeStart, setTimeStart] = useState(dayjs());
  const [dateEnd, setDateEnd] = useState(dayjs());
  const [timeEnd, setTimeEnd] = useState(dayjs());

  // fill form if edit
  useEffect(() => {
    if (!isEdit) return;
    setTitle(selectedEvent?.event_name);
    setImage(null);
    setDescription(selectedEvent?.description);
    setLink(selectedEvent?.link);
    setContact(selectedEvent?.contact_person);
    setDateStart(dayjs(selectedEvent?.date_start));
    setDateEnd(dayjs(selectedEvent?.date_start));
    setTimeStart(dayjs(selectedEvent?.date_end));
    setTimeEnd(dayjs(selectedEvent?.date_end));
  }, [isEdit, selectedEvent]);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      resetForm();
      setIsEdit(false);
    }, 200);
  };

  const resetForm = () => {
    setTitle("");
    setImage(null);
    setDescription("");
    setLink("");
    setContact("");
    setDateStart(dayjs());
    setDateEnd(dayjs());
    setTimeStart(dayjs());
    setTimeEnd(dayjs());
  };

  const createEventHandler = async (formData) => {
    try {
      const res = await createEvent(formData);
      const newEvent = res?.data?.data;
      setEvents((prevEvents) => [newEvent, ...prevEvents]);

      apiNotification.success({
        message: "Berhasil",
        description: `Kegiatan ${title} telah ditambahkan`,
      });
      onClose();
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan saat menambahkan kegiatan",
      });
    }
  };

  const editEventHandler = async (id, formData) => {
    try {
      await updateEvent(id, formData);

      apiNotification.success({
        message: "Berhasil",
        description: `Perubahan kegiatan ${title} telah disimpan`,
      });
      onClose();
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan saat menyimpan perubahan kegiatan",
      });
    }
  };

  const submitHandler = async () => {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm:ss";

    const formData = new FormData();
    formData.append("event_name", title);
    formData.append("category", "kategori");
    formData.append("description", description);
    formData.append("link", link);
    formData.append("date_start", `${dateStart.format(dateFormat)} ${timeStart.format(timeFormat)}`);
    formData.append("date_end", `${dateEnd.format(dateFormat)} ${timeEnd.format(timeFormat)}`);
    formData.append("contact_person", contact);
    formData.append("location", "di sini");
    formData.append("status", true);
    if (image) {
      formData.append("images", image);
    }

    if (isEdit) {
      await editEventHandler(selectedEvent.id, formData);
    } else {
      await createEventHandler(formData);
    }
  };

  return (
    <Drawer
      title={isEdit ? "Edit Kegiatan" : "Tambah Kegaitan"}
      placement="right"
      onClose={onClose}
      open={open}
      closable={true}
      width={isSM ? "100%" : "500px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        rowGap: "24px",
      }}
    >
      <Space direction="vertical" size="middle">
        <div>
          <Typography.Title level={5}>Foto</Typography.Title>
          <Upload
            listType="picture"
            maxCount={1}
            accept="image/*"
            showUploadList={image ? true : false}
            beforeUpload={(file) => {
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                apiNotification.error({
                  message: "Gagal mengunggah gambar",
                  description: "Ukuran gambar tidak boleh lebih dari 2MB",
                });
              }
              return isLt2M;
            }}
            onChange={(info) => {
              if (info.file.status === "done") {
                setImage(info.file.originFileObj);
              }
            }}
            onRemove={(file) => {
              setImage(null);
            }}
          >
            {!image && <Button icon={<TbPlus />}>Upload</Button>}
          </Upload>
        </div>
        <div>
          <Typography.Title level={5}>Judul</Typography.Title>
          <Input.TextArea rows={4} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Typography.Title level={5}>Deskripsi</Typography.Title>
          <Input.TextArea rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <Typography.Title level={5}>Link</Typography.Title>
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
        <div>
          <Typography.Title level={5}>Narahubung</Typography.Title>
          <Input.TextArea rows={2} value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        <Row gutter={8}>
          <Col span={12}>
            <Typography.Title level={5}>Tanggal mulai</Typography.Title>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Tanggal"
              value={dateStart}
              onChange={(date) => setDateStart(date)}
            />
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Tanggal selesai</Typography.Title>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Tanggal"
              value={dateEnd}
              onChange={(date) => setDateEnd(date)}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Typography.Title level={5}>Jam mulai</Typography.Title>
            <TimePicker
              style={{ width: "100%" }}
              placeholder="Jam"
              value={timeStart}
              onChange={(date) => setTimeStart(date)}
            />
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Jam selesai</Typography.Title>
            <TimePicker
              style={{ width: "100%" }}
              placeholder="Jam"
              value={timeEnd}
              onChange={(date) => setTimeEnd(date)}
            />
          </Col>
        </Row>
      </Space>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <Button type="primary" style={{ fontWeight: 600, letterSpacing: "0.8px" }} onClick={submitHandler}>
          SIMPAN
        </Button>
      </div>
    </Drawer>
  );
}
