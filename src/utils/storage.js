import storage from 'good-storage';

const USER_INFO = '__user_info__';

// 设置用户基本信息
export function setUserInfo_STORAGE(userInfo) {
  return storage.set(USER_INFO, userInfo);
}
// 获取用户基本信息
export async function getUserInfo_STORAGE() {
  return storage.get(USER_INFO);
}
