const path = require("path");
const multer = require("multer");
const upload = multer({
  fileFilter: (req, file, callback) => {
    const filetypes = /csv/;
    const mimetypes = /text\/csv|application\/vnd\.ms-excel/;

    const mimetype = mimetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return callback(null, true);
    }

    callback(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  }
});

module.exports = upload;
