import Axios from '@/utils/axios';

class User_API extends Axios {
  // 登录
  login({ user_name, pwd }) {
    return this.axios('post', '/login', { user_name, pwd });
  }
}

export default new User_API();
