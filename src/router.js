import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login'
import Buttons from './pages/ui/button'
import NoMatch from './pages/nomatch/index';
import Admin from './admin'
import App from './App'

export default class IRouter extends React.Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route path="/order/detail" component={Login}/>
                </App>
            </HashRouter>
            
        )
    }
}