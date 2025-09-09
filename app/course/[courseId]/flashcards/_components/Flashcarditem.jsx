// FlashcardItem.jsx
import React, { useState } from "react";
import { useSpring, animated as a } from "@react-spring/web";

const FlashcardItem = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="relative w-[200px] h-[250px] md:w-[300px] md:h-[350px] cursor-pointer"
        onClick={() => setFlipped((state) => !state)}
      >
        {/* Front Side */}
        <a.div
          className="absolute w-full h-full border bg-blue-700 text-white flex items-center justify-center p-4 rounded-lg shadow-lg backface-hidden"
          style={{
            opacity: opacity.to((o) => 1 - o),
            transform,
          }}
        >
          <h2>{card.front}</h2>
        </a.div>

        {/* Back Side */}
        <a.div
          className="absolute w-full h-full border bg-white text-blue-700 flex items-center justify-center p-4 rounded-lg shadow-lg backface-hidden"
          style={{
            opacity,
            transform,
            rotateY: "180deg",
          }}
        >
          <h2>{card.back}</h2>
        </a.div>
      </div>
    </div>
  );
};

export default FlashcardItem; // ✅ make sure this exists
