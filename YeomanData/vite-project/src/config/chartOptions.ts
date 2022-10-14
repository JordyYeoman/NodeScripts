export const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0.95,
    },
    line: {
      borderWidth: 0.9,
    },
    tension: 0,
  },
  plugins: {
    legend: {
      position: "top" as const,
      align: "left",
    },
    title: {
      display: false,
      text: "",
    },
  },
};
