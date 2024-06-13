import { useProfileStore } from '@/app/store/slices/profileSlice.ts';

export const UserDetails = () => {
  const { profileData } = useProfileStore();

  return (
    <div className="flex flex-col gap-4 col-span-3 p-6 bg-white shadow-sm">
      <div className="flex justify-center items-center gap-4 pb-3 border-b border-slate-200">
        <img
          className="shrink-0 w-16 h-16 rounded-full border-2 border-slate-900 object-cover"
          src={
            profileData.photoUrl.length > 0
              ? profileData.photoUrl
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Baldassare_Castiglione%2C_by_Raffaello_Sanzio%2C_from_C2RMF_retouched.jpg/440px-Baldassare_Castiglione%2C_by_Raffaello_Sanzio%2C_from_C2RMF_retouched.jpg'
          }
        />
        <div className="flex flex-col">
          <h2 className="w-fit h-full font-thin text-pretty text-xl rounded-full text-slate-700">
            {profileData.fullName.length > 0
              ? profileData.fullName
              : 'Baldassare'}
          </h2>
          {profileData.fullName.length <= 0 && (
            <h2 className="w-fit h-full font-thin text-pretty text-xl rounded-full text-slate-700">
              Castiglione
            </h2>
          )}
        </div>
      </div>
      <p className="text-sm text-slate-700 pb-3 border-b border-slate-200">
        {profileData.gitlabUrl.length > 0
          ? profileData.gitlabUrl
          : '@baldassarecastiglione'}
      </p>
      <div className="flex gap-3">
        <p className="w-max text-xs text-slate-500 items-center">
          Frontend Developer
        </p>
        <span className="text-[10px] text-slate-100 bg-indigo-900 px-[4px] py-[2px]">
          Senior
        </span>
      </div>
      <p className="text-xs text-slate-500 pb-3 border-b border-slate-200">
        Nitroglycerin AB / <span>Vinterviken</span>
      </p>
      <div className="flex flex-col">
        <p className="text-xs text-slate-500 pb-3">
          Following: <span>35</span>
        </p>
        <p className="text-xs text-slate-500 pb-3">
          Followers: <span>6549</span>
        </p>
        <p className="text-xs text-slate-500 pb-3">
          Posts: <span>6549</span>
        </p>
      </div>
    </div>
  );
};
