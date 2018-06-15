import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import routes from '../../routes';
import '../../App.css';
import 'semantic-ui-css/semantic.min.css';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DefaultLayout extends Component {

  render() {
    return (
			<React.Fragment>
				<Header />
          
        <ToastContainer autoClose={8000} />
				<div id="outer-container">
					<SideMenu />
					<div id="page-wrap">
						<BrowserRouter>
              <Switch>
                  {routes.map((route, idx) => {
                      return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                          <route.component {...props} />
                        )} />)
                        : (null);
                    },
                  )}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
						</BrowserRouter>
					</div>
				</div>         
       
			</React.Fragment>
		);
  }
}
export default DefaultLayout;
