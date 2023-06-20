import { Viewer, Worker } from "@react-pdf-viewer/core";

//pdf plugins
import { rotatePlugin } from "@react-pdf-viewer/rotate";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

//pdf styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function FilePreview({ selectedFile }) {
  const zoomPluginInstance = zoomPlugin();
  const rotatePluginInstance = rotatePlugin();

  const { RotateBackwardButton, RotateForwardButton } = rotatePluginInstance;
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.js">
        <div
          className="rpv-core__viewer"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: "#eeeeee",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              padding: "8px",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <RotateForwardButton />
            <RotateBackwardButton />
            <ZoomOutButton />
            <ZoomPopover />
            <ZoomInButton />
          </div>
          <div
            style={{
              flex: 1,
              overflow: "hidden",
            }}
          >
            <Viewer
              theme={{ theme: "dark" }}
              fileUrl={selectedFile?.file || "null"}
              plugins={[zoomPluginInstance, rotatePluginInstance]}
            />
          </div>
        </div>
      </Worker>
    </div>
  );
}
