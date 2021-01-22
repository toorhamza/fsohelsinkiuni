import React, { FC } from "react";
import Part from "./Part"
import { CoursePart } from "../index"


interface courseParts {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
       {courseParts.map((part, i) => (
        <Part key={i} course={part} />
      ))}
    </div>
  );
};

export default Content;
