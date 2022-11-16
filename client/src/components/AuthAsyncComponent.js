import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import auth from '../services/auth';
import Loader from '../components/Loader';

const AuthAsyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null,
      redirectToLogin: false,
    };

    async componentDidMount() {
      try {
        await auth.authenticate();
        importComponent().then(cmp => {
          this.setState({ component: cmp.default });
        });
      } catch (error) {
        this.setState(() => ({
          redirectToLogin: true,
        }));
      }
    }

    render() {
      const C = this.state.component;
      const { redirectToLogin } = this.state;

      if (redirectToLogin === true) {
        return <Redirect to="/login" />;
      }

      return C ? <C {...this.props} /> : <Loader />;
    }
  };
};

export default AuthAsyncComponent;
