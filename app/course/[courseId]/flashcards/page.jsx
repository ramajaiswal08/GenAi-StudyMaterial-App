"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/flashcarditem";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Fashcard() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);


  useEffect(() => {
    GetFlashCards();
  }, []);

  

  const GetFlashCards = async () => {
  const result = await axios.post("/api/study-type", {
    courseId: courseId,
    studyType: "flashcard",
  });

  console.log("Flashcards data:", result?.data);

  // Flatten all contents into a single array
  const allFlashcards = result?.data?.flashcards?.flatMap(f => f.content) || [];
  setFlashcards(allFlashcards);
};


  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-2xl">FlashCards</h2>
      <p className="mb-4">Flashcards: The ultimate tool to lock in concepts!</p>

      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
  {flashcards.length > 0 ? (
    flashcards.map((flashcard, index) => (
      <CarouselItem key={index} className="basis-full">
        <FlashcardItem
          card={flashcard}   // { question, answer }
          handleClick={handleClick}
          isFlipped={isFlipped}
        />
      </CarouselItem>
    ))
  ) : (
    <CarouselItem className="basis-full">
      <div className="p-6 text-center border rounded-lg">
        No flashcards found
      </div>
    </CarouselItem>
  )}
</CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Fashcard;
