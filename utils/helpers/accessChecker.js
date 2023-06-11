export default function accessChecker(tags, role) {
  return tags?.map((tag) => role?.includes(tag));
}
