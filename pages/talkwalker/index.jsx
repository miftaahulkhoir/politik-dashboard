import DashboardLayout from "@/layouts/DashboardLayout";

export default function TalkwalkerPage(props) {
  return (
    <DashboardLayout topBarConfig={{ isShowSearchRegion: true, title: "Analisis Sosial", hideMapButton: true }}>
      <div className="flex flex-col mt-14 ml-[62px] p-10 bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white">
        <h1 className="text-center justify-center items-center flex h-full text-xl">Talkwalker Dashboard</h1>
      </div>
    </DashboardLayout>
  );
}
