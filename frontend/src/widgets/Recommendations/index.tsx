type UserType = {
  name: string;
  role: string;
  level: string;
  pic: string;
  badge: string;
};

const UserCard = ({ user }: { user: UserType }) => (
  <div className="flex items-center gap-2 rounded-sm border border-slate-200 p-3 relative">
    <div
      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-${user.badge} flex items-center justify-center`}
    >
      <span className="text-xs text-white">{user.badge}</span>
    </div>
    <div className="w-14 h-14 rounded-full bg-gray-300 border border-slate-900" />
    <div className="flex flex-col gap-1">
      <span className="text-sm text-foreground">{user.name}</span>
      <span className="text-xs text-muted-foreground">{user.role}</span>
      <span className="text-xs text-muted-foreground">{user.level}</span>
    </div>
  </div>
);

export const Recommendations = () => {
  return (
    <div className="col-span-3 grid grid-cols-1 grid-rows-2 gap-4">
      <div className="grid grid-cols-1 grid-rows-[25px_1fr] gap-4 bg-card shadow-default p-4 overflow-y-hidden relative border-radius-default">
        <h3 className="row-span-1 text-sm text-foreground">
          Рекомендованные каналы
        </h3>
        <div className="row-span-1 flex flex-col gap-3">
          {recommendations.map((user, index) => (
            <UserCard key={`rec_${index}`} user={user} />
          ))}
        </div>
        <button className="absolute bottom-0 right-0 w-full h-10 bg-card">
          <span className="w-full h-full text-xs flex justify-center items-center text-foreground bg-muted">
            See more
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 grid-rows-[25px_1fr] gap-4 bg-card shadow-default p-4 overflow-y-hidden relative border-radius-default">
        <h3 className="row-span-1 text-sm text-foreground">
          Подходящие вакансии
        </h3>
        <div className="row-span-1 flex flex-col gap-3">
          {contactsFollow.map((user, index) => (
            <UserCard key={`cf_${index}`} user={user} />
          ))}
        </div>
        <button className="absolute bottom-0 right-0 w-full h-10 bg-card">
          <span className="w-full h-full text-xs flex justify-center items-center text-foreground bg-muted">
            See more
          </span>
        </button>
      </div>
    </div>
  );
};

const recommendations: UserType[] = [
  {
    name: 'Nyarlathotep',
    role: 'Messenger',
    level: 'High Priest',
    pic: '',
    badge: 'ny',
  },
  {
    name: 'Yog-Sothoth',
    role: 'Gatekeeper',
    level: 'Elder God',
    pic: '',
    badge: 'ys',
  },
  {
    name: 'Shub-Niggurath',
    role: 'Black Goat',
    level: 'Outer God',
    pic: '',
    badge: 'sn',
  },
  {
    name: 'Azathoth',
    role: 'Nuclear Chaos',
    level: 'Outer God',
    pic: '',
    badge: 'az',
  },
  {
    name: 'Tsathoggua',
    role: 'Slumbering God',
    level: 'Great Old One',
    pic: '',
    badge: 'ts',
  },
];

const contactsFollow: UserType[] = [
  {
    name: 'Hastur',
    role: 'The Unspeakable',
    level: 'Great Old One',
    pic: '',
    badge: 'ha',
  },
  {
    name: 'Dagon',
    role: 'Deep One',
    level: 'Elder God',
    pic: '',
    badge: 'da',
  },
  {
    name: 'Yig',
    role: 'Father of Serpents',
    level: 'Great Old One',
    pic: '',
    badge: 'yi',
  },
  {
    name: 'Ghatanothoa',
    role: 'Obliterator',
    level: 'Great Old One',
    pic: '',
    badge: 'gh',
  },
  {
    name: 'Atlach-Nacha',
    role: 'Spider God',
    level: 'Great Old One',
    pic: '',
    badge: 'at',
  },
];
