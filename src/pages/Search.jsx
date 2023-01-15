import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsApi from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    searchItem: '',
    loading: false,
    response: [],
    invalidSearch: false,
    // artista: '',
  };

  searchClick = async () => {
    const { searchItem } = this.state;
    this.setState({
      loading: true,
      // artista: searchItem,
    });
    const response = await searchAlbumsApi(searchItem);
    if (response.length === 0) {
      this.setState({
        invalidSearch: true,
      });
    } else {
      this.setState({
        response,
        invalidSearch: false,
        result: `Resultado de álbuns de: ${searchItem}`,
        searchItem: '',
      });
    }
  };

  render() {
    const { searchItem, response, loading, invalidSearch, result } = this.state;

    return (
      <>
        <Header />
        { loading
          ? (<Loading />)
          : null }
        <div data-testid="page-search">
          <form>
            <label htmlFor="artistName">
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ ({ target }) => this.setState({
                  searchItem: target.value,
                }) }
                value={ searchItem }
              />
            </label>
            <button
              disabled={ searchItem.length < 2 }
              data-testid="search-artist-button"
              type="button"
              onClick={ this.searchClick }
            >
              Pesquisar
            </button>
            <section>
              {response.length > 0
        && (
          <div>
            { result }
          </div>)}
              {response.map((e) => (
                <div
                  key={ e.artistID }
                >
                  <Link
                    data-testid={ `link-to-album-${e.collectionId}` }
                    to={ `/album/${e.collectionId}` }
                  >
                    <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                    {e.collectionName}
                  </Link>
                </div>
              ))}
              {invalidSearch && (<span>Nenhum álbum foi encontrado</span>)}
            </section>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
