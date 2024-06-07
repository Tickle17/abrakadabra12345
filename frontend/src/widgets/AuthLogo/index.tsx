import { ReksoftLogo, ReksoftSpinner } from './components';

export const AuthLogo = () => {
  return (
    <div className="flex flex-col lg:justify-center lg:items-center w-full max-w-[500px] h-fit lg:h-full max-h-[675px] rounded-[2px] px-10 md:px-0 lg:p-10 lg:gap-10">
      <ReksoftLogo />
      <ReksoftSpinner />
    </div>
  );
};
