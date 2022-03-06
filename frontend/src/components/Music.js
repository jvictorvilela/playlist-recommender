function Music(props) {
  return (
    <div className="music card mb-2 ps-3 pe-2 py-2 d-flex justify-content-between flex-row">
      <div className="d-flex flex-column">
        <b>{props.object.name}</b>
        <span className="text-muted">{props.object.artistName}</span>
      </div>
      <a href={props.object.musicUrl} target="_blank" className="btn btn-sm d-flex align-items-center">Ouvir <i className="fa-solid fa-play ms-2"></i></a>
    </div>
  );
}

export default Music;
