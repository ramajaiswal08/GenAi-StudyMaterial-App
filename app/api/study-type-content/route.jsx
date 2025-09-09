import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "../../../inngest/client"; // Make sure this is correct
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("✅ API called: /api/study-type-content");
    const { chapters, courseId, type } = await req.json();
    console.log("Request Body:", { chapters, courseId, type });

    const normalizedType = type.toLowerCase();

     const PROMPT = normalizedType === "Flashcard"
      ? `Generate flashcards on topic: ${chapters}`
      : `Generate a Quiz on topic: ${chapters} with questions, options, and correct answers in JSON format`;

    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE)
      .values({
        courseId,
        type,
        status: 'Generating'
      })
      .returning({
        id: STUDY_TYPE_CONTENT_TABLE.id
      });

    console.log("Inserted DB record:", result);

    await inngest.send({
      name: 'studyType.content',
      data: {
        studyType: type,
        prompt: PROMPT,
        courseId,
        recordId: result[0].id
      }
    });

    console.log("✅ Inngest event sent");
    return NextResponse.json({ id: result[0].id });
  } catch (error) {
    console.error("❌ ERROR in study-type-content route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
