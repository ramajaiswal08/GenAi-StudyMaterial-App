import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq,and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
  const { courseId, studyType, chapters } = await req.json();

  if (studyType === "ALL") {
    const notes = await db.select().from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

    const flashcards = contentList.filter(item => item.type === "flashcard");
    const quiz = contentList.filter(item => item.type === "quiz");
    const qa = contentList.filter(item => item.type === "qa");

    return NextResponse.json({
      notes,
      flashcard: flashcards,
      quiz,
      qa
    });
  }

  // ✅ Notes
  if (studyType === "notes") {
    const notes = await db.select().from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));
    return NextResponse.json(notes);
  }

  // ✅ Flashcards
  if (studyType === "flashcard") {
    // Example flashcard generator (replace with your logic/LLM)
    
    const flashcards = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, "flashcard")
        )
      );
    return NextResponse.json({ flashcards });
  }

  // ✅ Quiz
  if (studyType === "quiz") {
    const generatedQuiz = [
      { question: "Sample Q1?", options: ["A", "B"], answer: "A", courseId, type: "quiz" }
    ];
    await db.insert(STUDY_TYPE_CONTENT_TABLE).values(generatedQuiz);
    return NextResponse.json({ success: true, quiz: generatedQuiz });
  }

  // ✅ QA
  if (studyType === "qa") {
    const generatedQA = [
      { question: "Explain concept X", answer: "Answer for X", courseId, type: "qa" }
    ];
    await db.insert(STUDY_TYPE_CONTENT_TABLE).values(generatedQA);
    return NextResponse.json({ success: true, qa: generatedQA });
  }

  return NextResponse.json({ error: "Invalid studyType" }, { status: 400 });
}catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
