import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
// import registerServiceWorker from './registerServiceWorker';

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

function LandingPage(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <App />;
	}
	return <Login />;
}

ReactDOM.render(
	// Try changing to isLoggedIn={true}:
	<LandingPage isLoggedIn={false} />,
	document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
