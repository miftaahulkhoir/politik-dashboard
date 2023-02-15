import { Button, Card, Col, DatePicker, Modal, Row, Select } from "antd";
import { TbPencil, TbPlus } from "react-icons/tb";

import googleProfileFormatter from "../../../utils/helpers/googleProfileFormatter";

export default function SocmedProfileBar({ email, editProfileHandler, postSocialMediaHandler, addSocialmediaHandler }) {
  const idStyle = {
    fontSize: "1.5rem",
    fontWeight: "500",
  };
  return (
    // <div>
    //   <span style={nameStyle}>{name}: </span>
    //   <span style={idStyle}>{googleProfileFormatter(id)}</span>
    //   <Button type="text" icon={<TbPencil size={24} color={"#7287A5"} />} shape="square" />
    // </div>
    <Row justify="space-between">
      <Col span={14}>
        <Row gutter={8}>
          <Col>
            <span style={idStyle}>{email}</span>
          </Col>
        </Row>
      </Col>
      <Col span={2}>
        <Button icon={<TbPencil />} type="primary" onClick={postSocialMediaHandler}>
          Posting ke Sosial Media
        </Button>
      </Col>
      <Col span={2}>
        <Button icon={<TbPencil />} type="primary" onClick={editProfileHandler}>
          Ubah Akun Ayrshare
        </Button>
      </Col>
      <Col span={2}>
        <Button icon={<TbPlus />} type="primary" onClick={addSocialmediaHandler}>
          Tambah Akun
        </Button>
      </Col>
    </Row>
  );
}
