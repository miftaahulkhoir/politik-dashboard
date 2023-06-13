import { ACCESS_LIST } from "@/constants/access-list";
import TalkwalkerContainer from "@/containers/talkwalker";
import { handleAccess } from "@/utils/helpers/handle-access-serverside";

const TalkwalkerPage = (props) => {
  return <TalkwalkerContainer {...props} />;
};

export async function getServerSideProps(ctx) {
  await handleAccess(ctx, ACCESS_LIST.TALKWALKER);
  return { props: {} };
}

export default TalkwalkerPage;
