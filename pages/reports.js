import { Col, Input, Row } from "antd";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";

import ReportChatContainer from "../components/pagecomponents/reports/ReportChatContainer";
import ReportChatPreviewContainer from "../components/pagecomponents/reports/ReportChatPreviewContainer";
import ReportDetailDrawer from "../components/pagecomponents/reports/ReportDetailDrawer";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState({});

  // drawer
  const [isReportDetailDrawerOpen, setIsReportDetailDrawerOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/complaints")
      .then((res) => setReports(res?.data?.data || []))
      .catch((err) => {});
  }, []);

  return (
    <>
      <Head>
        <title>Pengaduan · Patrons</title>
      </Head>

      <ReportDetailDrawer
        open={isReportDetailDrawerOpen}
        setOpen={setIsReportDetailDrawerOpen}
        selectedReport={selectedReport}
      />

      <Row gutter={32}>
        <Col span={7}>
          <div className="col-12 pdv-3 mb-12">
            <h1>Pengaduan</h1>
          </div>

          <Input placeholder="Pencarian" prefix={<TbSearch />} style={{ marginBottom: "24px" }} />

          <ReportChatPreviewContainer
            reports={reports}
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
          />
        </Col>

        <Col span={17}>
          <ReportChatContainer selectedReport={selectedReport} setDrawerOpen={setIsReportDetailDrawerOpen} />
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
