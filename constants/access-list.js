export const ACCESS_LIST = {
  MONITORING: "monitoring",
  SURVEY: "survey",
  MANAGEMENT_ACCESS: "access-management",
  MANAGEMENT_USER: "user-management",
  MANAGEMENT_DATA: "data-management",
  MANAGEMENT_ISSUE: "issue-management",
  TALKWALKER: "talkwalker",
};

export const ACCESS_LIST_WITH_PATH = [
  { accessTag: ACCESS_LIST.MONITORING, path: "/" },
  { accessTag: ACCESS_LIST.SURVEY, path: "/survey" },
  { accessTag: ACCESS_LIST.MANAGEMENT_ACCESS, path: "/management-access" },
  { accessTag: ACCESS_LIST.MANAGEMENT_USER, path: "/management-users" },
  { accessTag: ACCESS_LIST.MANAGEMENT_DATA, path: "/management-data" },
  { accessTag: ACCESS_LIST.TALKWALKER, path: "/talkwalker" },
  { accessTag: ACCESS_LIST.MANAGEMENT_ISSUE, path: "/management-issue" },
];
