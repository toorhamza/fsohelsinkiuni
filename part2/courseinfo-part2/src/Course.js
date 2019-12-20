import React from "react";

const Header = () => <h1>Web Developement Cirriculum</h1>;

const Total = props => {
  const total = props.parts
    .map(parts => parts.exercises)
    .reduce((a, b) => a + b);

  return <p style={{ fontWeight: "bold" }}>Total {total} Exercises</p>;
};

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ course }) => {
  const output = course.map((partss, i) => (
    <div key={i}>
      <h2 key={partss.id}>
        <Part part={partss} />
      </h2>
      {partss.parts.map(subpart => (
        <div key={subpart.id}>
          <Part part={subpart} />{" "}
        </div>
      ))}
      <Total parts={partss.parts} />
    </div>
  ));
  return <div>{output}</div>;
};

const Course = props => {
  return (
    <>
      <Header />
      {<Content course={props.course} />}
    </>
  );
};

export default Course;
