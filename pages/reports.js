import { Col, Input, Row } from "antd";
import Head from "next/head";

export default function Reports() {
  return (
    <>
      <Head>
        <title>Pengaduan · Patrons</title>
      </Head>

      <Row gutter={32}>
        <Col span={6}>
          <div className="col-12 pdv-3 mb-12">
            <h1>Pengaduan</h1>
          </div>

          <Input placeholder="Pencarian" />
        </Col>

        <Col span={18}>ppp</Col>
      </Row>
    </>
  );
}
