import Axios from '@/utils/axios';

class Home_API extends Axios {
  /**
   * 基础数据
   */
  getBaseData() {
    return this.axios('get', '/api/index/basedata');
  }
  /**
   * uv pv数据
   * @param {String} start_date // 开始时间
   * @param {String} end_date  // 结束时间
   */
  getVisitData({ start_date, end_date }) {
    return this.axios(
      'get',
      `/api/index/visit?start_date=${start_date}&end_date=${end_date}`
    );
  }
  /**
   * 省市数据
   * @param {String} start_date // 开始时间
   * @param {String} end_date  // 结束时间
   */
  getAreaData({ start_date, end_date }) {
    return this.axios(
      'get',
      `/api/index/visit_area?start_date=${start_date}&end_date=${end_date}`
    );
  }
}

export default new Home_API();
