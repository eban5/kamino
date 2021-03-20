import { RouteProps, RouterProps, withRouter } from 'react-router';
import { useEffect, useState } from 'react';
import './Detail.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import { Container, Grid } from '@material-ui/core';
import { useDataLayerValue } from './DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';

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

  const [detailId, setDetailId] = useState<string>('');
  const [playlist, setPlaylist] = useState<any>(null);
  const [tracks, setTracks] = useState<any>([]);
  const [artist, setArtist] = useState<any>(null);

  useEffect(() => {
    if (type === 'artist') {
      spotify.getArtist(id).then((artist: any) => {
        setArtist(artist);
        console.log(artist);
      });
    }

    if (id) {
      spotify.getPlaylist(id).then((playlist: any) => {
        setPlaylist(playlist);
        setTracks(playlist.tracks);
        console.log(playlist);
        console.log('trakcs', playlist.tracks);
      });
    }
  }, [id]);

  return (
    <div className="detail-view">
      <div className="detail-view__header">
        <div className="detail-view__header-info--image">
          <img
            src={
              type === 'artist'
                ? artist?.images[0].url
                : playlist?.images[0].url
            }
            height={150}
            width={150}
            alt="albumart"
          />
        </div>
        <div className="detail-view__header-info-metadata">
          <span className="detail-view__header-info--type">{type}</span>
          <h1 className="detail-view__header-info-title">
            {type === 'artist' ? artist?.name : playlist?.name}
          </h1>
        </div>
      </div>
      <div className="detail-view__user-controls"></div>
      <div className="detail-view__user-list">
        <TableContainer>
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
                tracks.items?.map((item: any, index: number) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.track.name}</TableCell>
                      <TableCell>
                        {millisToMinutesAndSeconds(item.track.duration_ms)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <h1>{}</h1>
    </div>
  );
};

export default Detail;
