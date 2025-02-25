import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (sourceText) => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You will be provided with a sentence: 
        "${sourceText}". Your tasks are:
        - Detect the language of the sentence
        - Translate the sentence into ${selectedLanguage}
        Only return the translated sentence.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const data = response.text(); // Gemini's response format

        setTargetText(data);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
