export const CardHeader = () => {
  return (
    <div className="w-full h-[75px] flex flex-col justify-center gap-2 flex-shrink-0">
      <h1 className="text-2xl font-light text-slate-950">
        Войдите, чтобы продолжить
      </h1>
      <p className="text-xs font-light text-slate-950">
        Для использования приложения необходимо авторизоваться
      </p>
    </div>
  );
};
