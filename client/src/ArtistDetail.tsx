import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { PlayCircleOutline } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import Card from './Card';
import './Controls.css';
import './Detail.css';
import * as utils from './utils/utils';

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
  const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull | null>(
    null
  );

  const [tracks, setTracks] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [followers, setFollowers] = useState<number>(0);
  const [headerImage, setHeaderImage] = useState<string>('');

  const [albums, setAlbums] = useState<Albums>({ singles: [], albums: [] });
  const [relatedArtists, setRelatedArtists] = useState<
    SpotifyApi.ArtistObjectFull[]
  >([]);

  const play = () => {
    spotify && spotify.play();
  };

  useEffect(() => {
    if (spotify) {
      spotify.getArtist(id).then((artist: SpotifyApi.ArtistObjectFull) => {
        setArtist(artist);
        setTitle(artist?.name);
        setFollowers(artist?.followers.total);
        setHeaderImage(artist?.images[0].url);
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
      spotify
        .getArtistRelatedArtists(id)
        .then((response: SpotifyApi.ArtistsRelatedArtistsResponse) =>
          setRelatedArtists(response.artists.slice(0, 5))
        );
    }
  }, [id, spotify]);

  return (
    <div className="artist-detail">
      <div
        className="artist-detail__header"
        style={{
          backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.25), 
      rgba(0, 0, 0, 0.85)
    ), url(${headerImage})`,
        }}
      >
        <div className="detail-view__header-info-metadata">
          <div className="detail-view__header-info-type">Artist</div>

          <h1 className="detail-view__header-info-title">{title}</h1>

          <p className="detail-view__header-info-artist">
            {utils.numberWithCommas(followers) + ' followers'}
          </p>
        </div>
      </div>
      <Container maxWidth={false} className="artist-detail__controls">
        <PlayCircleOutline fontSize="large" className="footer__icon" />
      </Container>
      <Container className="artist-detail__user-list">
        <div className="artist-detail__popular">
          <h2>Popular</h2>
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
                          {utils.millisToMinutesAndSeconds(item.duration_ms)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="artist-detail__related">
          <h2 className="related-artist-grid-title">Related Artists</h2>
          <div className="related-artist-grid">
            {relatedArtists.map(
              (artist: SpotifyApi.ArtistObjectFull, index: number) => {
                return (
                  <Link to={`/artist/${artist.id}`} key={index}>
                    <div
                      className="related-artist-card"
                      key={index}
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('${artist.images[0]?.url}')`,
                      }}
                    >
                      <div className="related-artist-card__text">
                        <div className="related-artist-card__artist">
                          {artist.name}
                        </div>
                        <br />
                      </div>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </Container>
      <Container maxWidth={false} className="artist-detail-discography">
        <h2 style={{ marginBottom: '25px' }}>Discography</h2>
        <h3>Albums</h3>
        <div className="artist-detail-discography-albums">
          {albums.albums.map((i: SpotifyApi.AlbumObjectFull, idx: number) => {
            const album: SpotifyApi.AlbumObjectFull = i;
            return (
              <Link to={`/album/${album.id}`} key={idx}>
                <Card
                  key={album.id}
                  direction="vertical"
                  title={album.name}
                  subtitle={album.artists[0].name}
                  image={album.images[1].url}
                  id={album.id}
                />
              </Link>
            );
          })}
        </div>
        <h3>Singles</h3>
        <div className="artist-detail-discography-singles">
          {albums.singles.map((i: SpotifyApi.AlbumObjectFull, idx: number) => {
            const album: SpotifyApi.AlbumObjectFull = i;
            return (
              <Link to={`/album/${album.id}`} key={idx}>
                <Card
                  key={album.id}
                  direction="vertical"
                  title={album.name}
                  subtitle={album.artists[0].name}
                  image={album.images[1].url}
                  id={album.id}
                />
              </Link>
            );
          })}
        </div>
        <div style={{ display: 'flex' }}>
          <div className="about">
            <h4>About</h4>

            <div
              className="artist-detail-about"
              style={{
                backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.25), 
              rgba(0, 0, 0, 0.85)
              ), url(${headerImage})`,
              }}
            >
              <p>
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </p>
              <p>
                <div className="">
                  {utils.numberWithCommas(followers)} followers.
                </div>
                <div className="">
                  {artist?.genres
                    .slice(0, 3)
                    .map(
                      (i: string) =>
                        `${i.charAt(0).toUpperCase()}${i.substring(1)}`
                    )
                    .join(', ')}
                </div>
              </p>
            </div>
          </div>
          <div className="on-tour">
            <h4>On Tour </h4>
            <p>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam dignissimos
              laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ArtistDetail;
