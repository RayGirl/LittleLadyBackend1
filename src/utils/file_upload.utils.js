const multer = require("multer");
const path = require("path");

const upload_path = path.resolve("public/", "media/uploads");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, upload_path)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = crypto.randomUUID();
      const file_extension = path.extname(file.originalname);
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file_extension);
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;