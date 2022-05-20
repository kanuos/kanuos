// imports : built in
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// imports : external
import axios from "axios";

// imports : internal
import {
  ADMIN_ACCOUNT,
  ADMIN_RESET,
  ADMIN_URLS,
  PUBLIC_URLS,
} from "../../utils";

import { AUTH_ROUTES } from "../../utils/admin";
import { AuthValidators } from "../../utils/validator";
import CMSForm from "./forms/CMS";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PageLink } from "../portfolio/PageLink";

const LoadSpinner = dynamic(() =>
  import("../../components/public/Loader").then((m) => m.LoadSpinner)
);

async function adminAuthCB(type, credentials) {
  try {
    const URL = AUTH_ROUTES[type],
      validator = AuthValidators[type];

    const { error, value } = validator.validate(credentials);

    if (error) throw error.details[0].message;

    const { data, err } = (
      await axios({
        url: URL,
        method: "POST",
        data: value,
        withCredentials: true,
      })
    ).data;

    if (err) throw data;

    return data;
  } catch (error) {
    alert(error);
  }
}

export const LoginBody = () => {
  const r = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(cred) {
    setIsSubmitting(true);
    const success = await adminAuthCB("login", cred);
    if (success) {
      r.push(ADMIN_URLS.dashboard.url);
    }
    setIsSubmitting(false);
  }

  if (isSubmitting) {
    return (
      <div className="h-screen grid place-items-center">
        <LoadSpinner text="Logging In" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center main-light p-8 h-full min-h-screen relative">
      <div className="w-max">
        <PageLink href={PUBLIC_URLS.home.url} label="Go to Home" />
      </div>
      <AccountBody
        type="account"
        heading="login"
        cb={handleLogin}
        btnLabel="Sign In"
      />
      <div className="w-max">
        <PageLink href={ADMIN_RESET} label="Forgot password" />
      </div>
    </div>
  );
};

export const PasswordReset = () => {
  const r = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleReset(cred) {
    setIsSubmitting(true);
    const success = await adminAuthCB("reset", cred);
    setIsSubmitting(false);
    if (success) {
      r.push(ADMIN_ACCOUNT);
    }
  }
  if (isSubmitting) {
    return (
      <div className="h-screen grid place-items-center">
        <LoadSpinner text="Resetting password" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center p-8 main-light h-full min-h-screen relative">
      <div className="w-max">
        <PageLink href={PUBLIC_URLS.home.url} label="Go to Home" />
      </div>
      <AccountBody
        type="reset"
        heading="password reset"
        cb={handleReset}
        btnLabel="Reset"
      />
      <div className="w-max">
        <PageLink href={ADMIN_ACCOUNT} label="Login" />
      </div>
    </div>
  );
};

export const RegisterBody = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleRegister(cred) {
    setIsSubmitting(true);
    const success = await adminAuthCB("register", cred);
    setIsSubmitting(false);
    if (success) {
      onSuccess(success);
    }
  }
  if (isSubmitting) {
    return (
      <div className="h-screen grid place-items-center">
        <LoadSpinner text="Signing up.. " />
      </div>
    );
  }
  return (
    <div className="flex flex-col p-8 items-center justify-center main-light h-full min-h-screen relative">
      <div className="w-max">
        <PageLink href={PUBLIC_URLS.home.url} label="Go to Home" />
      </div>
      <AccountBody
        type="account"
        heading="Register"
        btnLabel="Sign Up"
        cb={handleRegister}
      />
    </div>
  );
};

const AccountBody = ({ type, cb, heading, btnLabel }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <main className="my-auto h-auto flex flex-col items-center justify-center gap-6 w-full">
      <CMSForm
        type={type}
        heading={heading}
        init={{}}
        isDarkMode={isDarkMode}
        getFormData={cb}
        btnLabel={btnLabel}
      />
    </main>
  );
};
