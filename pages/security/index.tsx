import React from "react";
import NextLink from "next/link";
import { NextPage } from "next";
import Head from "next/head";
import s from "./SecurityPage.module.scss";
import AuthPageLayout from "../../components/Container/layouts/AuthPageLayout";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Box, CircularProgress } from "@mui/material";
import { InputPassword, InputText } from "../../components/Input";
import { PinInput } from "react-input-pin-code";

const SecurityPage: NextPage = () => {
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);

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
              A verification code has been sent to <span>nik.vakula@bk.ru</span>
              . Enter the code to continue and be redirected.
            </div>
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

              <div className={s.spinner}>
                <CircularProgress color="inherit" size={30} />
              </div>
            </div>
            <div className={s.error}>Please, provide corrent pin code</div>

            <div className={s.btn}>
              <Button isDisabled={false} variant="primary" isLoading={false}>
                Send Again
              </Button>
            </div>

            {/* <div className={s.footer}>
              Don’t have an account?{" "}
              <NextLink href="/register" passHref>
                <a className={s.link}>Sign Up</a>
              </NextLink>
            </div> */}
          </div>
        </AuthPageLayout>
      </div>
    </>
  );
};

export default SecurityPage;
