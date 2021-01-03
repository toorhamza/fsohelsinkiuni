import React, { FC } from "react";

const Header: FC<{course:string}> = ({ course }) => {
  return <h1>{course}</h1>;
};

export default Header;
