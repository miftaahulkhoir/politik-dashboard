import DashboardLayout from "@/layouts/DashboardLayout";

export default function IssuePage() {
  return (
    <DashboardLayout
      title="Manajemen Isu · Cakra"
      topBarConfig={{
        isShowSearchRegion: true,
        title: "Manajemen Isu",
        hideMapButton: true,
      }}
    >
      <div className="flex flex-col mt-14 ml-[62px] p-10 bg-[#222222] h-[calc(100vh-134px)] overflow-auto text-white">
        <div className="w-1/3 bg-blue w-full h-full">
          <h1>Manajemen isu page</h1>
        </div>
        <div className="w-2/3 bg-red"></div>
      </div>
    </DashboardLayout>
  );
}
