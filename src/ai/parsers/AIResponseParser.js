class AIResponseParser {

    parse(response) {

        if (!response) {
            throw new Error("AI returned an empty response.");
        }

        // Remove markdown code fences
        let cleaned = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Extract only the JSON object
        const start = cleaned.indexOf("{");
        const end = cleaned.lastIndexOf("}");

        if (start === -1 || end === -1) {
            throw new Error("No valid JSON found in AI response.");
        }

        cleaned = cleaned.substring(start, end + 1);

        try {
            return JSON.parse(cleaned);
        } catch (error) {
            console.error("JSON Parse Error:", error.message);
            throw new Error("AI returned invalid JSON.");
        }

    }

}

module.exports = new AIResponseParser();