import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    userName: '',
    disableButton: true,
    loggedIn: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const minValid = 3;
      const { userName } = this.state;
      if (userName.length >= minValid) {
        this.setState({ disableButton: false });
      } else {
        this.setState({ disableButton: true });
      }
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({ isLoading: true });
    createUser({ name: userName })
      .then(() => {
        this.setState({ isLoading: false, loggedIn: true });
      });
  };

  render() {
    const { userName, disableButton, isLoading, loggedIn } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        {isLoading ? (<Loading isLoading={ isLoading } />) : (
          <form>
            <label htmlFor="userName">
              <input
                type="text"
                name="userName"
                id="userName"
                value={ userName }
                onChange={ handleChange }
                data-testid="login-name-input"
              />
            </label>
            <br />
            <button
              type="submit"
              disabled={ disableButton }
              onClick={ handleClick }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
            {loggedIn ? (<Redirect to="/search" />) : null}
          </form>
        )}
      </div>
    );
  }
}

export default Login;
