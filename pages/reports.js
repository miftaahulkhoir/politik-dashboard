import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

import ReportDataTable from "../components/pagecomponents/reports/ReportDataTable";
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

      <div className="col-12 pdv-3 mb-12">
        <h1>Pengaduan</h1>
      </div>

      <ReportDetailDrawer
        open={isReportDetailDrawerOpen}
        setOpen={setIsReportDetailDrawerOpen}
        selectedReport={selectedReport}
        setReports={setReports}
      />

      <ReportDataTable
        data={reports}
        setSelectedReport={setSelectedReport}
        setIsDrawerOpen={setIsReportDetailDrawerOpen}
      />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  let baseURL = "";
  if (`https://${req.headers.host}/` === process.env.APP_BASEURL_DEFAULT) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if (`https://${req.headers.host}/` === process.env.APP_BASEURL_PATRON) {
    baseURL = process.env.APP_BASEURL_PATRON;
  } else {
    baseURL = process.env.APP_BASEURL_LOCAL;
  }

  return { props: {} };
}
