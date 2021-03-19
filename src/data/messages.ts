import { IMessage } from 'react-native-gifted-chat';

export const messages: IMessage[] = [
  {
    _id: 1,
    user: { _id: 1 },
    text: 'Hey! how are you doing?',
    createdAt: new Date('2021-01-09 10:08'),
  },
  {
    _id: 2,
    user: { _id: 1 },
    text:
      'Dolor culpa sunt eiusmod proident eu consequat incididunt enim incididunt irure ut deserunt veniam minim.',
    createdAt: new Date('2021-01-09 10:09'),
  },
  {
    _id: 3,
    user: { _id: 1 },
    text: 'Dolor culpa sunt eiusmod',
    createdAt: new Date('2021-01-09 10:10'),
  },
  {
    _id: 4,
    user: { _id: 2 },
    text:
      'Sit Lorem officia ea commodo voluptate quis cillum amet magna labore fugiat amet sint pariatur labore fugiat amet sint pariatur..',
    createdAt: new Date('2021-01-10 11:50'),
  },
  {
    _id: 5,
    user: { _id: 2 },
    text: 'labore fugiat amet sint pariatur labore fugiat amet sint pariatur..',
    createdAt: new Date('2021-01-10 11:51'),
  },
];
