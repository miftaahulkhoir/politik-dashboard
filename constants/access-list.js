export const ACCESS_LIST = {
  MONITORING: "monitoring",
  SURVEY: "survey",
  MANAGEMENT_ACCESS: "access-management",
  MANAGEMENT_CHANGE_ACCESS: "change-access-management",
  MANAGEMENT_USER: "user-management",
  ADD_USER: "user-add",
  EDIT_USER: "user-edit",
  REMOVE_USER: "user-remove",
  CHANGE_PASSWORD_USER: "user-change-password",
  MANAGEMENT_DATA: "data-management",
  MANAGEMENT_UPLOAD_DATA: "upload-data-management",
  MANAGEMENT_DOWNLOAD_DATA: "download-data-management",
  MANAGEMENT_DELETE_DATA: "delete-data-management",
  MANAGEMENT_ISSUE: "issue-management",
  MANAGEMENT_ADD_ISSUE: "add-issue",
  MANAGEMENT_ADD_SUB_ISSUE: "add-sub-issue",
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
