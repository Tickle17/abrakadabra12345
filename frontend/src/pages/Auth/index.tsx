import { AuthLayout } from '@/shared/layouts';
import { Input } from '@/shared/ui';
import { EyeIcon } from 'lucide-react';
import ReactCurvedText from 'react-curved-text';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { SignInCard } from '@/widgets';

export const SignUpCard = ({
  visible,
  setAuthStage,
}: {
  visible: boolean;
  setAuthStage: React.Dispatch<React.SetStateAction<'signIn' | 'signUp'>>;
}) => {
  const [signUpStep, setSignUpStep] = useState<1 | 2 | 3>(1);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.75, type: 'spring', delay: 0.75 },
          }}
          exit={{
            y: '100%',
            opacity: 0,
            transition: { duration: 0.75, type: 'spring' },
          }}
          className="flex flex-col w-full max-w-[500px] h-[675px] border border-slate-950 rounded-[2px] bg-white p-10"
        >
          <div className="w-full h-[75px] flex flex-col justify-center gap-2 flex-shrink-0">
            {signUpStep < 3 && (
              <h1 className="text-2xl font-light text-slate-950">
                Let&apos;s sign you up!
              </h1>
            )}
            {signUpStep === 3 && (
              <h1 className="text-2xl font-light text-slate-950">
                Congratulations!
              </h1>
            )}
            {signUpStep === 1 && (
              <p className="text-xs font-light text-slate-950">
                You need to enter your email and username to continue
              </p>
            )}
            {signUpStep === 2 && (
              <p className="text-xs font-light text-slate-950">
                You need to create a password to continue
              </p>
            )}
            {signUpStep === 3 && (
              <p className="text-xs font-light text-slate-950">
                You have successfully created your account
              </p>
            )}
          </div>
          {signUpStep === 1 && (
            <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-7">
              <div className="w-full flex flex-col gap-2">
                <p className="text-slate-950 text-sm font-light">Email</p>
                <Input
                  className="w-full h-11 border border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Enter your email"
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col gap-2">
                  <p className="text-slate-950 text-sm font-light">Username</p>
                  <Input
                    className="w-full h-11 border border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="flex justify-end items-center">
                  <p className="text-slate-950 text-xs font-thin">
                    Can I change it later?
                  </p>
                </div>
              </div>
            </div>
          )}
          {signUpStep === 2 && (
            <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-7">
              <div className="w-full flex flex-col gap-2">
                <p className="text-slate-950 text-sm font-light">Passord</p>
                <div className="flex items-center gap-1 border border-slate-950 rounded-md">
                  <Input
                    className="w-full h-11 border-0 border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your password"
                  />
                  <EyeIcon className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col gap-2">
                  <p className="text-slate-950 text-sm font-light">
                    Repeat password
                  </p>
                  <div className="flex items-center gap-1 border border-slate-950 rounded-md">
                    <Input
                      className="w-full h-11 border-0 border-slate-950 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Repeat your password"
                    />
                    <EyeIcon className="mr-3 w-5 h-5 hover:cursor-pointer hover:opacity-50 transition-all" />
                  </div>
                </div>
                <div className="flex justify-start items-center">
                  <p className="text-slate-950 text-xs font-thin">
                    8 characters & 1 uppercase & 1 number & 1 special character
                  </p>
                </div>
              </div>
            </div>
          )}

          {signUpStep === 3 && (
            <div className="w-full flex-grow flex-shring-1 flex flex-col justify-center items-center gap-7"></div>
          )}
          <div className="w-full h-[125px] flex-shrink-0 flex flex-col gap-3">
            {signUpStep < 3 && (
              <button
                onClick={() =>
                  setSignUpStep(signUpStep => (signUpStep + 1) as 1 | 2 | 3)
                }
                className="w-full bg-slate-900 text-slate-50 px-3 py-3 border border-slate-950 rounded-sm text-sm font-light hover:opacity-85 transition-all"
              >
                Next
              </button>
            )}
            {signUpStep === 3 && (
              <Link
                to="/"
                className="w-full bg-slate-900 text-slate-50 px-3 py-3 border border-slate-950 rounded-sm text-sm font-light hover:opacity-85 transition-all text-center"
              >
                Finish
              </Link>
            )}
            {signUpStep < 3 && (
              <p className="w-full text-xs font-thin text-slate-950 flex justify-center items-center gap-1">
                Already have an account?
                <span
                  onClick={() => setAuthStage('signIn')}
                  className="text-slate-950 font-semibold hover:cursor-pointer hover:opacity-50 transition-all"
                >
                  Sign in
                </span>
              </p>
            )}
            <div className="w-full justify-center items-center flex gap-1 mt-auto">
              <button
                onClick={() => setSignUpStep(1)}
                className={clsx(
                  'w-2 h-2 border border-slate-950 rounded-full',
                  signUpStep >= 1 ? 'bg-slate-950' : 'bg-white'
                )}
              ></button>
              <button
                onClick={() => setSignUpStep(2)}
                className={clsx(
                  'w-2 h-2 border border-slate-950 rounded-full',
                  signUpStep >= 2 ? 'bg-slate-950' : 'bg-white'
                )}
              ></button>
              <button
                onClick={() => setSignUpStep(3)}
                className={clsx(
                  'w-2 h-2 border border-slate-950 rounded-full',
                  signUpStep >= 3 ? 'bg-slate-950' : 'bg-white'
                )}
              ></button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Logo = () => {
  return (
    <div className="flex items-center justify-center h-fit scale-150 ml-10">
      <svg
        width="200"
        height="50"
        viewBox="0 0 200 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="red">
          <polygon
            points="10,40 40,40 25,10"
            fill="none"
            stroke="red"
            strokeWidth="2"
          />
          <polygon points="10,40 40,40 25,30" fill="red" />
        </g>
        <text
          x="50"
          y="40"
          fill="black"
          fontFamily="Arial, sans-serif"
          fontSize="30"
        >
          Reksoft
        </text>
      </svg>
    </div>
  );
};

export const AuthLogo = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[500px]  h-full max-h-[675px] rounded-[2px] p-10 gap-10">
      {/*<Logo />*/}
      <img
        src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png"
        alt="logo"
        className="max-w-[225px]"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: 'linear',
        }}
        className="w-[225px] h-[225px] rounded-full border border-slate-950"
      >
        <ReactCurvedText
          text="Reksoft Reksoft Reksoft Reksoft Reksoft Reksoft Reksoft Reksoft Reksoft"
          width={225}
          height={225}
          cx={112.5}
          cy={112.5}
          rx={100}
          ry={100}
          startOffset={0}
          reversed={false}
          textProps={{
            style: {
              fontSize: 17.25,
              fontFamily: 'Montserrat',
              fontWeight: '400',
            },
          }}
        />
      </motion.div>
    </div>
  );
};

export const AuthPage = () => {
  const [authStage, setAuthStage] = useState<'signIn' | 'signUp'>('signIn');
  return (
    <AuthLayout>
      <div className="flex flex-col w-full max-w-[500px] h-full max-h-[675px]">
        <SignInCard
          visible={authStage === 'signIn'}
          setAuthStage={setAuthStage}
        />
        <SignUpCard
          visible={authStage === 'signUp'}
          setAuthStage={setAuthStage}
        />
      </div>
      <AuthLogo />
    </AuthLayout>
  );
};
