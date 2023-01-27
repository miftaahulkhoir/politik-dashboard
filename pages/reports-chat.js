import { Col, Input, Row } from "antd";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";

import ReportChatContainer from "../components/pagecomponents/reportsChat/ReportChatContainer";
import ReportChatPreviewContainer from "../components/pagecomponents/reportsChat/ReportChatPreviewContainer";
import ReportDetailDrawer from "../components/pagecomponents/reportsChat/ReportDetailDrawer";

// UNUSED PAGE ===================================
export default function ReportsChat() {
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
        <Col span={7} style={{ height: "calc(100vh - 200px)", overflow: "auto", position: "relative" }}>
          <div style={{ position: "sticky", top: "0px", background: "white", zIndex: 99 }}>
            <div className="col-12 pdv-3 mb-12">
              <h1>Pengaduan</h1>
            </div>

            <Input placeholder="Pencarian" prefix={<TbSearch />} style={{ marginBottom: "24px" }} />
          </div>

          <div style={{}}>
            <ReportChatPreviewContainer
              reports={reports}
              selectedReport={selectedReport}
              setSelectedReport={setSelectedReport}
            />
          </div>
        </Col>

        <Col span={17} style={{ height: "calc(100vh - 200px)", overflow: "auto" }}>
          <ReportChatContainer selectedReport={selectedReport} setDrawerOpen={setIsReportDetailDrawerOpen} />
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  let baseURL = "";
 if (req.headers.referer.includes(process.env.APP_BASEURL_DEFAULT)) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if (req.headers.referer.includes(process.env.APP_BASEURL_PATRON)) {
    baseURL = process.env.APP_BASEURL_PATRON;
  }

  return { props: {} };
}
