import "./SongRow.css"
import { Link } from 'react-router-dom';
//@ts-ignore
function SongRow({ track }) {
  return (
    <div className="song-row">
      <Link to={`/album/${track?.album.id}`}>
        <img
          className="detail-view-tracklist-art"
          src={track?.album.images[0].url}
          alt={`Album art ${track?.name}`}
        />
      </Link>
      <div className="song-row-info">
        <h1>{track.name}</h1>
        <p>
          {track?.artists
            .map((artist: SpotifyApi.ArtistObjectFull) => artist.name)
            .join(', ')}
          {track.album_name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
