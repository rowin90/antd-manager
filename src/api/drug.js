import Axios from '@/utils/axios';

class Drug_API extends Axios {
  /**
   * 搜索药品
   * @param {Number} type  // 搜索类型 1:按照药品准字号 2:按照药品名称
   * @param {String} key  // 关键字
   */
  search({ type, key }) {
    return this.axios('post', '/api/drug/search', { type, key });
  }
  /**
   * 删除药品
   * @param {String} drug_id  // id
   */
  delete({ drug_id }) {
    return this.axios('post', '/api/drug/delete', { drug_id });
  }
  /**
   * 新增药品
   * @param {Object} body
   */
  add({ data }) {
    return this.axios('post', '/api/drug/add', { ...data });
  }
  /**
   * 编辑药品
   * @param {Object} body
   */
  edit({ data }) {
    return this.axios('post', '/api/drug/edit', { ...data });
  }
  /**
   * 药品详情
   * @param {String} drug_id  // id
   */
  detail({ drug_id }) {
    return this.axios('post', '/api/drug/detail', { drug_id });
  }
}

export default new Drug_API();
