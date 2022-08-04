import React from "react";
import NextLink from "next/link";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import s from "./SecurityPage.module.scss";
import AuthPageLayout from "../../components/Container/layouts/AuthPageLayout";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Alert, Box, CircularProgress } from "@mui/material";
import { InputPassword, InputText } from "../../components/Input";
import { PinInput } from "react-input-pin-code";
import { Api } from "../../utils/api";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

interface SecurityPageProps {
  email: string;
}

const SecurityPage: NextPage<SecurityPageProps> = ({ email }) => {
  const router = useRouter();
  const [_, setCookie] = useCookies();
  const [error, setError] = React.useState("");
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingResend, setIsLoadingResend] = React.useState(false);

  React.useEffect(() => {
    console.log(values);
    const pinCode = +values.join("");
    if (pinCode >= 100000) {
      // send checkPinCode
      // console.log('less go');
      checkPinCode(pinCode);
    }
  }, [values]);

  const checkPinCode = (pinCode: number) => {
    setIsLoading(true);
    if (isLoading) return;

    const axiosBody = JSON.stringify({
      email,
      pinCode,
    });
    Api.post("/auth/confirmation", axiosBody)
      .then((result) => {
        console.log(result);
        if (result.data.status === "failure") {
          setError("Please, provide corrent pin code");
          return;
        }
        setCookie("user_token", `Bearer ${result.data}`, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        });
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong, please try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Security Page</title>
      </Head>
      <div className={s.root}>
        <AuthPageLayout leftTitle="Welcome Back">
          <div className={s.wrapper}>
            <h1 className={s.title}>Verify Your Identity</h1>
            <div className={s.subtitle}>
              A verification code has been sent to <span>{email}</span> (check your spam folder). Enter
              the code to continue and be redirected.
            </div>

            {error && (
              <Alert severity="error" className={s.errorAlert}>
                {error}
              </Alert>
            )}

            <div className={s.pinCodeWrapper}>
              <PinInput
                values={values}
                // @ts-ignore
                length={6}
                type="number"
                borderColor="rgb(193, 199, 198)"
                validBorderColor="rgb(193, 199, 198)"
                errorBorderColor="#F0AB20"
                placeholder=""
                onChange={(value, index, values) => setValues(values)}
                size="lg"
              />

              {isLoading && (
                <div className={s.spinner}>
                  <CircularProgress color="inherit" size={30} />
                </div>
              )}
            </div>

            <div className={s.btn}>
              <Button
                onClick={() => {
                  setIsLoadingResend(true);
                  if (isLoadingResend) return;

                  const axiosBody = JSON.stringify({
                    email,
                  });
                  Api.post("/auth/resend", axiosBody)
                    .then((result) => {
                      console.log(result);
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .finally(() => {
                      setIsLoadingResend(false);
                    });
                }}
                isDisabled={false}
                variant="primary"
                isLoading={false}
              >
                Send Again
              </Button>
            </div>
          </div>
        </AuthPageLayout>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  console.log(query);
  if (!query.email) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }

  return {
    props: { email: query.email },
  };
};

export default SecurityPage;
