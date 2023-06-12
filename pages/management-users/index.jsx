import { ACCESS_LIST } from "@/constants/access-list";
import UsersContainer from "@/containers/users";

import { handleAccess } from "@/utils/helpers/handle-access-serverside";

export default function UsersPage(props) {
  return <UsersContainer {...props} />;
}

export async function getServerSideProps(ctx) {
  await handleAccess(ctx, ACCESS_LIST.MANAGEMENT_USER);
  return { props: {} };
}
