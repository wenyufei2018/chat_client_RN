import uuid from "uuid";

export const selfUser: User = {
  _id: 1,
  name: 'Developer',
};

export const frinedUser: User = {
  _id: 2,
  name: 'React Native',
};

export const testUserMessages: IMessage[] = [
  {
    _id: uuid.v4(),
    content: '#awesome',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: 'Paris',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    type: 'text',
    sent: true,
    received: true,
  },
  {
    _id: uuid.v4(),
    content: 'Send me a picture!',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: '',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    sent: true,
    received: true,
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: 'Where are you?',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: 'Yes, and I use #GiftedChat!',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    sent: true,
    received: true,
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: 'Are you building a chat app?',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: '',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content:
      'It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
    },
    type: 'text',
    
  },
  {
    _id: uuid.v4(),
    content: 'React Native lets you build mobile apps using only JavaScript',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
    },
    type: 'text',
  },
  {
    _id: uuid.v4(),
    content: 'This is a system message.',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
    },
    type: 'text',
  },
];
