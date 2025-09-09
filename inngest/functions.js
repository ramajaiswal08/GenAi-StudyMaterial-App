import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: 'create-user' },
  { event: 'create.user' },
  async ({ event, step }) => {
    const { user } = event.data;

    await step.run('Check user and create new if not in DB', async () => {
      const existingUser = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
      
      if (!existingUser?.length) {
        const newUser = await db.insert(USER_TABLE).values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress
        }).returning({ id: USER_TABLE.id });

        return newUser;
      }

      return existingUser;
    });

    return "Success";
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: 'generate-course' },
  { event: 'note.generate' },
  async ({ event, step }) => {
    const { course } = event.data;
    const chapters = course?.courseLayout?.chapters;
    if (!chapters) return 'No Chapters';

    await step.run('Generate Chapter Notes', async () => {
      let index = 0;
      for (const chapter of chapters) {
        const PROMPT = `Generate exam material detail content for each chapter. Make sure to include all topic points in HTML format (no <html>, <head>, <body>, or <title> tags). Chapters: ${JSON.stringify(chapter)}`;
        const result = await generateNotesAiModel.sendMessage(PROMPT);

        // Assuming sendMessage returns a string or structured data
        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: result
        });

        index++;
      }

      return 'Completed';
    });

    await step.run("Update Course Status to Ready", async () => {
      await db.update(STUDY_MATERIAL_TABLE)
        .set({ status: "Ready" })
        .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
      return 'Success';
    });
  }
);

// Used to generate flashcards, quizzes, QA
export const GenerateStudyTypeContent = inngest.createFunction(
  { id: 'generate-study-type-content' },
  { event: 'studyType.content' },
  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;
    const normalizedType = studyType.toLowerCase();

    // Generate content using AI
   const AiResult = await step.run('Generate Content Using AI', async () => {
  let result;
  if (normalizedType === 'flashcard') {
    result = await GenerateStudyTypeContentAiModel.sendMessage(prompt);
  } else {
    result = await GenerateQuizAiModel.sendMessage(prompt);
  }

  return typeof result === 'string' ? result : JSON.stringify(result);
});

    // Save result to DB
    await step.run('Save Result to DB', async () => {
      await db.update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AiResult,
          status: 'Ready'
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

      return 'Data inserted';
    });
  }
);
