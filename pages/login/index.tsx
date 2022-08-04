import React from "react";
import NextLink from "next/link";
import { NextPage } from "next";
import Head from "next/head";
import s from "./LoginPage.module.scss";
import AuthPageLayout from "../../components/Container/layouts/AuthPageLayout";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Alert, Box } from "@mui/material";
import { InputPassword, InputText } from "../../components/Input";
import { Api } from "../../utils/api";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [_, setCookie] = useCookies();
  const [error, setError] = React.useState("");

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className={s.root}>
        <AuthPageLayout leftTitle="Welcome Back">
          <div className={s.wrapper}>
            <h1 className={s.title}>Sign In</h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Please enter the correct email")
                  .required("Please enter the correct email"),
                password: Yup.string()
                  .min(3, "Please enter the correct password")
                  .required("Please enter the correct password"),
              })}
              onSubmit={(values, actions) => {
                const body = {
                  email: values.email,
                  password: values.password,
                };

                Api.post("auth/login", body)
                  .then((result) => {
                    // console.log(result);
                    if (result.data.status === "notActive") {
                      router.push(`/security?email=${values.email}`);
                      return;
                    }

                    if (result.status === 201 && result.data) {
                      setCookie("user_token", `Bearer ${result.data}`, {
                        path: "/",
                        expires: new Date(
                          Date.now() + 1000 * 60 * 60 * 24 * 30
                        ),
                      });
                      router.replace("/");
                    }
                  })
                  .catch((err) => {
                    // The user is not in the database, or the password is incorrect
                    console.log(err.response);
                    setError("There was a problem with your login.");
                  })
                  .finally(() => {
                    actions.setSubmitting(false);
                  });
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Box>
                    {error && (
                      <Alert severity="error" className={s.errorAlert}>
                        {error}
                      </Alert>
                    )}

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

                  <div className={s.btn}>
                    <Button
                      variant="primary"
                      isLoading={props.isSubmitting}
                      type="submit"
                      isDisabled={!(props.isValid && props.dirty)}
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
              )}
            </Formik>

            <div className={s.footer}>
              Don’t have an account?{" "}
              <NextLink href="/register" passHref>
                <a className={s.link}>Sign Up</a>
              </NextLink>
            </div>
          </div>
        </AuthPageLayout>
      </div>
    </>
  );
};

export default LoginPage;
