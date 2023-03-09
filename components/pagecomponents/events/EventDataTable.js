import { Button, Card, Col, Modal, Row, Tooltip } from "antd";
import { useCallback, useMemo } from "react";
import { TbEye, TbPencil, TbTrashX } from "react-icons/tb";

import formateDateTime from "../../../utils/helpers/formatDateTime";
import { deleteEvent } from "../../../utils/services/events";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";
import LimitedText from "../../elements/typography/LimitedText";

export default function EventDataTable({
  data,
  apiNotification,
  setSelectedEvent,
  setDetailDrawerOpen,
  setIsFormDrawerOpen,
  setIsFormDrawerEdit,
  events,
  setEvents,
}) {
  const openDetailHandler = useCallback(
    (row) => {
      setSelectedEvent(row);
      setDetailDrawerOpen(true);
    },
    [setSelectedEvent, setDetailDrawerOpen],
  );

  const editDetailHandler = useCallback(
    (row) => {
      setSelectedEvent(row);
      setIsFormDrawerOpen(true);
      setIsFormDrawerEdit(true);
    },
    [setSelectedEvent, setIsFormDrawerOpen, setIsFormDrawerEdit],
  );

  const deleteHandler = useCallback(
    (row) => {
      Modal.confirm({
        title: "Peringatan",
        content: `Apakah kamu yakin ingin menghapus ${row.event_name}?`,
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        onOk: function () {
          deleteEvent(row?.id)
            .then(() => {
              const newEvents = events.filter((e) => e.id !== row?.id);
              setEvents([...newEvents]);

              apiNotification.success({
                message: "Sukses",
                description: `Kegiatan ${row?.name} berhasil dihapus`,
              });
            })
            .catch((err) => {
              apiNotification.error({
                message: "Gagal",
                description: "Terjadi kesalahan",
              });
              console.error(err);
            });
        },
      });
    },
    [apiNotification, events, setEvents],
  );

  const columns = useMemo(() => {
    return [
      {
        name: "No",
        selector: (row) => row.no,
        width: "80px",
        center: true,
        sortable: true,
      },
      {
        name: "Judul",
        selector: (row) => (row?.event_name ? <LimitedText text={row.event_name} /> : "-"),
        minWidth: "400px",
        maxWidth: "500px",
        sortable: true,
        grow: 1000,
      },
      {
        name: "Narahubung",
        selector: (row) => row?.contact_person || "-",
        width: "350px",
        sortable: true,
      },
      // {
      //   name: "Link",
      //   selector: (row) =>
      //     (
      //       <a href={row?.link} target="_blank" rel="noreferrer">
      //         {row?.link}
      //       </a>
      //     ) || "-",
      //   width: "300px",
      //   sortable: true,
      // },
      {
        name: "Tanggal Mulai",
        selector: (row) =>
          formateDateTime(row?.date_start, {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        sortable: true,
        sortFunction: (a, b) => {
          return new Date(a?.date_start).getTime() - new Date(b?.date_start).getTime();
        },
        width: "180px",
      },
      {
        name: "Tanggal Selesai",
        selector: (row) =>
          formateDateTime(row?.date_end, {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        sortable: true,
        sortFunction: (a, b) => {
          return new Date(a?.date_end).getTime() - new Date(b?.date_end).getTime();
        },
        width: "180px",
      },
      {
        name: "",
        compact: true,
        minWidth: "0px",
        grow: 1,
      },
      {
        name: "Aksi",
        selector: (row) => {
          return (
            <div className="d-flex gap-2">
              <Tooltip title="Lihat kegiatan">
                <Button
                  type="text"
                  icon={<TbEye size={20} color="#016CEE" />}
                  shape="circle"
                  onClick={() => openDetailHandler(row)}
                />
              </Tooltip>
              <Tooltip title="Edit kegiatan">
                <Button
                  type="text"
                  icon={<TbPencil size={20} color="#7287A5" />}
                  shape="circle"
                  onClick={() => editDetailHandler(row)}
                />
              </Tooltip>
              <Tooltip title="Hapus kegiatan">
                <Button
                  type="text"
                  icon={<TbTrashX size={20} color="#B12E2E" />}
                  shape="circle"
                  onClick={() => deleteHandler(row)}
                />
              </Tooltip>
            </div>
          );
        },
        width: "150px",
        center: true,
      },
    ];
  }, [deleteHandler, editDetailHandler, openDetailHandler]);

  return (
    <Row justify="end">
      <Col span={24}>
        <Card bodyStyle={{ padding: "0px" }} style={{ overflow: "hidden" }}>
          <CustomDataTable columns={columns} data={data} pagination />
        </Card>
      </Col>
    </Row>
  );
}
