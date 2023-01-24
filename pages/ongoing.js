import { parseCookies } from "nookies";

export default function OnGoing() {
  return (
    <>
      <div className="col-12 text-center">
        <img src={`${process.env.APP_BASEURL}images/ongoing.png`} width={300} style={{ marginTop: "150px" }} />
        <h5>Ups....halaman ini sedang dalam proses</h5>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  return {
    props: {},
  };
}
