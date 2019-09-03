import React, { Fragment, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { ScrollingProvider } from 'react-scroll-section';
import 'react-tippy/dist/tippy.css';
import config from 'react-reveal/globals';
import colors from '../../colors';
import Helmet from './Helmet';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before { 
    box-sizing: inherit;
    }

  body {
    box-sizing: border-box; 
    margin: 0;
    font-family: 'Poiret One', 'Open Sans', sans-serif;
    font-display: swap;
    font-display: fallback;
    overflow-x: hidden;
    background: #F7F9F4;
  }
  *,
  *::after,
  *::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .rst__layer {
    border-radius: 20px;
  }

  .grid,
  .grid__item,
  .grid__link {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }

  .grid {
    position: relative;
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }

  .grid__item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .grid__link {
    position: relative;
    z-index: 1;
    display: block;
  }

  .grid__link.grid__link--onclick:hover {
    cursor: pointer;
  }

  .grid__img {
    display: block;
    max-width: 100%;
  }

  .rst__grid__title {
    font-size: 0.65em;
    font-weight: 600;
    position: absolute;
    z-index: -1;
    bottom: 0;
    width: 100%;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0;
    color: #2A324B;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
  }

  .rst__layer {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
    transition: filter 0.5s;
  }
  .rst__grid__item:hover .rst__layer {
    -webkit-filter: grayscale(0); /* Safari 6.0 - 9.0 */
    filter: grayscale(0);
  }

  .grid__item:hover .grid__title {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .layer {
    position: relative;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Shadow effect */

  .isolayer--shadow {
    .grid__link::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 5px;
      right: 5px;
      bottom: 5px;
      left: 5px;
      opacity: 0.6;
      background: rgba(0, 0, 0, 0.8);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.8);
      -webkit-transform: translateZ(-1px) scale(0.95);
      transform: translateZ(-1px) scale(0.95);
      -webkit-transition: transform 0.3s, opacity 0.3s, box-shadow 0.3s;
      transition: transform 0.3s, opacity 0.3s, box-shadow 0.3s;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    .grid__item:hover .grid__link::before {
      opacity: 0.2;
      box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.8);
      -webkit-transform: translateZ(-1px) scale(1);
      transform: translateZ(-1px) scale(1);
    }
  }

  .isolayer {
    .grid__item {
      padding: 15px;
    }
    .grid__link {
      div.layer {
        opacity: 0.4;
      }
    }
  }
`;

config({ ssrFadeout: true });

const loadScript = src => {
  const tag = document.createElement('script');
  tag.src = src;
  tag.defer = true;

  document.getElementsByTagName('body')[0].appendChild(tag);
};

const Layout = ({ children }) => {
  useEffect(() => {
    loadScript('https://use.fontawesome.com/fd58d214b9.js');
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={{ colors }}>
        <ScrollingProvider>
          <Helmet />
          {children}
        </ScrollingProvider>
      </ThemeProvider>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
