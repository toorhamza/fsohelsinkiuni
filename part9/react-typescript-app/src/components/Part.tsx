import React, { FC } from "react";
import { CoursePart } from "../index";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
    course: CoursePart
}

const Part: FC<PartProps> = ({ course }) => {
  switch (course.name) {
    case "Fundamentals":
      return (
        <>
          <p>{course.name}</p>
          {course.description && <p>{course.description}</p>}
          <p>
            Exercises: <strong>{course.exerciseCount}</strong>
          </p>
        </>
      );
    case "Using props to pass data":
      return (
        <>
          <p>{course.name}</p>
          <p>Exercises: {course.exerciseCount}</p>
          <p>
            Group Projects: <strong>{course.groupProjectCount}</strong>
          </p>
        </>
      );
    case "Deeper type usage":
      return (
        <>
          <p>{course.name}</p>
          {course.description && <p>{course.description}</p>}
          <p>
            Exercises: <strong>{course.exerciseCount}</strong>
          </p>
          <p>
            Submission Link:
            <a href={course.exerciseSubmissionLink}>
              {course.exerciseSubmissionLink}
            </a>
          </p>
        </>
      );
      case "Advanced Typescript":
        return (
          <>
            <p>{course.name}</p>
            {course.description && <p>{course.description}</p>}
            <p>
              Exercises: <strong>{course.exerciseCount}</strong>
            </p>
          </>
        );
    default:
      return assertNever(course);
  }
};

export default Part;
