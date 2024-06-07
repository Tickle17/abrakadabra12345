export const CardHeader = () => {
  return (
    <div className="w-full h-[75px] flex flex-col justify-center gap-2 flex-shrink-0">
      <h1 className="text-2xl font-light text-slate-950">
        Sign in to continue
      </h1>
      <p className="text-xs font-light text-slate-950">
        You need to sign in to access the app
      </p>
    </div>
  );
};
