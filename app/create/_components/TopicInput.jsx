import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TopicInput = ({setTopic,setDifficultyLevel}) => {
  return (
    <div className="mt-10 w-full flex flex-col">
      <h2>Enter topic or paste the content </h2>
      <Textarea placeholder="Start writing here"
       className="mt-2 w-full max-w-xl" onChange={(event)=>setTopic(event.target.value)} /> 
      
      <h2 className="mt-5 mb-3">Select the difficulty level </h2>
      <Select onValueChange={(value)=>setDifficultyLevel(value)}>
        <SelectTrigger className="w-full max-w-2xl"> 
          <SelectValue placeholder="Difficulty Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Easy</SelectItem>
          <SelectItem value="dark">Moderate</SelectItem>
          <SelectItem value="system">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopicInput;
