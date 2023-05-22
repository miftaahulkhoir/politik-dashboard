import DashboardLayout from "@/layouts/DashboardLayout";

export default function IssuesPage(props) {
  return (
    <DashboardLayout topBarConfig={{ isShowSearchRegion: true, title: "Manajemen Data", hideMapButton: true }}>
      Manajemen Data page
    </DashboardLayout>
  );
}
