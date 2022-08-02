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
import { Box } from "@mui/material";
import { InputPassword, InputText } from "../../components/Input";

const LoginPage: NextPage = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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
                // setError("");

                const body = {
                  email: values.email,
                  password: values.password,
                };

                // const schema = Yup.object().shape({
                //   digit: Yup.number()
                //     .typeError("Must be a number")
                //     .required("Required"),
                //   text: Yup.string().required("Required"),
                // });

                // try {
                //   schema.validateSync({ text: "ciaone", digit: "pinp" });
                // } catch (err) {
                //   console.log(err);
                // }

                // console.log(Yup.string().email().isValidSync(values.email));
                // console.log(Yup.string().matches(/[A-Z]/).isValidSync(values.password));
                // console.log(Yup.string().matches(/[0-9]/).isValidSync(values.password));
                console.log(
                  Yup.string()
                    .matches(/(?=.*[!?@#$%^&()№*])/)
                    .isValidSync(values.password)
                );

                console.log(body);

                // Api.post<User>("/auth/signin", JSON.stringify(body))
                //   .then((result) => {
                //     // console.log();
                //     if (result.status === 200) {
                //       const { accessToken, ...userData } = result.data;
                //       // console.log(result);

                //       switch (userData.status) {
                //         case "active": {
                //           // console.log(result.data);
                //           const user = {
                //             accessToken: `Bearer ${accessToken}`,
                //             ...userData,
                //           };

                //           try {
                //             const gaCallback = () => {
                //               setCookie("user", user, {
                //                 path: "/",
                //                 expires: new Date(userData.expiresIn),
                //               });

                //               menu
                //                 ? dispatch(ToggleMenuAction(null))
                //                 : dispatch(ToggleAuthModalAction(null));
                //               Router.reload();
                //             };

                //             dispatch(SetUser(userData));
                //             gaEvent("finish_log_in");

                //             setCookie("user_token", `Bearer ${accessToken}`, {
                //               path: "/",
                //               expires: new Date(userData.expiresIn),
                //             });

                //             setCookie("user", user, {
                //               path: "/",
                //               expires: new Date(userData.expiresIn),
                //             });

                //             menu
                //               ? dispatch(ToggleMenuAction(null))
                //               : dispatch(ToggleAuthModalAction(null));
                //             Router.reload();
                //             // menu ? dispatch(ToggleMenuAction(null)) : dispatch(ToggleAuthModalAction(null))
                //           } catch (e) {
                //             console.log(e);
                //           }

                //           return;
                //         }

                //         case "deleted": {
                //           // dispatch(SetUser({
                //           //   email: result.data.email,
                //           //   status: result.data.status,
                //           //   role: result.data.role,
                //           // }))
                //           // dispatch(ChangeAuthFormAction('emailCode'));
                //           setError("This account has been deleted");
                //           return;
                //         }

                //         case "notActive": {
                //           // dispatch(SetUser({
                //           //   email: result.data.email,
                //           //   status: result.data.status,
                //           //   role: result.data.role,
                //           // }))
                //           dispatch(ChangeAuthFormAction("registerCode"));
                //           return;
                //         }

                //         default: {
                //           // console.log(result.data.status);
                //         }
                //       }
                //       // Error if the user is not in the database
                //       setError(result.data.message);
                //     }
                //   })
                //   .catch((reason) => {
                //     if (axios.isAxiosError(reason)) {
                //       console.log(reason);
                //       // alert(reason)
                //       reason?.response?.data.message
                //         ? // Error if the user is in the database, but the password is entered incorrectly
                //           setError(reason?.response?.data.message)
                //         : setError(i18nErrors.somethingWrong);
                //     }
                //   })
                //   .finally(() => {
                //     actions.setSubmitting(false);
                //   });
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Box>
                    {/* {error && <div className={s.formError}>{error}</div>} */}

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
                      isLoading={false}
                      type="submit"
                      isDisabled={!(props.isValid && props.dirty)}
                      onClick={() => {
                        setSubmitted(true);
                        setError(
                          props.errors?.email || props.errors?.password || ""
                        );
                        console.log("click");
                      }}
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
