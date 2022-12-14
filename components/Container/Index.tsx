import React from "react";
import s from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={s.root}>{children}</div>;
};

export default Container;
