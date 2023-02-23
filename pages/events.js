import { Space, notification } from "antd";
import debounce from "lodash.debounce";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";

import EventDataTable from "../components/pagecomponents/events/EventDataTable";
import EventDetailDrawer from "../components/pagecomponents/events/EventDetailDrawer";
import EventFormDrawer from "../components/pagecomponents/events/EventFormDrawer";
import EventSearchBar from "../components/pagecomponents/events/EventSearchBar";
import { useFindAllEvents } from "../utils/services/events";

export default function Events() {
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const { events: fetchEvents } = useFindAllEvents();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setEvents(fetchEvents);
  }, [fetchEvents]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  // drawers
  const [isAddFormDrawerOpen, setIsFormDrawerOpen] = useState(false);
  const [isEventDetailDrawerOpen, setIsEventDetailDrawerOpen] = useState(false);

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

      <EventFormDrawer open={isAddFormDrawerOpen} setOpen={setIsFormDrawerOpen} apiNotification={apiNotification} />

      <EventDetailDrawer
        open={isEventDetailDrawerOpen}
        setOpen={setIsEventDetailDrawerOpen}
        apiNotification={apiNotification}
        selectedEvent={selectedEvent}
      />

      <Space direction="vertical">
        <EventSearchBar
          filterSearchHandler={filterSearchHandler}
          filterDateHandler={filterDateHandler}
          addEventHandler={() => setIsFormDrawerOpen(true)}
        />

        <EventDataTable
          data={filteredEvents}
          apiNotification={apiNotification}
          setSelectedEvent={setSelectedEvent}
          setDetailDrawerOpen={setIsEventDetailDrawerOpen}
          events={events}
          setEvents={setEvents}
        />
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
