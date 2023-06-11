import axios from "axios";
import { parseCookies } from "nookies";

async function getProfileServerSide(ctx) {
  let baseURL = "";
  if (`https://${ctx.req?.headers?.host}/` === process.env.APP_BASEURL_DEFAULT) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if (`https://${ctx.req?.headers?.host}/` === process.env.APP_BASEURL_PATRON) {
    baseURL = process.env.APP_BASEURL_PATRON;
  } else {
    baseURL = process.env.APP_BASEURL_LOCAL;
  }

  const { token } = parseCookies(ctx);
  const res = await axios.get(`${baseURL}/api/profile/`, {
    withCredentials: true,
    headers: { Cookie: `token=${token}` },
  });

  return {
    profile: res?.data?.data,
  };
}

export default getProfileServerSide;
