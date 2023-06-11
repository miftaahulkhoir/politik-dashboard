import { ACCESS_LIST_WITH_PATH } from "@/constants/access-list";
import { redirectUser } from "../services/auth";
import getProfileServerSide from "../services/get-profile-serverside";
import accessChecker from "./accessChecker";

export async function handleAccess(ctx, tag) {
  const { profile } = await getProfileServerSide(ctx);
  const [canAccessManagement] = accessChecker([tag], profile?.accesses || []);

  if (!canAccessManagement) {
    const accessPath = ACCESS_LIST_WITH_PATH?.find((access) => profile?.accesses?.includes(access?.accessTag));

    redirectUser(ctx, accessPath?.path || "/404");
  }
}
