export const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype == "text/*") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
