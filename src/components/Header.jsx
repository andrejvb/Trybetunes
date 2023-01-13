import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    isLoading: true,
    userName: '',
  };

  componentDidMount() {
    this.handleUserName();
  }

  handleUserName = () => {
    getUser()
      .then((user) => {
        this.setState({ isLoading: false, userName: user.name }, () => {
          const { userName } = this.state;
          return userName;
        });
      });
  };

  render() {
    const { state: { isLoading, userName } } = this;
    return (
      <div data-testid="header-component">
        <Loading isLoading={ isLoading } />
        <p data-testid="header-user-name">{ userName }</p>
      </div>
    );
  }
}

export default Header;
