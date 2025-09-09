import React from 'react'

const ChapterList = ({ course }) => {
    const CHAPTERS = course?.courseLayout.chapters;
    return (
        <div className='mt-5'>
            <h2 className='font-medium text-xl'>Chapters</h2>
            <div>
                {CHAPTERS?.map((chapter, index) => (
                    <div key={index} className='flex gap-5 items-center p-4 border
                    cursor-pointer shadow-md mb-2 rounded-lg'>
                        <h2 className='text-2xl'>{chapter?.emoji}</h2>
                        <div>
                        <h2 className='font-medium'>{chapter?.chapter_title}</h2>
                        <p className='text-gray-400 text-sm'>{chapter?.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChapterList;
