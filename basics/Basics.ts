//
const getArrayFromInput = (l: never) => {
  if (!Array.isArray(l)) return;
  return (l as Array<string>).split(",");
};
