import React, { FC } from "react";

interface courseParts {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: courseParts[]
}


const Total: FC<ContentProps> = ({ courseParts })  => {
  return (
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
};

export default Total;
