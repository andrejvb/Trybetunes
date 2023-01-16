import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
        <Loading isLoading={ isLoading } />
        <p data-testid="header-user-name">{ userName }</p>
      </header>
    );
  }
}

export default Header;
