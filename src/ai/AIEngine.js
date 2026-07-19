const geminiProvider = require("./providers/GeminiProvider");
const PromptTemplates = require("./PromptTemplates");
const pdfExtractor = require("./extractors/PdfExtractor");
const AIResponseParser = require("./parsers/AIResponseParser");

class AIEngine {

    async generate(prompt) {

        return await geminiProvider.generate(prompt);

    }

    async analyzeResume(filePath) {

        // Step 1: Extract resume text
        const resumeText = await pdfExtractor.extract(filePath);

        // Step 2: Build prompt
        const prompt =
            PromptTemplates.resumeAnalysis(resumeText);

        // Step 3: Generate AI response
        const response =
            await geminiProvider.generate(prompt);

        // Step 4: Parse AI response
        const analysis = AIResponseParser.parse(response);
        
        // Step 5: Return everything
        return {

            resumeText,
            analysis

        };

    }

}

module.exports = new AIEngine();