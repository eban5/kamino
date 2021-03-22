import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
import './Browse.css';

interface BrowseProps {
  spotify?: SpotifyWebApi.SpotifyWebApiJs;
}

const Browse = (props: BrowseProps) => {
  const { spotify } = props;

  const [browseCategories, setBrowseCategories] = useState<
    SpotifyApi.CategoryObject[]
  >([]);

  useEffect(() => {
    spotify &&
      spotify
        .getCategories({ country: 'US', locale: 'en_US' })
        .then((categories: SpotifyApi.MultipleCategoriesResponse) => {
          setBrowseCategories(categories.categories.items);
        });
  }, [spotify]);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {browseCategories.map(
          (category: SpotifyApi.CategoryObject, index: number) => {
            return (
              <Grid item key={index}>
                <Link to={`/browse/${category.id}`}>
                  <div
                    className="category"
                    key={index}
                    style={{
                      backgroundImage: `url(
                    ${category.icons[0].url}
                  )`,
                    }}
                  >
                    <div className="category-title">
                      <h3>{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </Grid>
            );
          }
        )}
      </Grid>
    </>
  );
};

export default Browse;
