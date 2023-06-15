import DashboardLayout from "@/layouts/DashboardLayout";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import { Table } from "antd";

export default function TalkwalkerContainer({ profile }) {
  const bookmarkPluginInstance = bookmarkPlugin();
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <DashboardLayout profile={profile} topBarConfig={{ isShowSearchRegion: true, title: "Analisis Sosial" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.js">
        <div>
          <Viewer theme={{ theme: "dark" }} fileUrl="/sample.pdf" plugins={[bookmarkPluginInstance]} />
        </div>
      </Worker>
      {/* <div className="flex col w-full h-full border-t border-t-neutral-500">
        <div className="w-1/3 overflow-auto flex flex-col">
          <Table />
        </div>
        <div className="w-2/3 overflow-auto flex flex-col">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.js">
            <div>
              <Viewer theme={{ theme: "dark" }} fileUrl="/sample.pdf" plugins={[bookmarkPluginInstance]} />
            </div>
          </Worker>
        </div>
      </div> */}
    </DashboardLayout>
  );
}
