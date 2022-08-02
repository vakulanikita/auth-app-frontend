import React from "react";
import s from "./AuthPageLayout.module.scss";
import Image from "next/image";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  leftTitle: string;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({
  children,
  leftTitle,
}) => {
  return (
    <div className={s.root}>
      <div className={s.left}>
        <div className={s.blockImg}>
          <Image
            src="/sapp.svg"
            layout="responsive"
            width={377}
            height={318}
            alt="block image"
          />
        </div>
        <h2 className={s.title}>{leftTitle}</h2>
        <div className={s.subtitle}>Just a couple of clicks and we start</div>
      </div>
      <div className={s.right}>{children}</div>
    </div>
  );
};

export default AuthPageLayout;
