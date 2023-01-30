import { notification } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";

import ReportDataTable from "../components/pagecomponents/reports/ReportDataTable";
import ReportDetailDrawer from "../components/pagecomponents/reports/ReportDetailDrawer";
import { useFindAllReports } from "../utils/services/reports";

export default function Reports() {
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const { reports: fetchReports } = useFindAllReports();
  const [reports, setReports] = useState([]);
  useEffect(() => {
    setReports(fetchReports);
  }, [fetchReports]);

  const [selectedReport, setSelectedReport] = useState({});

  // drawer
  const [isReportDetailDrawerOpen, setIsReportDetailDrawerOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Pengaduan · Patrons</title>
      </Head>

      {contextHolderNotification}

      <div className="col-12 pdv-3 mb-12">
        <h1>Pengaduan</h1>
      </div>

      <ReportDetailDrawer
        open={isReportDetailDrawerOpen}
        setOpen={setIsReportDetailDrawerOpen}
        selectedReport={selectedReport}
        setReports={setReports}
        apiNotification={apiNotification}
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
  return { props: {} };
}
