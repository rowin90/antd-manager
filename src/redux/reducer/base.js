// reducer 数据处理和包装
import { type } from './../action/base';

const initState = {
  province: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case type.PROVINCE_DIC:
      return {
        ...state,
        ...action.data
      };
      break;
    default:
      return initState;
      break;
  }
};
