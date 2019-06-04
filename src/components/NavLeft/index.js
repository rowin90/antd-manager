import React from 'react';
import { Menu, Icon } from 'antd';
import MenuConfig from '../../config/menuConfig';
import './index.less';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '@/redux/action/home.js';

const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);

    this.setState({
      menuTreeNode
    });
  }

  handleClick = ({ item }) => {
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
  };
  // 菜单渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={`${item.key}`}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
      <div>
        <div className='logo'>
          <img src='/assets/logo-ant.svg' alt='' />
          <h1>康策中台</h1>
        </div>
        <Menu theme='dark' onClick={this.handleClick}>
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
