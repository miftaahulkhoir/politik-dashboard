import { Space, notification } from "antd";
import debounce from "lodash.debounce";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import ReportDataTable from "../components/pagecomponents/reports/ReportDataTable";
import ReportDetailDrawer from "../components/pagecomponents/reports/ReportDetailDrawer";
import ReportSearchBar from "../components/pagecomponents/reports/ReportSearchBar";
import { useFindAllReportCategories, useFindAllReportStatuses, useFindAllReports } from "../utils/services/reports";

export default function Reports() {
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const { reports: fetchReports } = useFindAllReports();
  const [reports, setReports] = useState([]);
  useEffect(() => {
    if (!fetchReports?.length) return;
    setReports(fetchReports);
  }, [fetchReports]);

  const [selectedReport, setSelectedReport] = useState({});

  const { categories } = useFindAllReportCategories();
  const { statuses } = useFindAllReportStatuses();

  // drawer
  const [isReportDetailDrawerOpen, setIsReportDetailDrawerOpen] = useState(false);

  // filter
  const [filterSearch, setFilterSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredReports = useMemo(() => {
    const filteredSearch =
      filterSearch === ""
        ? reports
        : reports.filter((report) => {
            return report.title.toLowerCase().includes(filterSearch.toLowerCase());
          });

    const filteredCategory =
      filterCategory === ""
        ? filteredSearch
        : filteredSearch.filter((report) => report?.category?.id == filterCategory);

    const dateInput = new Date(filterDate);
    const filteredDate =
      filterDate === ""
        ? filteredCategory
        : filteredCategory.filter((report) => {
            const date = new Date(report.created_at);

            return (
              date.getFullYear() === dateInput.getFullYear() &&
              date.getMonth() === dateInput.getMonth() &&
              date.getDate() === dateInput.getDate()
            );
          });

    const filteredStatus =
      filterStatus === ""
        ? filteredDate
        : filteredDate.filter((report) => report?.complaint_status?.id === filterStatus);

    const formatted = filteredStatus.map((report, index) => {
      report.no = index + 1;
      return report;
    });

    return formatted;
  }, [filterSearch, reports, filterCategory, filterDate, filterStatus]);

  const filterSearchHandler = debounce((e) => setFilterSearch(e.target.value), 300);

  const filterCategoryHandler = debounce((value) => setFilterCategory(value), 300);

  const filterDateHandler = debounce((_, valueString) => {
    setFilterDate(valueString);
  }, 300);

  const filterStatusHandler = debounce((value) => setFilterStatus(value), 300);

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

      <Space direction="vertical" size="middle">
        <ReportSearchBar
          filterSearchHandler={filterSearchHandler}
          filterCategoryHandler={filterCategoryHandler}
          filterDateHandler={filterDateHandler}
          filterStatusHandler={filterStatusHandler}
          categories={categories}
          statuses={statuses}
        />

        <ReportDataTable
          data={filteredReports}
          setSelectedReport={setSelectedReport}
          setIsDrawerOpen={setIsReportDetailDrawerOpen}
        />
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
