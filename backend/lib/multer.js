// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads"); // Corrected path
//   },
//   filename: function (req, file, cb) {
//     const extension = file.originalname.split(".").pop();
//     const baseName = file.originalname
//       .split(".")
//       .slice(0, -1)
//       .join(".")
//       .replace(/\s+/g, "-");
//     cb(null, `${baseName}-${Date.now()}.${extension}`);
//   },
// });

// const uploadFile = multer({ storage: storage });

// export default uploadFile;
