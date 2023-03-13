import DataTable from "react-data-table-component";

export default function CustomSentimentDataTable(props) {
  // const topics = (data) => <pre>{JSON.stringify(data.data.keywords, null, 2)}</pre>;
  const topics = (data) => {
    data.data.keywords.forEach((item, i) => {
      if (item.name === "rajiv") {
        data.data.keywords[i].name = "anies";
      }
    });

    return (
      <DataTable
        columns={props.topicColumn}
        data={data.data.keywords}
        customStyles={{
          rows: {
            style: {
              padding: "8px 0",
              fontSize: "14px",
            },
          },
          headCells: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              color: "#7287A5",
              backgroundColor: "#efefef",
            },
          },
        }}
      />
    );
  };

  return (
    <DataTable
      pagination
      expandableRows
      expandableRowsComponent={topics}
      customStyles={{
        rows: {
          style: {
            padding: "8px 0",
            fontSize: "14px",
          },
        },
        headCells: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            color: "#7287A5",
          },
        },
      }}
      {...props}
    />
  );
}
