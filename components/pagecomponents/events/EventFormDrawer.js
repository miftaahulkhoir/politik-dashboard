import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space, TimePicker, Typography, Upload } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";

import { createEvent, updateEvent } from "../../../utils/services/events";

dayjs.extend(utc);

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
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        title: selectedEvent?.event_name,
        image: null,
        description: selectedEvent?.description,
        link: selectedEvent?.link,
        contact: selectedEvent?.contact_person,
        dateStart: dayjs.utc(selectedEvent?.date_start),
        dateEnd: dayjs.utc(selectedEvent?.date_end),
        timeStart: dayjs.utc(selectedEvent?.date_start),
        timeEnd: dayjs.utc(selectedEvent?.date_end),
      });
    } else {
      form.setFieldsValue({
        title: "",
        image: null,
        description: "",
        link: "",
        contact: "",
        dateStart: dayjs(),
        dateEnd: dayjs(),
        timeStart: dayjs(),
        timeEnd: dayjs(),
      });
    }
  }, [isEdit, form, selectedEvent]);

  const resetForm = () => {
    setImage(null);
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      resetForm();
      setIsEdit(false);
    }, 200);
  };

  const createEventHandler = async (formData, eventTitle) => {
    try {
      const res = await createEvent(formData);
      const newEvent = res?.data?.data;
      if (newEvent) {
        setEvents((prevEvents) => [newEvent, ...prevEvents]);
      }

      apiNotification.success({
        message: "Berhasil",
        description: `Kegiatan ${eventTitle} telah ditambahkan`,
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

  const editEventHandler = async (id, formData, eventTitle) => {
    try {
      const res = await updateEvent(id, formData);
      const changedEvent = res?.data?.data;
      if (changedEvent) {
        setEvents((prev) => prev.map((v) => (v.id === id ? changedEvent : v)));
      }

      apiNotification.success({
        message: "Berhasil",
        description: `Perubahan kegiatan ${eventTitle} telah disimpan`,
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

  const submitHandler = async (formValues) => {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "HH:mm:ss";
    const { title, description, link, dateStart, dateEnd, timeStart, timeEnd, contact, image } = formValues;

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
    if (image?.file?.status === "done") {
      formData.append("images", image.file.originFileObj);
    }

    if (isEdit) {
      await editEventHandler(selectedEvent.id, formData, title);
    } else {
      await createEventHandler(formData, title);
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
      <Form form={form} onFinish={(formValues) => submitHandler(formValues)}>
        <div>
          <Typography.Title level={5}>Foto</Typography.Title>
          <Form.Item name="image" rules={[{ required: !isEdit, message: "Foto harus di input" }]}>
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
              onRemove={(file) => {
                setImage(null);
              }}
              onChange={(info) => {
                if (info.file.status === "done") {
                  setImage(info.file.originFileObj);
                }
              }}
            >
              {!image && <Button icon={<TbPlus />}>Upload</Button>}
            </Upload>
          </Form.Item>
        </div>
        <div>
          <Typography.Title level={5}>Judul</Typography.Title>
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Judul harus di input" },
              { max: 100, message: "Judul tidak boleh lebih dari 100 karakter" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>
        <div>
          <Typography.Title level={5}>Deskripsi</Typography.Title>
          <Form.Item name="description" rules={[{ required: true, message: "Deskripsi harus di input" }]}>
            <Input.TextArea rows={6} />
          </Form.Item>
        </div>
        <div>
          <Typography.Title level={5}>Link</Typography.Title>
          <Form.Item name="link">
            <Input />
          </Form.Item>
        </div>
        <div>
          <Typography.Title level={5}>Narahubung</Typography.Title>
          <Form.Item
            name="contact"
            rules={[
              { required: true, message: "Narahubung harus di input" },
              { max: 100, message: "Narahubung tidak boleh lebih dari 100 karakter" },
            ]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>
        <Row gutter={8}>
          <Col span={12}>
            <Typography.Title level={5}>Tanggal mulai</Typography.Title>
            <Form.Item name="dateStart">
              <DatePicker style={{ width: "100%" }} placeholder="Tanggal" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Tanggal selesai</Typography.Title>
            <Form.Item name="dateEnd">
              <DatePicker style={{ width: "100%" }} placeholder="Tanggal" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Typography.Title level={5}>Jam mulai</Typography.Title>
            <Form.Item name="timeStart">
              <TimePicker style={{ width: "100%" }} placeholder="Jam" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Jam selesai</Typography.Title>
            <Form.Item name="timeEnd">
              <TimePicker style={{ width: "100%" }} placeholder="Jam" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: "16px" }}>
          <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Button type="primary" style={{ fontWeight: 600, letterSpacing: "0.8px" }} htmlType="submit">
              SIMPAN
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
