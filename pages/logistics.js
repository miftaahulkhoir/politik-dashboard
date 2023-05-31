import { Space, notification } from "antd";
import debounce from "lodash.debounce";
import Head from "next/head";
import { useMemo, useState } from "react";

import LogisticDataTable from "../components/pagecomponents/logistics/LogisticDataTable";
import LogisticDetailDrawer from "../components/pagecomponents/logistics/LogisticDetailDrawer";
import LogisticSearchBar from "../components/pagecomponents/logistics/LogisticSearchBar";
import { useFindAllLogistics } from "../utils/services/logistics";

export default function Logistics() {
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const { logistics } = useFindAllLogistics();
  const [selectedLogistic, setSelectedLogistic] = useState({});

  // drawer
  const [isLogisticDetailDrawerOpen, setIsLogisticDetailDrawerOpen] = useState(false);

  // filter
  const [filterSearch, setFilterSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredLogistics = useMemo(() => {
    const filteredSearch =
      filterSearch === ""
        ? logistics
        : logistics.filter((logistic) => {
            return (
              logistic?.name?.toLowerCase().includes(filterSearch.toLowerCase()) ||
              logistic?.id?.toLowerCase().includes(filterSearch.toLowerCase())
            );
          });

    const filteredCategory =
      filterCategory === ""
        ? filteredSearch
        : filteredSearch.filter((logistic) => logistic?.category?.id == filterCategory);

    const dateInput = new Date(filterDate);
    const filteredDate =
      filterDate === ""
        ? filteredCategory
        : filteredCategory.filter((logistic) => {
            const date = new Date(logistic.created_at);

            return (
              date.getFullYear() === dateInput.getFullYear() &&
              date.getMonth() === dateInput.getMonth() &&
              date.getDate() === dateInput.getDate()
            );
          });

    const formatted = filteredDate.map((logistic, index) => {
      logistic.no = index + 1;
      return logistic;
    });

    return formatted;
  }, [filterSearch, logistics, filterCategory, filterDate]);

  const filterSearchHandler = debounce((e) => setFilterSearch(e.target.value), 300);

  const filterCategoryHandler = debounce((value) => setFilterCategory(value), 300);

  const filterDateHandler = debounce((_, valueString) => {
    setFilterDate(valueString);
  }, 300);

  return (
    <>
      <Head>
        <title>Logistik · Chakra</title>
      </Head>

      {contextHolderNotification}

      <div className="col-12 pdv-3 mb-12">
        <h1>Logistik</h1>
      </div>

      <LogisticDetailDrawer
        open={isLogisticDetailDrawerOpen}
        setOpen={setIsLogisticDetailDrawerOpen}
        selectedLogistic={selectedLogistic}
        apiNotification={apiNotification}
      />

      <Space direction="vertical" size="middle">
        <LogisticSearchBar
          filterSearchHandler={filterSearchHandler}
          filterCategoryHandler={filterCategoryHandler}
          filterDateHandler={filterDateHandler}
        />

        <LogisticDataTable
          data={filteredLogistics}
          setSelectedLogistic={setSelectedLogistic}
          setIsDetailDrawerOpen={setIsLogisticDetailDrawerOpen}
        />
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
