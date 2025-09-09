// See https://developers.google.com/apps-script/guides/properties
require('dotenv').config();
import fetch from 'node-fetch';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: 'text/plain',
};

const generationConfig2 = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: 'application/json',
};

export const courseOutlineAIModel = genAI.getGenerativeModel({
  generationConfig,
  model: "gemini-1.5-flash",
  contents: [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate a study material for Python for exam and level of difficulty will be easy with summary of course, list of chapters along with the summary of each chapter, topic list in each chapter, all result in JSON format'
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `...Long model instruction and JSON example as in your original code...`
        },
      ],
    },
  ],
});

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${apiKey}`;

export const generateNotesAiModel = {
  sendMessage: async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result;
  }
};

export const GenerateStudyTypeContentAiModel = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: 'application/json',

  sendMessage: async (prompt) => {
    console.log('Generating flashcards for prompt:', prompt);

    const flashcards = [
      { "front": "What is Flutter?", "back": "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase." },
      { "front": "What programming language does Flutter use?", "back": "Dart." },
      { "front": "What are the fundamental building blocks of Flutter UI?", "back": "Widgets." },
      { "front": "What is the key difference between StatelessWidget and StatefulWidget?", "back": "StatelessWidget's configuration is final (doesn't change). StatefulWidget has mutable state that can change over time, triggering a rebuild." },
      { "front": "What is Flutter's Hot Reload feature?", "back": "Allows you to quickly inject code changes into a running app without restarting it, preserving the app's state." },
      { "front": "What method within a widget is responsible for describing its UI?", "back": "The `build()` method." },
      { "front": "What main widget provides basic app structure like an AppBar and body?", "back": "Scaffold." },
      { "front": "How do you arrange widgets horizontally in Flutter?", "back": "Using a Row widget." },
      { "front": "How do you arrange widgets vertically in Flutter?", "back": "Using a Column widget." },
      { "front": "What widget is used to add internal spacing around a widget's content?", "back": "Padding widget." },
      { "front": "What is the basic widget for displaying text?", "back": "Text widget." },
      { "front": "What widget manages the stack of screens (routes) in an app?", "back": "Navigator." },
      { "front": "How do you navigate *to* a new screen (route)?", "back": "Navigator.push(context, MaterialPageRoute(...))." },
      { "front": "How do you navigate *back* to the previous screen?", "back": "Navigator.pop(context)." },
      { "front": "What type of widget is commonly used for buttons?", "back": "Widgets like ElevatedButton or TextButton." }
    ];

    return flashcards;
  }
};

export const GenerateQuizAiModel = {
  sendMessage: async (prompt) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-preview-04-17",
        generationConfig: generationConfig2,
      });

      // Gemini expects contents array
      const response = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      });

      // Gemini's response structure:
      // response.candidates[0].content -> array of { type: 'output_text', text: '...' }
      const textResult = response?.candidates?.[0]?.content
        ?.map(c => c.text)
        .join("\n");

      if (!textResult) {
        console.error("⚠️ No text returned from Gemini:", response);
        return null;
      }

      return textResult;

    } catch (err) {
      console.error("❌ Error in GenerateQuizAiModel.sendMessage:", err);
      return null;
    }
  }
};
