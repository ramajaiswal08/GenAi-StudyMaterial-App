// import { Button } from '@/components/ui/button'
// import axios from 'axios';
// import { RefreshCcw } from 'lucide-react';
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import { toast } from 'sonner';

// const MaterialCardItem = ({item,studyTypeContent,course, refreshData}) => {

//   const [loading ,setLoading] = useState(false);
//   const [isAvailable, setIsAvailable] = useState(false);

//    useEffect(() => {
//     const available = Array.isArray(studyTypeContent?.[item.type]) && studyTypeContent[item.type].length > 0;
//     setIsAvailable(available);
//   }, [studyTypeContent, item.type]);

//   const GenerateContent = async() => {

//     toast('Generation Your content...')
//     setLoading (true);
//    const chapters = course?.courseLayout?.chapters
//   ?.map((chapter) => chapter.title)
//   .join(', ');

//     console.log(chapters);

//     const result =await axios.post('/api/study-type-content',{
//       courseId : course?.courseId,
//       type:item.name,
//       chapters:chapters

//     });

  
//     console.log(result);
//     await refreshData(true);
//     setLoading(false);
//     toast('your content is ready to view')

//   }

// return (
//   <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center ${!isAvailable && "grayscale"}`}>
//     <h2 className={`p-1 px-2 text-white rounded-full text-[10px] mb-2 ${isAvailable ? 'bg-green-500' : 'bg-gray-500'}`}>
//       {isAvailable ? 'Ready' : 'Generate'}
//     </h2>

//     <Image src={item.icon} alt={item.name} width={50} height={50}/>
//     <h2 className='font-medium'> {item.name}</h2>
//     <p className='text-gray-500 text-sm text-center'>{item.desc}</p>

//     {/* <Button className="mt-3 w-full" variant='outline' type='button' onClick={() =>GenerateContent()}>
//       {isAvailable ? 'View' : 'Generate'}
//     </Button> */}
//     {/* {studyTypeContent?.[item.type]?.length==null?
//     <Button className="mt-3 w-full" variant='outline' type='button' onClick={() =>GenerateContent()} >
//       {loading && <RefreshCcw className='animate-spin'/> }
//       Generate</Button>
//     :<Button className="mt-3 w-full">View</Button>
//   } */}


//   {!isAvailable ? (
//   <Button 
//     className="mt-3 w-full" 
//     variant="outline" 
//     type="button" 
//     onClick={(e) =>{
//       e.preventDefault();
//       GenerateContent()}}
//     disabled={loading}
//   >
//     {loading ? <RefreshCcw className="animate-spin" /> : 'Generate'}
//   </Button>
// ) : (
//   <Button className="mt-3 w-full" variant="outline" type="button">
//     View
//   </Button>
// )}
//   </div>
// );

// }
// export default MaterialCardItem

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const available = Array.isArray(studyTypeContent?.[item.type]) && studyTypeContent[item.type].length > 0;
    setIsAvailable(available);
  }, [studyTypeContent, item.type]);

  const GenerateContent = async () => {
    try {
      toast('Generating your content...');
      setLoading(true);

      const chapters = course?.courseLayout?.chapters
        ?.map((chapter) => chapter.title)
        .join(', ');

      const result = await axios.post('/api/study-type-content', {
        courseId: course?.courseId,
        type: item.type,   // ✅ use item.type, not item.name
        chapters: chapters
      });

      console.log("Generated:", result.data);

      await refreshData(); // refresh parent data
      toast.success('Your content is ready to view');
    } catch (error) {
      toast.error('Generation failed!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center ${!isAvailable && "grayscale"}`}>
      <h2 className={`p-1 px-2 text-white rounded-full text-[10px] mb-2 ${isAvailable ? 'bg-green-500' : 'bg-gray-500'}`}>
        {isAvailable ? 'Ready' : 'Generate'}
      </h2>

      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.desc}</p>

      {!isAvailable ? (
        <Button
          className="mt-3 w-full"
          variant="outline"
          type="button"
          onClick={GenerateContent}
          disabled={loading}
        >
          {loading ? <RefreshCcw className="animate-spin" /> : 'Generate'}
        </Button>
      ) : (
        <Link href={`/course/${course?.courseId}${item.path}`} className="w-full mt-3">
          <Button className="w-full" variant="outline" type="button">
            View
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MaterialCardItem;
