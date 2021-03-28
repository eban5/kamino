import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Card from './Card';
import { PlayCircleOutline } from '@material-ui/icons';

import './Detail.css';
import './Controls.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { numberWithCommas, millisToMinutesAndSeconds } from './utils';

interface DetailProps {
  match?: any;
  spotify?: SpotifyWebApi.SpotifyWebApiJs;
}

interface Albums {
  singles: SpotifyApi.AlbumObjectFull[];
  albums: SpotifyApi.AlbumObjectFull[];
}

const ArtistDetail = (props: DetailProps) => {
  const { spotify } = props;
  const {
    match: { params },
  } = props;
  const id: string = params.id;

  const [style, setStyle] = useState<any>({ display: 'none' });
  const [hide, setHide] = useState<boolean>(true);

  const [tracks, setTracks] = useState<any>([]);
  const [title, setTitle] = useState<string>('');

  const [albums, setAlbums] = useState<Albums>({ singles: [], albums: [] });
  const [followers, setFollowers] = useState<number>(0);

  const play = () => {
    spotify && spotify.play();
  };

  useEffect(() => {
    if (spotify) {
      spotify.getArtist(id).then((artist: SpotifyApi.ArtistObjectFull) => {
        setTitle(artist?.name);
        setFollowers(artist?.followers.total);
      });
      spotify.getArtistAlbums(id).then((albums: any) => {
        const singles: SpotifyApi.AlbumObjectFull[] = albums.items.filter(
          (album: SpotifyApi.AlbumObjectFull) => album.album_type === 'single'
        );
        const fulllength: SpotifyApi.AlbumObjectFull[] = albums.items.filter(
          (album: SpotifyApi.AlbumObjectFull) => album.album_type === 'album'
        );

        setAlbums({ singles: singles, albums: fulllength });
      });
      spotify
        .getArtistTopTracks(id, 'US')
        .then((top: SpotifyApi.ArtistsTopTracksResponse) => {
          setTracks(top?.tracks);
        });
    }
  }, [id, spotify]);

  return (
    <div className="artist-detail-view">
      <div className="artist-detail-view__header">
        <div className="detail-view__header-info-metadata">
          <div className="detail-view__header-info-type">Artist</div>

          <h1 className="detail-view__header-info-title">{title}</h1>

          <p className="detail-view__header-info-artist">
            {numberWithCommas(followers) + ' followers'}
          </p>
        </div>
      </div>
      <div className="detail-view__user-controls">
        <PlayCircleOutline fontSize="large" className="footer__icon" />
      </div>
      <div className="artist-detail-view__user-list">
        <div className="artist-detail-view__popular">
          <Typography variant="h4" gutterBottom>
            Popular
          </Typography>
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
                    const trackNum: number = index + 1;
                    return (
                      <TableRow
                        key={index}
                        className="detail-view-tracklist-row"
                      >
                        <TableCell
                          onMouseEnter={(e) => {
                            setStyle({ display: 'block' });
                            setHide(true);
                          }}
                          onMouseLeave={(e) => {
                            setStyle({ display: 'none' });
                            setHide(false);
                          }}
                        >
                          {hide ? (
                            trackNum
                          ) : (
                            <button onClick={play} style={style}>
                              Play
                            </button>
                          )}
                        </TableCell>
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
        <div className="artist-detail-view__related">
          <Typography variant="h4" gutterBottom>
            Related
          </Typography>

          <ul>
            <li>Related 1</li>
            <li>Related 2</li>
            <li>Related 3</li>
            <li>Related 4</li>
            <li>Related 5</li>
          </ul>
        </div>
      </div>
      <Container>
        <Typography variant="h3" gutterBottom>
          Discography
        </Typography>
        <Typography variant="h4" gutterBottom>
          Albums
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          {albums.albums.map((i: SpotifyApi.AlbumObjectFull, idx: number) => {
            const album: SpotifyApi.AlbumObjectFull = i;

            return (
              <Grid item key={idx}>
                <Link to={`/album/${album.id}`}>
                  <Card
                    key={album.id}
                    direction="vertical"
                    title={album.name}
                    subtitle={album.artists[0].name}
                    image={album.images[1].url}
                    id={album.id}
                  />
                </Link>
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="h4" gutterBottom>
          Singles
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          {albums.singles.map((i: SpotifyApi.AlbumObjectFull, idx: number) => {
            const album: SpotifyApi.AlbumObjectFull = i;
            return (
              <Grid item key={idx}>
                <Link to={`/album/${album.id}`}>
                  <Card
                    key={album.id}
                    direction="vertical"
                    title={album.name}
                    subtitle={album.artists[0].name}
                    image={album.images[1].url}
                    id={album.id}
                  />
                </Link>
              </Grid>
            );
          })}
        </Grid>

        <Grid container>
          <Grid item lg>
            <h1>Appears On</h1>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg>
            <h1>Related Artists</h1>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ArtistDetail;
