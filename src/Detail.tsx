import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Container } from '@material-ui/core';
import { PlayCircleOutline } from '@material-ui/icons';

import './Detail.css';
import './Controls.css';
import SpotifyWebApi from 'spotify-web-api-js';

interface DetailProps {
  type?: 'artist' | 'album' | 'playlist';
  match?: any;
  spotify?: SpotifyWebApi.SpotifyWebApiJs;
}

interface Albums {
  singles: SpotifyApi.AlbumObjectFull[];
  albums: SpotifyApi.AlbumObjectFull[];
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
  const [albums, setAlbums] = useState<Albums>({ singles: [], albums: [] });
  const [followers, setFollowers] = useState<number>(0);

  useEffect(() => {
    if (spotify) {
      switch (type) {
        case 'artist':
          spotify.getArtist(id).then((artist: SpotifyApi.ArtistObjectFull) => {
            console.log('artist', artist);
            setImage(artist?.images[0].url);
            setTitle(artist?.name);
            setFollowers(artist?.followers.total);
          });
          spotify.getArtistAlbums(id).then((albums: any) => {
            const singles: SpotifyApi.AlbumObjectFull[] = albums.items.filter(
              (album: SpotifyApi.AlbumObjectFull) =>
                album.album_type === 'single'
            );
            const fulllength: SpotifyApi.AlbumObjectFull[] = albums.items.filter(
              (album: SpotifyApi.AlbumObjectFull) =>
                album.album_type === 'album'
            );

            setAlbums({ singles: singles, albums: fulllength });
          });
          spotify
            .getArtistTopTracks(id, 'US')
            .then((top: SpotifyApi.ArtistsTopTracksResponse) => {
              setTracks(top?.tracks);
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
    }
  }, [type, id, spotify]);

  return (
    <div className="detail-view">
      <div
        className="detail-view__header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)), url(${image})`,
        }}
      >
        {type === 'artist' ? (
          <></>
        ) : (
          <div className="detail-view__header-info-image">
            <img
              className="detail-view__header-info-image_background"
              src={image}
              alt="albumart"
            />
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
          <h6 className="detail-view__header-info-artist">{followers}</h6>
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
      <Container>
        <Grid container>
          <Grid item lg>
            {type === 'artist' ? <h1>Discography</h1> : <></>}
          </Grid>
          <Grid item lg>
            {type === 'artist' ? (
              <>
                <h2>Albums</h2>
                <ul>
                  {albums.albums.map((i: SpotifyApi.AlbumObjectFull) => (
                    <li>{i.name}</li>
                  ))}
                </ul>
                <h2>Singles</h2>
                <ul>
                  {albums.singles.map((i: SpotifyApi.AlbumObjectFull) => (
                    <li>{i.name}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p></p>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg>
            {type === 'artist' ? <h1>Appears On</h1> : <></>}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg>
            {type === 'artist' ? <h1>Related Artists</h1> : <></>}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Detail;
