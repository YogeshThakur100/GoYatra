import { GoogleGenerativeAI } from "@google/generative-ai";


export const getFamousPlaces = async (inputs) => {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyBVoIAKa5G7btXxN4GiOWFW1RzwURpmrn4");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = inputs;
        
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        
        // Ensure you're getting the right field with the generated text
        return result.response.text(); // This assumes the result is structured with the necessary field for text.
    } catch (error) {
        console.log("Errr in getFamousPlaces", error);
        throw error;
    }
};
