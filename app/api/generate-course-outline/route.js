// import { courseOutlineAIModel } from "@/configs/AiModel";
// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";
// // import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// // const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// export async function POST(req) {
//   try {
//     const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

//     const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, list of chapters along with the summary of each chapter, topic list in each chapter, all result in JSON format.`;

//     // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await courseOutlineAIModel.generateContent(PROMPT);
//     const response = await result.response;
//     const text = await response.text();
//     // Extract first JSON block from the AI response
// const match = text.match(/```json\s*([\s\S]*?)\s*```/i);

// if (!match) {
//   throw new Error("AI response does not contain a valid JSON code block.");
// }

// let aiResult;
// try {
//   aiResult = JSON.parse(match[1].trim());
// } catch (err) {
//   console.error("Invalid JSON string:", match[1]);
//   throw new Error("Failed to parse JSON from Gemini response.");
// }

    
    

    

//     // Save to DB (you must define db and STUDY_MATERIAL_TABLE)
//     const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
//       courseId,
//       courseType,
//       createdBy,
//       topic,
//       courseLayout: aiResult,
//     }).returning({resp: STUDY_MATERIAL_TABLE });

//     const result = await inngest.send({
//       name : 'note.generate',
//       data:{
//         course:dbResult[0].resp
//       }
//     })

//     console.log(dbResult);

//     return NextResponse.json({ result: dbResult[0] });
//   } catch (error) {
//     console.error("Error generating course outline:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

  const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel}. Include:
- A brief summary of the course.
- For each chapter, include:
  - An emoji icon that matches the theme of the chapter (e.g., 📚, 🧪, 🧮).
  - Chapter title and summary.
  - List of topics in the chapter.
Return the output in clean JSON format inside a markdown \`\`\`json block.`;

    const aiRawResult = await courseOutlineAIModel.generateContent(PROMPT);
    const response = await aiRawResult.response;
    const text = await response.text();

    // Extract the first ```json ... ``` block
    const match = text.match(/```json\s*([\s\S]*?)\s*```/i);
    if (!match) {
      throw new Error("AI response does not contain a valid JSON code block.");
    }

    let aiResult;
    try {
      aiResult = JSON.parse(match[1].trim());
    } catch (err) {
      console.error("Invalid JSON string:", match[1]);
      throw new Error("Failed to parse JSON from Gemini response.");
    }

    // Save study material to database
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
      courseId,
      courseType,
      createdBy,
      topic,
      courseLayout: aiResult,
    }).returning({ resp: STUDY_MATERIAL_TABLE });

    // Trigger background job to generate notes
    await inngest.send({
      name: 'note.generate',
      data: {
        course: dbResult[0].resp,
      },
    });

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Error generating course outline:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


