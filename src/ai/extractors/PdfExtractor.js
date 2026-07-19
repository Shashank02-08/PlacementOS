const pdf = require("pdf-parse");
const fs = require("fs/promises");


class PdfExtractor {

    async extract(filePath) {

        console.log("Extracting:", filePath);

        const buffer = await fs.readFile(filePath);

        console.log("Buffer loaded");

        const data = await pdf(buffer);

        console.log("PDF parsed");

        return data.text;
    }

}

module.exports = new PdfExtractor();