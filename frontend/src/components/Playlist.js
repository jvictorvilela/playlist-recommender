import Music from './Music'

function Playlist(props) {
  if (props.object != null) {
    return (
      <div>
        <div className="row mb-4">
          <div className="col-3">
            <div className="rounded" style={{
              paddingTop: '100%',
              backgroundImage: `url("${props.object.imageUrl}")`,
              backgroundSize: 'cover'
            }}>
            </div>
          </div>
          <div className="col-9 d-flex flex-column align-items-start justify-content-center">
            <h5>{props.object.name}</h5>
            <p className="text-muted">{props.object.description}</p>
            <a href={props.object.url} target="_blank" className="btn btn-sm btn-outline-dark">Abrir no Spotify <i className="fa-brands fa-spotify ms-1"></i></a>
          </div>
        </div>
        <div className="musics">
          {props.object.musics.map((item, index) => (
            <Music key={index} object={item}/>
          ))}
        </div>
      </div>
    );
  }
  return null
}

export default Playlist;
