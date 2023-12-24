export const competitionIdsMap = new Map<string, string>([
  ["afl", "11897406"],
  ["nba", "10547864"],
]);

export const competitionTypeIds = [
  competitionIdsMap.get("nba") ?? "",
  competitionIdsMap.get("afl") ?? "",
];
