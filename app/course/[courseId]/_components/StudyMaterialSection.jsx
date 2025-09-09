// import React, { useEffect, useState } from 'react'
// import MaterialCardItem from './MaterialCardItem'
// import axios from 'axios'
// import Link from 'next/link';

// const StudyMaterialSection = ({ courseId, course }) => {
//   const [studyTypeContent, setStudyTypeContent] = useState({});

//   const MaterialList = [
//     { name: 'Notes/Chapters', desc: "Read notes to prepare it", icon: '/notes.png', path: '/notes', type: "notes" },
//     { name: 'FlashCard', desc: "FlashCard help to remember the concepts", icon: '/flashcard.png', path: '/flashcards', type: "flashcard" },
//     { name: 'Quiz', desc: "Great way to test your Knowledge", icon: '/quiz.png', path: '/quiz', type: "quiz" },
//     { name: 'Question/Answer', desc: "Help to practice your learning", icon: '/qa.png', path: '/qa', type: "qa" }
//   ];

//   useEffect(() => {
//     if (courseId) GetStudyMaterial();
//   }, [courseId]);

//   const GetStudyMaterial = async () => {
//     try {
//       const result = await axios.post('/api/study-type', {
//         courseId,
//         studyType: "ALL"
//       });
//        console.log(result?.data);
//       setStudyTypeContent(result.data);
//     } catch (error) {
//       console.error("Error fetching study material", error);
//     }
//   };

//   return (
//     <Link href={'/course/'+course?.courseId+item.path}>
//     <div className="mt-5">
//       <h2 className='font-medium text-xl'>Study Material</h2>
//       <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
//         {MaterialList.map((item, index) => (
//           <MaterialCardItem
//             key={index}
//             item={item}
//             studyTypeContent={studyTypeContent}
//             course={course}
//             refreshData={GetStudyMaterial}
//           />
//         ))}
//       </div>
//     </div>
//     </Link>
//   )
// }

// export default StudyMaterialSection;

import React, { useEffect, useState } from 'react';
import MaterialCardItem from './MaterialCardItem';
import axios from 'axios';

const StudyMaterialSection = ({ courseId, course }) => {
  const [studyTypeContent, setStudyTypeContent] = useState({});

  const MaterialList = [
    { name: 'Notes/Chapters', desc: "Read notes to prepare it", icon: '/notes.png', path: '/notes', type: "notes" },
    { name: 'FlashCard', desc: "FlashCard help to remember the concepts", icon: '/flashcard.png', path: '/flashcards', type: "flashcard" },
    { name: 'Quiz', desc: "Great way to test your Knowledge", icon: '/quiz.png', path: '/quiz', type: "quiz" },
    { name: 'Question/Answer', desc: "Help to practice your learning", icon: '/qa.png', path: '/qa', type: "qa" }
  ];

  const GetStudyMaterial = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId,
        studyType: "ALL"
      });
      console.log(result?.data);
      setStudyTypeContent(result.data); // This triggers re-render in MaterialCardItem
    } catch (error) {
      console.error("Error fetching study material", error);
    }
  };

  useEffect(() => {
    if (courseId) GetStudyMaterial();
  }, [courseId]);

  return (
    <div className="mt-5">
      <h2 className='font-medium text-xl'>Study Material</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
        {MaterialList.map((item, index) => (
          <MaterialCardItem
            key={index}
            item={item}
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={GetStudyMaterial} 
          />
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialSection;

