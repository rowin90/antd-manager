import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import NoMatch from './pages/nomatch/index';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city';
import Order from './pages/order';
import OrderDetail from './pages/order/detail';
import Users from './pages/users/index';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import RichText from './pages/rich';
import Permission from './pages/permission';
import Admin from './admin';
import Common from './common';
import App from './App';

import DrugList from './pages/drug/list';
import DrugDetail from './pages/drug/detail';

import UserList from './pages/user/list';
import UserDetail from './pages/user/detail';
import UserEdit from './pages/user/edit';
import UserAnalyze from './pages/user/analyze';

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login} />
            <Route
              path='/common'
              render={() => (
                <Common>
                  <Route
                    path='/common/order/detail/:orderId'
                    component={OrderDetail}
                  />
                </Common>
              )}
            />
            <Route
              path='/'
              render={() => (
                <Admin>
                  <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/drug/list' component={DrugList} />
                    <Route path='/drug/detail' component={DrugDetail} />
                    <Route path='/user/list' component={UserList} />
                    <Route path='/user/detail' component={UserDetail} />
                    <Route path='/user/edit' component={UserEdit} />
                    <Route path='/user/analyze' component={UserAnalyze} />

                    <Route path='/ui/buttons' component={Buttons} />
                    <Route path='/ui/modals' component={Modals} />
                    <Route path='/ui/loadings' component={Loadings} />
                    <Route path='/ui/notification' component={Notice} />
                    <Route path='/ui/messages' component={Messages} />
                    <Route path='/ui/tabs' component={Tabs} />
                    <Route path='/ui/gallery' component={Gallery} />
                    <Route path='/ui/carousel' component={Carousel} />
                    <Route path='/form/login' component={FormLogin} />
                    <Route path='/form/reg' component={FormRegister} />
                    <Route path='/table/basic' component={BasicTable} />
                    <Route path='/table/high' component={HighTable} />
                    <Route path='/city' component={City} />
                    <Route path='/order' component={Order} />
                    <Route path='/users' component={Users} />
                    <Route path='/bikeMap' component={BikeMap} />
                    <Route path='/charts/bar' component={Bar} />
                    <Route path='/charts/pie' component={Pie} />
                    <Route path='/charts/line' component={Line} />
                    <Route path='/rich' component={RichText} />
                    <Route path='/permission' component={Permission} />
                    <Redirect to='/home' />
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )}
            />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}
