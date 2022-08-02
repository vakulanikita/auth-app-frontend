import React from "react";
import NextLink from "next/link";
import { NextPage } from "next";
import Head from "next/head";
import s from "./RegisterPage.module.scss";
import AuthPageLayout from "../../components/Container/layouts/AuthPageLayout";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Box } from "@mui/material";
import { InputPassword, InputText } from "../../components/Input";

const RegisterPage: NextPage = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>
      <div className={s.root}>
        <AuthPageLayout leftTitle="Welcome Aboard">
          <div className={s.wrapper}>
            <h1 className={s.title}>Create Account</h1>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("Enter a first name"),
                lastName: Yup.string().required("Enter a last name"),
                email: Yup.string()
                  .email("Please enter the correct email")
                  .required("Please enter the correct email"),
                password: Yup.string()
                  .min(3, "Please enter the correct password")
                  .matches(/[A-Z]/, "Please enter the correct password")
                  .matches(/[0-9]/, "Please enter the correct password")
                  .matches(
                    /(?=.*[!?@#$%^&()№*])/,
                    "Please enter the correct password"
                  )
                  .required("Please enter the correct password"),
              })}
              onSubmit={(values, actions) => {
                // setError("");

                const body = {
                  email: values.email,
                  password: values.password,
                };

                console.log(body);
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Box>
                    {/* {submitted && props.errors && <div>{error}</div>} */}
                    {/* {error && <div className={s.formError}>{error}</div>} */}

                    <div className={clsx(s.inputGroup, s.row)}>
                      <InputText
                        name="firstName"
                        label="First Name"
                        type="text"
                        placeholder="John"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        errors={props.errors.firstName}
                        touched={props.touched.firstName}
                        value={props.values.firstName}
                        icon="people"
                      />
                      <InputText
                        name="lastName"
                        label="Last Name"
                        type="text"
                        placeholder="Doe"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        errors={props.errors.lastName}
                        touched={props.touched.lastName}
                        value={props.values.lastName}
                        icon="people"
                      />
                    </div>
                    <div className={s.inputGroup}>
                      <InputText
                        name="email"
                        label="Email"
                        type="text"
                        placeholder="johndoe@gmail.com"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        errors={props.errors.email}
                        touched={props.touched.email}
                        value={props.values.email}
                        icon="mail"
                      />
                    </div>
                    <div className={s.inputGroup}>
                      <InputPassword
                        name="password"
                        label="Password"
                        placeholder="**************"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        errors={props.errors.password}
                        touched={props.touched.password}
                        value={props.values.password}
                      />
                    </div>
                  </Box>

                  <div className={s.validate}>
                    <div
                      className={clsx(
                        s.validateItem,
                        !Yup.string()
                          .matches(/[A-Z]/)
                          .isValidSync(props.values.password) && s.invalid
                      )}
                    >
                      <div className={s.indicator}></div>
                      <span>Contains at least one uppercase letter</span>
                    </div>
                    <div
                      className={clsx(
                        s.validateItem,
                        !Yup.string()
                          .matches(/(?=.*[!?@#$%^&()№*])/)
                          .isValidSync(props.values.password) && s.invalid
                      )}
                    >
                      <div className={s.indicator}></div>
                      <span>Contains at least one special character</span>
                    </div>
                    <div
                      className={clsx(
                        s.validateItem,
                        !Yup.string()
                          .matches(/[0-9]/)
                          .isValidSync(props.values.password) && s.invalid
                      )}
                    >
                      <div className={s.indicator}></div>
                      <span>Contains at least one number</span>
                    </div>
                  </div>

                  <div className={s.btn}>
                    <Button
                      variant="primary"
                      isLoading={false}
                      type="submit"
                      isDisabled={!(props.isValid && props.dirty)}
                      onClick={() => {
                        setSubmitted(true);
                        setError(
                          props.errors?.firstName ||
                            props.errors?.lastName ||
                            props.errors?.email ||
                            props.errors?.password ||
                            ""
                        );
                        console.log(props);
                        console.log(props.isValid);
                        console.log("click");
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>
              )}
            </Formik>

            <div className={s.footer}>
              Already a member?{" "}
              <NextLink href="/login" passHref>
                <a className={s.link}>Sign In</a>
              </NextLink>
            </div>
          </div>
        </AuthPageLayout>
      </div>
    </>
  );
};

export default RegisterPage;
