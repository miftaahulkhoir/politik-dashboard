import { Button, Col, DatePicker, Input, Row } from "antd";
import { TbPlus, TbSearch } from "react-icons/tb";

export default function UserSearchBar({ filterSearchHandler, filterDateHandler, addUserHandler }) {
  return (
    <Row justify="space-between">
      <Col span={18}>
        <Row gutter={16}>
          <Col span={8}>
            <Input placeholder="Pencarian" prefix={<TbSearch />} onChange={filterSearchHandler} />
          </Col>
          <Col span={8}>
            <DatePicker style={{ width: "100%" }} placeholder="Tanggal pendaftaran" onChange={filterDateHandler} />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button icon={<TbPlus />} type="primary" onClick={addUserHandler}>
          Tambah Pengguna
        </Button>
      </Col>
    </Row>
  );
}
