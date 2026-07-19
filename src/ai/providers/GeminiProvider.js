const { GoogleGenAI } = require("@google/genai");

class GeminiProvider {

    constructor() {

        this.client = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        this.models = [
            process.env.GEMINI_PRIMARY_MODEL,
            process.env.GEMINI_BACKUP_MODEL,
            process.env.GEMINI_LAST_RESORT_MODEL
        ].filter(Boolean);

        this.maxRetries = 3;
        this.initialDelay = 2000;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async generateWithModel(model, prompt) {

        const response = await this.client.models.generateContent({
            model,
            contents: prompt
        });

        return response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
    }

    async generate(prompt) {

        let lastError = null;

        for (const model of this.models) {

            console.log(`\nTrying Model: ${model}`);

            let delay = this.initialDelay;

            for (let attempt = 1; attempt <= this.maxRetries; attempt++) {

                try {

                    console.log(`Attempt ${attempt}/${this.maxRetries}`);

                    const response = await this.generateWithModel(
                        model,
                        prompt
                    );

                    console.log(`Success using ${model}`);

                    return response;

                } catch (error) {

                    lastError = error;

                    console.error(
                        `Failed (${model}) Attempt ${attempt}:`,
                        error.message
                    );

                    const isRetryable =
                        error.message.includes("503") ||
                        error.message.includes("UNAVAILABLE") ||
                        error.message.includes("overloaded") ||
                        error.message.includes("high demand");

                    if (!isRetryable) {
                        throw error;
                    }

                    if (attempt < this.maxRetries) {

                        console.log(
                            `Retrying in ${delay / 1000} seconds...`
                        );

                        await this.sleep(delay);

                        delay *= 2;

                    }

                }

            }

            console.log(`Switching to next model...\n`);

        }

        throw lastError || new Error("All Gemini models failed.");

    }

}

module.exports = new GeminiProvider();