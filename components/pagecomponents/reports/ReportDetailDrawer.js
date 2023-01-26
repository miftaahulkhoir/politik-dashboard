import { Drawer, Space } from "antd";

export default function ReportDetailDrawer({ open = true, setOpen, selectedReport }) {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="Detail Pengaduan"
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="400px"
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Space direction="vertical">
        <Space direction="vertical">
          <div>Pengaduan</div>
          <div>Penyalahgunaan logistik</div>
        </Space>

        <div>Detail pengaduan</div>
        <img src={selectedReport?.link_image} style={{ width: "100%" }} alt="gambar pengaduan" />
      </Space>
    </Drawer>
  );
}
