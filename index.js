


require("dotenv").config();
const multer = require("multer");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const File = require("./model/file");

const app = express();
const upload = multer({ dest: "uploads" });

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.resolve("./views"));

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
  });

  // mongoose.connect("mongodb://127.0.0.1:27017/filedb")
  // .then(() => {
  //   console.log("mongodb connected");
  // })
  // .catch(err => {
  //   console.error("Failed to connect to MongoDB:", err);
  // });


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileData = {
      path: req.file.path,
      originalName: req.file.originalname,
    };
    if (req.body.password != null && req.body.password !== "") {
      fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create(fileData);
    res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.route("/file/:id")
  .get(handleDownload)
  .post(handleDownload);

async function handleDownload(req, res) {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found");
    }

    if (file.password != null) {
      if (req.body.password == null) {
        return res.render("password", { originalName: file.originalName });
      }

      if (!(await bcrypt.compare(req.body.password, file.password))) {
        return res.render("password", { error: true, originalName: file.originalName });
      }
    }

    file.downloadCount++;
    await file.save();
    res.download(file.path, file.originalName);
  } catch (error) {
    console.error("Error during file download:", error);
    res.status(500).send("Internal Server Error");
  }
}

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server started at ${PORT}`);
});
