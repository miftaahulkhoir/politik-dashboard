export const ACCESS_LIST = {
  MONITORING: "monitoring",
  SURVEY: "survey",
  MANAGEMENT_ACCESS: "access-management",
  MANAGEMENT_USER: "user-management",
  MANAGEMENT_DATA: "data-management",
};

export const ACCESS_LIST_WITH_PATH = [
  { accessTag: ACCESS_LIST.MONITORING, path: "/" },
  { accessTag: ACCESS_LIST.SURVEY, path: "/survey" },
  { accessTag: ACCESS_LIST.MANAGEMENT_ACCESS, path: "/management-access" },
  { accessTag: ACCESS_LIST.MANAGEMENT_USER, path: "/users" },
  { accessTag: ACCESS_LIST.MANAGEMENT_DATA, path: "/management-data" },
];
