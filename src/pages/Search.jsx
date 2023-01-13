import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchItem: '',
  };

  render() {
    const { searchItem } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
        <form>
          <label htmlFor="artistName">
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ ({ target }) => this.setState({
                searchItem: target.value,
              }) }
            />
          </label>
          <button
            disabled={ searchItem.length < 2 }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </>
    );
  }
}

export default Search;
