const c = (t = 10) => {
  console.log("[DEBUG] t", t);
};

const x_val = (val: number) => {
  c();
  c(undefined);
  c(2);
};

x_val(0);
