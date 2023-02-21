import { Space, notification } from "antd";
import debounce from "lodash.debounce";
import Head from "next/head";
import React, { useMemo, useState } from "react";

import EventAddForm from "../components/pagecomponents/events/EventAddForm";
import EventDataTable from "../components/pagecomponents/events/EventDataTable";
import EventSearchBar from "../components/pagecomponents/events/EventSearchBar";
import { useFindAllEvents } from "../utils/services/events";

export default function Events() {
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const { events } = useFindAllEvents();

  // drawers
  const [isAddFormDrawerOpen, setIsFormDrawerOpen] = useState(false);

  // filters
  const [filterSearch, setFilterSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredEvents = useMemo(() => {
    const filteredSearch =
      filterSearch === ""
        ? events
        : events.filter((event) => {
            return (
              event?.event_name?.toLowerCase().includes(filterSearch.toLowerCase()) ||
              event?.category?.toLowerCase().includes(filterSearch.toLowerCase()) ||
              event?.desctiption?.toLowerCase().includes(filterSearch.toLowerCase())
            );
          });

    const dateInput = new Date(filterDate);
    const filteredDate =
      filterDate === ""
        ? filteredSearch
        : filteredSearch.filter((event) => {
            const date = new Date(event.created_at);

            return (
              date.getFullYear() === dateInput.getFullYear() &&
              date.getMonth() === dateInput.getMonth() &&
              date.getDate() === dateInput.getDate()
            );
          });

    return filteredDate.map((event, i) => ({ ...event, no: i + 1 }));
  }, [events, filterSearch, filterDate]);

  const filterSearchHandler = debounce((e) => setFilterSearch(e.target.value), 300);

  const filterDateHandler = debounce((_, valueString) => {
    setFilterDate(valueString);
  }, 300);

  return (
    <>
      <Head>
        <title>Manajemen Kegiatan · Patrons</title>
      </Head>

      {contextHolderNotification}

      <div className="col-12 pdv-3 mb-12">
        <h1>Manajemen Kegiatan</h1>
      </div>

      <EventAddForm open={isAddFormDrawerOpen} setOpen={setIsFormDrawerOpen} />

      <Space direction="vertical">
        <EventSearchBar
          filterSearchHandler={filterSearchHandler}
          filterDateHandler={filterDateHandler}
          addEventHandler={() => setIsFormDrawerOpen(true)}
        />

        <EventDataTable data={filteredEvents} apiNotification={apiNotification} />
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
