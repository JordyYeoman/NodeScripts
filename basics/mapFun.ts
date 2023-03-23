const categories = [
  {
    id: "flying-pig",
    name: "pig",
    slug: "flying-pig",
  },
  {
    id: "sinking-ship",
    name: "ship",
    slug: "sinking-ship",
  },
  {
    id: "crazy-dog",
    name: "dog",
    slug: "crazy-dog",
  },
];

const racing = [
  ...categories.flatMap((cat) => {
    return [
      {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        bucket: "domestic",
      },
      {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        bucket: "international",
      },
    ];
  }),
];

console.log("racing", racing);
