import { Button, DatePicker, Drawer, Input, Space, TimePicker, Typography, Upload } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";

function EventAddForm({ open, setOpen, isSM }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [desctiption, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // date time -> 2023-02-21 05:12:05

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title={"Tambah Kegaitan"}
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
          <Typography.Title level={5}>Judul</Typography.Title>
          <Input.TextArea rows={4} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Typography.Title level={5}>Foto</Typography.Title>
          <Upload
            listType="picture"
            maxCount={1}
            accept="image/*"
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
          <Typography.Title level={5}>Deskripsi</Typography.Title>
          <Input.TextArea rows={6} value={desctiption} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <Typography.Title level={5}>Link</Typography.Title>
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
        <div>
          <Typography.Title level={5}>Narahubung</Typography.Title>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        <div>
          <Typography.Title level={5}>Waktu</Typography.Title>
          <div style={{ display: "flex", columnGap: "8px" }}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Tanggal"
              onChange={(_, dateString) => setDate(dateString)}
            />
            <TimePicker style={{ width: "100%" }} placeholder="Jam" onChange={(_, dateString) => setTime(dateString)} />
          </div>
        </div>
      </Space>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <Button type="primary" style={{ fontWeight: 600, letterSpacing: "0.8px" }}>
          SIMPAN
        </Button>
      </div>
    </Drawer>
  );
}

export default EventAddForm;
