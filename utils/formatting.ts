export const getFormattedAuthorName = (string: string) => {
  if (!string) return "unknown";
  const names = string.split(" ");
  if (names.length > 2) return string;
  return `${names[0][0]}. ${names[1]}`;
};
