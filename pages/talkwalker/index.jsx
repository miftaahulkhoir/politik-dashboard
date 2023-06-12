import TalkwalkerContainer from "@/containers/talkwalker";

const TalkwalkerPage = (props) => {
  return <TalkwalkerContainer {...props} />;
};

export async function getServerSideProps(ctx) {
  return { props: {} };
}

export default TalkwalkerPage;
