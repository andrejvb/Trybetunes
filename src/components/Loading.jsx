import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  render() {
    const { isLoading } = this.props;
    const loading = <h2>Carregando...</h2>;
    return (
      <div>
        { isLoading ? loading : null }
      </div>
    );
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loading;
