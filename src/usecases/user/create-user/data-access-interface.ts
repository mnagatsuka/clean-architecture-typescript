import { User } from "../../../entities/user/user";

/**
 * ユーザーデータアクセスのインターフェース
 */
export interface UserDataAccessInterface {
  /**
   * 新しいユーザーを保存します
   */
  save(user: User): Promise<void>;

  /**
   * 指定したメールアドレスのユーザーがすでに存在するか確認します
   */
  existsByEmail(email: string): Promise<boolean>;
}
