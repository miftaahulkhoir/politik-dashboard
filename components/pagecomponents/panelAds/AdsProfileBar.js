import { Button, Card, Col, DatePicker, Modal, Row, Select } from "antd";
import { TbPencil, TbTrashX } from "react-icons/tb";

import googleProfileFormatter from "../../../utils/helpers/googleProfileFormatter";

export default function AdsProfileBar({ id, name, editProfileHandler }) {
  const idStyle = {
    fontSize: "1.5rem",
  };
  const nameStyle = {
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
      <Col span={18}>
        <Row gutter={8}>
          <Col>
            <span style={nameStyle}>{name}: </span>
          </Col>
          <Col span={8}>
            <span style={idStyle}>{googleProfileFormatter(id)}</span>
          </Col>
        </Row>
      </Col>
      <Col>
        <Button icon={<TbPencil />} type="primary" onClick={editProfileHandler}>
          Ubah Akun Google Ads
        </Button>
      </Col>
    </Row>
  );
}
