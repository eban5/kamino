import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PlayCircleOutline } from '@material-ui/icons';

import './Detail.css';
import './Controls.css';

interface DetailProps {
  type?: 'artist' | 'album' | 'playlist';
  match?: any;
  spotify?: any;
}

const millisToMinutesAndSeconds = (millis: number): string => {
  var minutes: number = Math.floor(millis / 60000);
  var seconds: any = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const Detail = (props: DetailProps) => {
  const { type } = props;
  const { spotify } = props;
  const {
    match: { params },
  } = props;
  const id: string = params.id;

  const [tracks, setTracks] = useState<any>([]);
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    switch (type) {
      case 'artist':
        spotify.getArtist(id).then((artist: any) => {
          setImage(artist?.images[0].url);
          setTitle(artist?.name);
          setTracks(artist?.tracks);
        });
        break;
      case 'playlist':
        spotify.getPlaylist(id).then((playlist: any) => {
          const playlistTracks: any[] = playlist.tracks.items.map(
            (item: any) => item.track
          );
          setImage(playlist?.images[0].url);
          setTitle(playlist?.name);
          setTracks(playlistTracks);
        });
        break;
      case 'album':
        spotify.getAlbum(id).then((album: any) => {
          const artistList: string = album?.artists
            .map((item: any) => item.name)
            .join(', ');

          setImage(album?.images[0].url);
          setTitle(album?.name);
          setName(artistList);
          setTracks(album?.tracks.items);
        });
        break;

      default:
        break;
    }
  }, [type, id, spotify]);

  return (
    <div className="detail-view">
      <div className="detail-view__header">
        {type === 'artist' ? (
          <></>
        ) : (
          <div className="detail-view__header-info-image">
            <img src={image} alt="albumart" />
          </div>
        )}
        <div className="detail-view__header-info-metadata">
          <div className="detail-view__header-info-type">{type}</div>
          {type !== 'artist' && title.length > 15 ? (
            <h1 className="detail-view__header-info-title-long">{title}</h1>
          ) : (
            <h1 className="detail-view__header-info-title">{title}</h1>
          )}
          <h5 className="detail-view__header-info-artist">{name}</h5>
        </div>
      </div>
      <div className="detail-view__user-controls">
        <PlayCircleOutline fontSize="large" className="footer__icon" />
      </div>
      <div className="detail-view__user-list">
        {type === 'artist' ? <h1>Popular</h1> : <></>}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Track</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks &&
                tracks.map((item: any, index: number) => {
                  return (
                    <TableRow key={index} className="detail-view-tracklist-row">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>
                        {millisToMinutesAndSeconds(item.duration_ms)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Detail;
