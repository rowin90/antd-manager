import React from 'react';
import { connect } from 'react-redux';
import { dispatch_province_dic } from '@/redux/action/base';
import Public_API from '@/api/public';
@connect(
  state => state,
  {
    dispatch_province_dic
  }
)
class App extends React.Component {
  async componentWillMount() {
    let res = await Public_API.getProvinceDic();
    this.props.dispatch_province_dic(res);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default App;
