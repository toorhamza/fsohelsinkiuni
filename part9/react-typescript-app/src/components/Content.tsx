import React, { FC } from "react";

interface courseParts {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: courseParts[]
}

const Content: FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts
        ? courseParts.map((i, num) => (
            <p key={num}>
              {" "}
              {i.name} {i.exerciseCount}
            </p>
          ))
        : null}
    </div>
  );
};

export default Content;
