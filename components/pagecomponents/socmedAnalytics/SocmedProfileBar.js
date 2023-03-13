import { Button, Card, Col, DatePicker, Modal, Row, Select } from "antd";
import { TbPencil, TbPlus } from "react-icons/tb";

import googleProfileFormatter from "../../../utils/helpers/googleProfileFormatter";

export default function SocmedProfileBar({ email, editProfileHandler, postSocialMediaHandler, addSocialmediaHandler }) {
  const idStyle = {
    fontSize: "1.5rem",
    fontWeight: "500",
  };
  const finalEmail = email.split("@");

  return (
    // <div>
    //   <span style={nameStyle}>{name}: </span>
    //   <span style={idStyle}>{googleProfileFormatter(id)}</span>
    //   <Button type="text" icon={<TbPencil size={24} color={"#7287A5"} />} shape="square" />
    // </div>
    <Row justify="space-between">
      <Col span={16}>
        <Row gutter={8}>
          <Col>
            <span style={idStyle}>{finalEmail[0]}</span>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row gutter={12} justify={"space-between"}>
          <Col>
            <Row gutter={8} justify={"center"}>
              <Button icon={<TbPencil />} type="primary" onClick={postSocialMediaHandler}>
                Post
              </Button>
            </Row>
          </Col>
          <Col>
            <Row gutter={8} justify={"space-between"}>
              <Button icon={<TbPencil />} type="primary" onClick={editProfileHandler}>
                Ubah Akun Ayrshare
              </Button>
            </Row>
          </Col>
          <Col>
            <Row gutter={8} justify={"center"}>
              <Button icon={<TbPlus />} type="primary" onClick={addSocialmediaHandler}>
                Tambah Akun
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
