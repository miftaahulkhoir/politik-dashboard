import { Col, Input, Row } from "antd";
import Head from "next/head";
import { TbSearch } from "react-icons/tb";

import ReportChatContainer from "../components/pagecomponents/reports/ReportChatContainer";
import ReportChatPreviewContainer from "../components/pagecomponents/reports/ReportChatPreviewContainer";

export default function Reports() {
  return (
    <>
      <Head>
        <title>Pengaduan · Patrons</title>
      </Head>

      <Row gutter={32}>
        <Col span={7}>
          <div className="col-12 pdv-3 mb-12">
            <h1>Pengaduan</h1>
          </div>

          <Input placeholder="Pencarian" prefix={<TbSearch />} style={{ marginBottom: "24px" }} />

          <ReportChatPreviewContainer />
        </Col>

        <Col span={17}>
          <ReportChatContainer />
        </Col>
      </Row>
    </>
  );
}
