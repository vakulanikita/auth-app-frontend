import clsx from "clsx";
import React from "react";
import s from "./Input.module.scss";

export const Input = () => {
  return <div className={s.root}>Input</div>;
};

interface InputProps {
  name: string;
  label: string;
  errors?: any;
  touched?: boolean;
  type?: string;
  placeholder?: string;
  onChange: any;
  onBlur: any;
  value: any;
  icon?: "people" | "mail";
}

export const InputText: React.FC<InputProps> = ({
  label,
  errors,
  touched,
  onChange,
  onBlur,
  value,
  icon,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={clsx(s.root, s.password, touched && errors && s.error)}>
        <label>{label}</label>
        <div className={s.inputWrapper}>
          <input
            onChange={onChange}
            onBlur={onBlur}
            {...props} // type, name, placeholder
            value={value}
            autoComplete="off"
            maxLength={100}
          />
          {icon === "people" && (
            <div className={clsx(s.icon, s.people)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/auth/people.svg" alt="people image" />
            </div>
          )}
          {icon === "mail" && (
            <div className={clsx(s.icon, s.mail)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/auth/mail.svg" alt="mail image" />
            </div>
          )}
        </div>
        {/* {touched && errors ? (
          <span className={s.errorText}>{errors}</span>
        ) : null} */}
      </div>
    </>
  );
};

export const InputPassword: React.FC<InputProps> = ({
  label,
  errors,
  touched,
  onChange,
  onBlur,
  value,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div
        className={clsx(
          s.root,
          s.password,
          touched && errors && s.error,
          !open ? s.close : s.open
        )}
      >
        <label>{label}</label>
        <div className={s.inputWrapper}>
          <input
            onChange={onChange}
            onBlur={onBlur}
            {...props} // type, name, placeholder
            type={!open ? "password" : "text"}
            value={value}
            autoComplete="off"
            maxLength={100}
          />
          <div
            className={clsx(s.icon, s.passwordEye)}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/auth/eye-open.svg" alt="eye image" />
          </div>
        </div>
        {/* {touched && errors ? (
          <span className={s.errorText}>{errors}</span>
        ) : null} */}
      </div>
    </>
  );
};
