import Realm from 'realm';
import { realmConfig, UsersType, IUserReaml } from './schema';

export default class UserService {

  readonly Users: string = UsersType;

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
  public save(user: User) {
    try {
      this.realm.write(() => {
        this.realm.create(this.Users, user);
      });
    } catch (e) {
      console.warn('数据保存失败', this.Users, e);
    }
  }

  // 改
  public update(user: User) {

    try {
      this.realm.write(() => {
        this.realm.create<User>(this.Users, user, Realm.UpdateMode.Modified);
      });
    } catch (e) {
      console.warn('数据更新失败', this.Users, e);
    }
  }

  // 查
  public findAll(): User[] | undefined {
    try {
      const resultUser: User[] = [];
      for ( const user of this.realm.objects(this.Users)) {
        resultUser.push( {...user} );
      }
      return resultUser;
    } catch (e) {
      console.warn('查询数据失败', this.Users);
      return ;
    }
  }

  // 关闭
  public close() {
    try {
      this.realm.close();
    } catch (e) {
      console.warn('数据库关闭失败', this.Users);
    }
  }
}
