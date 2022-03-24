// imports : built in
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// imports : external
import { motion } from "framer-motion";
import axios from "axios";

// imports : internal
import {
  ADMIN_RESET,
  ADMIN_ACCOUNT,
  getEmptyState,
  LOGIN_STEPS,
  REGISTER_STEPS,
  RESET_PASSWORD_STEPS,
  ADMIN_URLS,
  PUBLIC_URLS,
} from "../../utils";
import { InputField } from "../public/InputField";
import { JoinLine } from "../public/DescHeader";
import { AUTH_ROUTES } from "../../utils/admin";
import { AuthValidators } from "../../utils/validator";

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
  async function handleLogin(cred) {
    const success = await adminAuthCB("login", cred);
    if (success) {
      r.push(ADMIN_URLS.dashboard.url);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center main-light h-full min-h-screen relative">
      <Link href={PUBLIC_URLS.home.url}>
        <a className="absolute top-4 z-20 right-4 text-xs font-semibold opacity-50 hover:opacity-100">
          Go to home
        </a>
      </Link>
      <AccountBody type="login" fields={LOGIN_STEPS} cb={handleLogin} />
    </div>
  );
};

export const PasswordReset = () => {
  const r = useRouter();
  async function handleReset(cred) {
    const success = await adminAuthCB("reset", cred);
    if (success) {
      r.push(ADMIN_ACCOUNT);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center main-light h-full min-h-screenrelative">
      <Link href={PUBLIC_URLS.home.url}>
        <a className="absolute top-4 z-20 right-4 text-xs font-semibold opacity-50 hover:opacity-100">
          Go to home
        </a>
      </Link>
      <AccountBody
        type="password reset"
        fields={RESET_PASSWORD_STEPS}
        cb={handleReset}
      />
    </div>
  );
};

export const RegisterBody = ({ onSuccess }) => {
  async function handleRegister(cred) {
    const success = await adminAuthCB("register", cred);
    if (success) {
      onSuccess(success);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center main-light h-full min-h-screen relative">
      <Link href={PUBLIC_URLS.home.url}>
        <a className="absolute top-4 z-20 right-4 text-xs font-semibold opacity-50 hover:opacity-100">
          Go to home
        </a>
      </Link>
      <AccountBody
        type="Register"
        fields={REGISTER_STEPS}
        cb={handleRegister}
      />
    </div>
  );
};

const AccountBody = ({ type, fields, cb }) => {
  const [currentStep, setCurrentStep] = useState(fields[0].field);
  const [accountDetail, setAccountDetail] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const getInitialState = useMemo(() => getEmptyState(fields), [fields]);

  useEffect(() => {
    setAccountDetail(getInitialState);
  }, [getInitialState]);

  useEffect(() => {
    if (!accountDetail) return;
    const values = Object.values(accountDetail);
    let index = values.findIndex((v) => v.trim() === "");

    const permission = fields
      .flatMap(({ field, constraints }) => {
        return Object.values(constraints).map(({ check }) =>
          check(accountDetail[field])
        );
      })
      .every(Boolean);

    setCanSubmit(permission);
    if (index !== -1) {
      setCurrentStep((_) => fields[index]?.field);
    }
  }, [accountDetail, canSubmit, fields]);

  function updateState(data) {
    setAccountDetail((prev) => ({ ...prev, ...data }));
  }

  const variant = {
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
    hide: {
      x: "-100%",
      opacity: 0,
      transition: { type: "spring", when: "afterChildren" },
    },
  };

  return (
    <main className="p-10 h-auto flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs">
          <small className="text-secondary font-semibold">ADMIN</small>
        </p>
        <h1 className="font-black text-4xl md:text-5xl capitalize">{type}</h1>
        {type === "login" && (
          <Link href={ADMIN_RESET}>
            <a className="text-xs mt-4 opacity-20 hover:opacity-100 transition-all">
              <small>Click here to reset!</small>
            </a>
          </Link>
        )}
      </div>
      <JoinLine />
      <div className="flex flex-col items-start gap-y-10 w-full">
        {accountDetail &&
          fields.map(({ field, desc, constraints }, i) => {
            const active =
              accountDetail[field].trim().length > 0 || field === currentStep;
            return (
              <motion.section
                key={field}
                variants={variant}
                initial={"hide"}
                animate={active ? "show" : "hide"}
                className="w-full flex flex-col items-start gap-y-4 relative after:left-4 after:h-10 after:bg-secondary after:w-0.5 after:absolute after:-top-10 first-of-type:after:hidden"
              >
                {accountDetail[field].trim().length === 0 && (
                  <p className="text-xs font-semibold py-1">{desc}</p>
                )}
                <motion.div variants={variant} className="w-full">
                  <InputField
                    name={field}
                    index={i + 1}
                    total={fields.length}
                    setEditMode={setEditMode}
                    value={accountDetail[field]}
                    constraints={constraints}
                    getData={updateState}
                  />
                </motion.div>
              </motion.section>
            );
          })}
        <motion.button
          onClick={() => cb(accountDetail)}
          variants={variant}
          animate={canSubmit && !editMode ? "show" : "hide"}
          className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer select-none"
        >
          <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark">
            {type}
          </span>
          <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full -translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
        </motion.button>
      </div>
    </main>
  );
};
