export const UsersType = 'Users';
export const MessagesType = 'Messages';

export interface IUserReaml {
  _id: number;
  name: string;
  avatar: string;
  messages: IMessage[];
}

const UsersSchema: Realm.ObjectSchema = {
  name: UsersType,
  primaryKey: '_id',
  properties: {
    _id: { type: 'int', optional: false },
    name: {type: 'string', default: '默认名字'},
    avatar: {type: 'string', default: '默认头像'},
    messages: {type: `${MessagesType}[]`, default: []},
  },
};

const MessagesSchema: Realm.ObjectSchema = {
  name: MessagesType,
  primaryKey: '_id',
  properties: {
    _id: { type: 'string', optional: false },
    createdAt: {type: 'date', default: new Date(), indexed: true},
    user: {type: 'linkingObjects', objectType: UsersType, property: 'messages'},
    type: 'string',
    content: 'string',
    sent: 'bool?',
    received: 'bool?',
    pending: 'bool?',
  },
};

export const realmConfig: Realm.Configuration = {
  schema: [ UsersSchema, MessagesSchema],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    // console.warn('开始迁移');
    // if (oldRealm.schemaVersion < 1) {
    //   const oldObjects = oldRealm.objects<IMessage>(MessagesSchema.name);
    //   const newObjects = newRealm.objects<IMessage>(MessagesSchema.name);

    //   // loop through all objects and set the name property in the new schema
    //   for (let i = 0; i < oldObjects.length; i++) {
    //     newObjects[i]._id = oldObjects[i]._id +　'';
    //   }
    // }
  },
};
