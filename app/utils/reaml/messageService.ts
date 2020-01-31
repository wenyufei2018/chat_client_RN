import Realm from 'realm';
import {realmConfig, UsersType, IUserReaml} from './schema';

export default class MessageService {

  readonly Users: string = UsersType;
  
  // @ts-ignore
  public realm: Realm;

  private config: Realm.Configuration = realmConfig;

  constructor() {
    try {
      this.realm = new Realm(this.config);
    } catch (e) {
      console.warn('数据库开启失败');
    }
  }

  // 增
  public saveOneUser(messages: IMessage[], user: User) {
    try {
      this.realm.write(() => {
        const userMessage = this.realm.create<IUserReaml>(this.Users, user, Realm.UpdateMode.Modified).messages;
        if (!!userMessage) {
          for (const message of messages) {
            userMessage.push(message);
          }
        } else {
          console.error('发送严重错误');
        }
      });
    } catch (e) {
      console.warn('数据保存失败', this.Users, e);
    }
  }

  // 查

  public findAll(user: User): IMessage[] | undefined {
    try {
      // @ts-ignore
      const messages = this.realm.objects(this.Users).filtered(`_id=${user._id}`)[0].messages;
      const resultMessages: IMessage[] = [];
      for ( const message of messages) {
        resultMessages.push({...message, user: {...message.user[0]}});
      }
      return resultMessages;
    } catch (e) {
      console.warn('查询数据失败', e);
      return ;
    }
  }

  // 关闭
  public close() {
    try {
      this.realm.close();
    } catch (e) {
      console.warn('数据库关闭失败');
    }
  }
}
