const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { wordToPdf } = require("node-docto");
const multer = require("multer");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fieldSize: 2000 * 1024 * 1024,
        // fileSize: 2 gig
        fileSize: 2000 * 1024 * 1024,
    }
}));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get("/convert", async (req, res) => {
    console.log(req.query.path);
    try {
        // check if the file is a word file
        if (!req.query.path.endsWith(".docx") && !req.query.path.endsWith(".doc")) {
            res.status(400).send("The file is not a Word file.");
            return;
        }


        const inputPath = req.query.path;
        const outputPath = inputPath.replace(/\.[^.]+$/, ".pdf");

        // Using node-docto
        await wordToPdf(inputPath, outputPath, {
        }).then((stdout) => {
            console.log(stdout);
            // res.download(outputPath, () => {
            //     // fs.unlinkSync(inputPath);
            //     // fs.unlinkSync(outputPath);
            // });

            res.status(200).send(outputPath);
        }).catch((stderr) => {
            console.error(stderr);
            res.status(500).send("An error occurred while converting the Word file to PDF.");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while converting the Word file to PDF.");
    }


});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
