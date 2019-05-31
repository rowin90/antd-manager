import Axios from '@/utils/axios';

class User_API extends Axios {
  // 登录
  login({ user_name, pwd }) {
    return this.axios('post', '/login', { user_name, pwd });
  }
  /**
   * 新增用户
   * @param {Object} data
   *    + @param username
   *    + @param password
   *    + @param type
   */
  add({ data }) {
    return this.axios('post', '/api/user/add', { ...data });
  }
  /**
   * 用户列表
   * @param {Object} data
   */
  search(data) {
    return this.axios('post', '/api/user/users', { ...data });
  }
  /**
   * 更新用户
   * @param {Object} data
   */
  edit(data) {
    return this.axios('post', '/api/user/update', { ...data });
  }
  /**
   * 激活用户
   * @param {String} user_id
   */
  active({ user_id }) {
    return this.axios('get', `/api/user/active?user_id=${user_id}`);
  }
  /**
   * 用户详情
   * @param {String} user_id
   */
  detail({ user_id }) {
    return this.axios('get', `/api/user/info?user_id=${user_id}`);
  }
}

export default new User_API();
