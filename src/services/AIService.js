const geminiProvider = require("./providers/GeminiProvider");
const PromptTemplates = require("./PromptTemplates");

class AIService {

    async generate(prompt) {
        return await geminiProvider.generate(prompt);
    }

    async testResumeAnalysis() {

        const sampleResume = `
Name: Shashank Garg

Skills:
Java
Node.js
Express.js
MongoDB
React
Git

Projects:
PlacementOS
SmartIntern AI

Education:
B.Tech Computer Science

Looking for Software Engineering Internship.
`;

        const prompt = PromptTemplates.resumeAnalysis(sampleResume);

        const response = await geminiProvider.generate(prompt);

        return response;
    }

}

module.exports = new AIService();
