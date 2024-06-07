export type UserType = {
  name: string;
  role: string;
  level: string;
  pic: string;
};

export type PostType = {
  author: UserType;
  content: string;
  date: string;
  likes: number;
  comments: number;
};

export const POST_ARRAY: PostType[] = [
  {
    author: {
      name: 'Abdul Alhazred',
      role: 'Mad Arab',
      level: 'High Priest',
      pic: 'https://dummyurl.com/user1.jpg',
    },
    content: "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.",
    date: '14 Mar 1927',
    likes: 666,
    comments: 42,
  },
  {
    author: {
      name: 'Randolph Carter',
      role: 'Sorcerer',
      level: 'Adept',
      pic: 'https://dummyurl.com/user4.jpg',
    },
    content: 'The silver key will unlock the gate to all mysteries.',
    date: '07 Nov 1930',
    likes: 220,
    comments: 40,
  },
  {
    author: {
      name: 'Wilbur Whateley',
      role: 'Sorcerer',
      level: 'Adept',
      pic: 'https://dummyurl.com/user2.jpg',
    },
    content: "Iä! Iä! Cthulhu fhtagn! Ngahh’ nilgh'ri hupadgh shugg.",
    date: '21 Dec 1928',
    likes: 777,
    comments: 99,
  },
  {
    author: {
      name: 'Asenath Waite',
      role: 'Librarian',
      level: 'Senior',
      pic: 'https://dummyurl.com/user5.jpg',
    },
    content: 'The abyss yawns and we descend into the unknown.',
    date: '15 May 1931',
    likes: 190,
    comments: 30,
  },
  {
    author: {
      name: 'Henry Armitage',
      role: 'Librarian',
      level: 'Senior',
      pic: 'https://dummyurl.com/user3.jpg',
    },
    content: "Y'll'thklu nafl'fhtagn n'ghft Cthulhu r'luhhor wgah'n.",
    date: '02 Feb 1929',
    likes: 888,
    comments: 55,
  },
  {
    author: {
      name: 'Nyarlathotep',
      role: 'Messenger',
      level: 'High Priest',
      pic: 'https://dummyurl.com/user6.jpg',
    },
    content: 'The crawling chaos is ever watchful.',
    date: '01 Jan 1925',
    likes: 300,
    comments: 50,
  },
  {
    author: {
      name: 'Dr. Herbert West',
      role: 'Scientist',
      level: 'Researcher',
      pic: 'https://dummyurl.com/user7.jpg',
    },
    content: 'Death is but a doorway, time is but a window.',
    date: '10 Oct 1927',
    likes: 250,
    comments: 45,
  },
  {
    author: {
      name: 'Joseph Curwen',
      role: 'Sorcerer',
      level: 'Master',
      pic: 'https://dummyurl.com/user8.jpg',
    },
    content: 'From beyond the veil, the old gods whisper.',
    date: '18 Aug 1926',
    likes: 270,
    comments: 38,
  },
  {
    author: {
      name: 'Keziah Mason',
      role: 'Witch',
      level: 'Adept',
      pic: 'https://dummyurl.com/user9.jpg',
    },
    content: 'Through the angles of time, we shall pass.',
    date: '25 Mar 1928',
    likes: 230,
    comments: 33,
  },
  {
    author: {
      name: 'Obed Marsh',
      role: 'Captain',
      level: 'Senior',
      pic: 'https://dummyurl.com/user10.jpg',
    },
    content: "The deep ones rise from the ocean's depths.",
    date: '30 Apr 1932',
    likes: 210,
    comments: 29,
  },
];
