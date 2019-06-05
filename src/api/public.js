import Axios from '@/axios';

class Public_API extends Axios {
  /**
   * 省市字典
   */
  getProvinceDic() {
    return this.axios('get', '/api/public/province_id_dic');
  }
}

export default new Public_API();
