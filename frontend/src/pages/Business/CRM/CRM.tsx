import React from 'react';
import { AppLayout } from '@/shared/layouts';

interface CardProps {
  type: string;
  title: string;
  date: string;
  comments: number;
  attachments: number;
  avatar: string;
}

interface ColumnProps {
  title: string;
  count: number;
  cards: CardProps[];
}

const ChadCNComponent: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex flex-col col-span-12 gap-4 bg-gray-100 shadow-sm p-4 border-radius-default">
        <div className="flex flex-col w-full h-full overflow-auto text-gray-700  bg-gradient-to-tr from-black-200 via-red-300 to-red-100">
          <div className="px-10 mt-6">
            <h1 className="text-2xl font-bold">CRM</h1>
          </div>
          <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
            <Column title="Отклики" count={6} cards={backlogCards} />
            <Column title="Назначено интервью" count={3} cards={readyCards} />
            <Column title="Технический этап" count={2} cards={doingCards} />
            <Column title="Review" count={3} cards={reviewCards} />
            <Column title="Blocked" count={1} cards={blockedCards} />
            <Column title="Done" count={3} cards={doneCards} />
            <div className="flex-shrink-0 w-6"></div>
          </div>
          <a
            className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-blue-700 rounded-full shadow-lg hover:bg-blue-800"
            href="https://twitter.com/lofiui"
            target="_top"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </svg>
            </div>
            <span className="ml-1 text-sm leading-none">@lofiui</span>
          </a>
        </div>
      </div>
    </AppLayout>
  );
};

const Column: React.FC<ColumnProps> = ({ title, count, cards }) => {
  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {count}
        </span>
        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-700 rounded hover:bg-indigo-700 hover:text-white">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col pb-2 overflow-auto">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  type,
  title,
  date,
  comments,
  attachments,
  avatar,
}) => {
  const colors: { [key: string]: string } = {
    Design: 'text-pink-500 bg-pink-100',
    Dev: 'text-green-500 bg-green-100',
    Copywriting: 'text-yellow-500 bg-yellow-100',
  };

  return (
    <div
      className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
      draggable="true"
    >
      <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      <span
        className={`flex items-center h-6 px-3 text-xs font-semibold rounded-full ${colors[type]}`}
      >
        {type}
      </span>
      <h4 className="mt-3 text-sm font-medium">{title}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">{date}</span>
        </div>
        <div className="relative flex items-center ml-4">
          <svg
            className="relative w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">{comments}</span>
        </div>
        <div className="flex items-center ml-4">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">{attachments}</span>
        </div>
        <img
          className="w-6 h-6 ml-auto rounded-full"
          src={avatar}
          alt="avatar"
        />
      </div>
    </div>
  );
};

// Example data
const backlogCards: CardProps[] = [
  {
    type: 'Design',
    title: 'This is the title of the card for the thing that needs to be done.',
    date: 'Dec 12',
    comments: 4,
    attachments: 1,
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  // Add more card objects as needed
];

const readyCards: CardProps[] = [
  {
    type: 'Dev',
    title: 'This is the title of the card for the thing that needs to be done.',
    date: 'Dec 12',
    comments: 4,
    attachments: 1,
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  // Add more card objects as needed
];

const doingCards: CardProps[] = [
  {
    type: 'Design',
    title: 'This is the title of the card for the thing that needs to be done.',
    date: 'Dec 12',
    comments: 4,
    attachments: 1,
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  // Add more card objects as needed
];

const reviewCards: CardProps[] = [
  {
    type: 'Copywriting',
    title: 'This is the title of the card for the thing that needs to be done.',
    date: 'Dec 12',
    comments: 4,
    attachments: 1,
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  // Add more card objects as needed
];

const blockedCards: CardProps[] = [
  {
    type: 'Design',
    title: 'This is the title of the card for the thing that needs to be done.',
    date: 'Dec 12',
    comments: 4,
    attachments: 1,
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  // Add more card objects as needed
];

const doneCards: CardProps[] = [
  {
    type: 'Dev',
    title: 'This is the title of the card for the thing that needs to be done.',
    date: 'Dec 12',
    comments: 4,
    attachments: 1,
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  // Add more card objects as needed
];

export default ChadCNComponent;
