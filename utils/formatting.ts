export const getFormattedAuthorName = (string: string) => {
  const names = string.split(" ");
  if (names.length === 1) return string;
  const formattedName = names.map((part, i) =>
    i === names.length - 1 || !/\p{Lu}/u.test(part)
      ? part
      : `${part.slice(0, 1)}.`
  );
  return formattedName.join(" ");
};

export const getAuthorString = (name: string) => {
  if (!name) return `\n(unknown author)`;
  return `\n(Author ${getFormattedAuthorName(name)})`;
};
