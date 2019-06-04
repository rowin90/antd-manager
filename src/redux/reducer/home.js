// reducer 数据处理和包装
import { type } from './../action/home';

const initialState = {
  menuName: '首页'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      };
      break;
    default:
      return state;
      break;
  }
};
