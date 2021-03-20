import { useEffect, useState } from 'react';
import './Detail.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { PlayCircleOutline } from '@material-ui/icons';

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

  const [playlist, setPlaylist] = useState<any>(null);
  const [tracks, setTracks] = useState<any>([]);
  const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull>();
  const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();

  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    switch (type) {
      case 'artist':
        spotify.getArtist(id).then((artist: any) => {
          setArtist(artist);
          setImage(artist?.images[0].url);
          setTitle(artist?.name);
          setTracks(artist?.tracks);
        });
        break;
      case 'playlist':
        spotify.getPlaylist(id).then((playlist: any) => {
          setPlaylist(playlist);
          setTracks(playlist.tracks);
          setImage(playlist?.images[0].url);
          setTitle(playlist?.name);
        });
        break;
      case 'album':
        spotify.getAlbum(id).then((album: any) => {
          setAlbum(album);
          setImage(album?.images[0].url);
          setTitle(album?.name);
          console.log('album', album);
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
        <div className="detail-view__header-info-image">
          <img src={image} alt="albumart" />
        </div>
        <div className="detail-view__header-info-metadata">
          <span className="detail-view__header-info-type">{type}</span>
          <h1 className="detail-view__header-info-title">{title}</h1>
        </div>
      </div>
      <div className="detail-view__user-controls">
        <PlayCircleOutline fontSize="large" className="footer__icon" />
      </div>
      <div className="detail-view__user-list">
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
                    <TableRow key={index}>
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
