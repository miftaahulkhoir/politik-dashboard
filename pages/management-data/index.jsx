import { ACCESS_LIST } from "@/constants/access-list";
import ManagementDataContainer from "@/containers/management-data";

import { handleAccess } from "@/utils/helpers/handle-access-serverside";

export default function ManagementDataPage(props) {
  return <ManagementDataContainer {...props} />;
}

export async function getServerSideProps(ctx) {
  await handleAccess(ctx, ACCESS_LIST.MANAGEMENT_DATA);
  return { props: {} };
}
