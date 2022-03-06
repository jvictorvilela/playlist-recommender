import React from 'react'
import Playlist from './Playlist'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchCity: '',
      playlistObj: null,
      loadingSearch: false,
      loadingGeolocation: false,
      error: null,
    }

    this.searchChange = this.searchChange.bind(this);
  }

  searchChange(event) {
    this.setState({ searchCity: event.target.value });
  }

  async searchPlaylistAction() {
    try {
      this.setState({
        loadingSearch: true,
        error: null
      })
      const response = await axios.get('playlist', {
        baseURL: process.env.REACT_APP_BACKEND_URL_BASE,
        params: {
          city: this.state.searchCity
        }
      })
      this.setState({
        playlistObj: response.data,
        loadingSearch: false,
        error: null
      })
    } catch (err) {
      this.setState({
        loadingSearch: false,
        error: 'Erro ao buscar playlist. Verifique o nome da cidade.'
      })
    }
  }

  async searchPlaylistByGeolocation(lat, lon) {
    try {
      this.setState({
        loadingGeolocation: true,
        error: null
      })
      const response = await axios.get('playlist', {
        baseURL: process.env.REACT_APP_BACKEND_URL_BASE,
        params: {
          lat: lat,
          lon: lon
        }
      })
      this.setState({
        playlistObj: response.data,
        loadingGeolocation: false,
        error: null
      })
      console.log(response.data)
    } catch (err) {
      this.setState({
        loadingGeolocation: false,
        error: 'Erro ao buscar playlist. Verifique o nome da cidade.'
      })
    }
  }

  searchPlaylistWithGeolocationAction() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.searchPlaylistByGeolocation(position.coords.latitude, position.coords.longitude)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container py-3">
          <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
            <h3 className="mb-3">Recomendação de playlist</h3>
            {this.state.error ?
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Erro!</strong> {this.state.error}
              </div> : null
            }
            <div className="search-bar mb-5">
              <div className="row g-3">
                <div className="col-lg-5 col-sm-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Digite o nome da cidade"
                    value={this.state.value}
                    onChange={this.searchChange}
                  />
                </div>
                <div className="col-lg-auto col-md-12">
                  <button className="btn btn-primary w-100" onClick={() => this.searchPlaylistAction()} disabled={this.state.loadingSearch}>
                    {!this.state.loadingSearch ? 'Buscar playlist' : <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Carregando...</span></div>}
                  </button>
                </div>
                <div className="col-lg-auto col-md-12">
                  <button className="btn btn-secondary w-100" onClick={() => this.searchPlaylistWithGeolocationAction()} disabled={this.state.loadingGeolocation}>
                    {!this.state.loadingGeolocation ? 'Usar localização' : <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Carregando...</span></div>}
                  </button>
                </div>
              </div>
            </div>
            <Playlist object={this.state.playlistObj} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
