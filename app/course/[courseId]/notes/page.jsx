"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseInroCard from '../_components/CourseInroCard';
import StudyMaterialSection from '../_components/StudyMaterialSection';
import ChapterList from '../_components/ChapterList';

const ViewNotes = () => {
  const params = useParams();
  const courseId = params?.courseId;

  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const route = useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: "notes"
      });
      console.log(result?.data);
      setNotes(result?.data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="p-4">
      {/* Course Info Section */}
      <div className='mb-8'>
        <CourseInroCard courseId={courseId} />
        <StudyMaterialSection courseId={courseId} />
        <ChapterList courseId={courseId} />
      </div>

      {/* Notes Viewer Section */}
      <div className='flex gap-5 items-center'>
        {stepCount !== 0 && (
          <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount - 1)}>
            Previous
          </Button>
        )}
        {notes?.map((item, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index < stepCount ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
        {stepCount < notes?.length && (
          <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount + 1)}>
            Next
          </Button>
        )}
      </div>

      <div className='mt-10'>
        <div
          dangerouslySetInnerHTML={{
            __html: (notes[stepCount]?.notes || '')
              ?.replace(/```html/g, '')
              ?.replace(/```/g, '')
          }}
        />

        {stepCount === notes?.length && (
          <div className='flex gap-10 items-center flex-col justify-center mt-10'>
            <h2>End Of Notes</h2>
            <Button onClick={() => route.back()}>Go to Course Page</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNotes;
