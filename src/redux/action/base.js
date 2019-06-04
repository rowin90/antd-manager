// action 类型
export const type = {
  PROVINCE_DIC: 'PROVINCE_DIC'
};

export function dispatch_province_dic(data) {
  let dic = { province: data.data };
  return {
    type: type.PROVINCE_DIC,
    data: dic
  };
}
