import React, { Fragment } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

import { StaticQuery, graphql } from 'gatsby';
import { Image, Text } from 'rebass';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { SectionLink } from 'react-scroll-section';
import Section from '../components/Section';
import MouseIcon from '../components/MouseIcon';
import Scramble from '../components/Scramble';
import phoneImage from '../img/iphony.png';
import { getRandomInt } from '../utils/misc';

import Loadable from 'react-loadable';

const dynamics = Loadable({
  loader: () => import('dynamics.js'),
  loading() {
    return <div>Loading...</div>;
  },
});

const Grid = Loadable({
  loader: () => import('react-isometric-grid'),
  loading() {
    return <div>Loading...</div>;
  },
  render(loaded, props) {
    const Cell = loaded.Cell;
    const IsometricGrid = loaded.default;
    const cases = props.cases || { edges: [] };
    const date_sort_desc = (a, b) => {
      // This is a comparison function that will result in dates being sorted in
      // ASCENDING order. As you can see, JavaScript's native comparison operators
      // can be used to compare dates. This was news to me.
      if (a.node.year > b.node.year) return -1;
      if (a.node.year < b.node.year) return 1;
      return 0;
    };

    return (
      <IsometricGrid
        shadow
        transform="rotateX(45deg) rotateZ(45deg)"
        stackItemsAnimation={{
          properties: function(pos) {
            return {
              translateZ: (pos + 1) * 50,
              rotateZ: getRandomInt(-3, 3),
            };
          },
          options: function(pos, itemstotal) {
            return {
              type: dynamics.bezier,
              duration: 500,
              points: [
                { x: 0, y: 0, cp: [{ x: 0.2, y: 1 }] },
                { x: 1, y: 1, cp: [{ x: 0.3, y: 1 }] },
              ],
              delay: (itemstotal - pos - 1) * 40,
            };
          },
        }}
        style={{ height: '800px', width: '900px' }}
        layerStyle={{ height: '200px', width: '100px' }}
      >
        {cases.edges.sort(date_sort_desc).map(({ node }, i) => (
          <Cell
            title={node.title}
            key={i + node.title}
            index={i}
            style={{ height: '100px', width: '200px' }}
            layerStyle={{ height: '100px', width: '200px' }}
            layers={[
              `${node.heroImage ? node.heroImage.file.url : '#2A324B'}`,
              '#767B91',
              '#C7CCDB',
              '#E1E5EE',
              <PhoneImage src={`${phoneImage}`} />,
            ]}
          />
        ))}
      </IsometricGrid>
    );
  },
});

const PhoneImage = styled(Image)`
  z-index: 999;
  border-radius: 15px;
`;

const LandingPage = () => (
  <Section.Container id="home">
    <StaticQuery
      query={graphql`
        query Case {
          cases: allContentfulCase {
            edges {
              node {
                id
                title
                type
                description {
                  description
                }
                heroImage {
                  file {
                    fileName
                    url
                  }
                }
                year
              }
            }
          }
        }
      `}
      render={({ cases }) => (
        <Fragment>
          <ParallaxProvider>
            <Parallax className="" x={[19, -5]} tagOuter="figure">
              <Text fontSize={[3, 4, 5]} fontWeight="bold" color="#2A324B">
                Caleb
              </Text>
            </Parallax>
            <Parallax className="" x={[15, -5]} tagOuter="figure">
              <Scramble
                name="verb"
                el={
                  <Text fontSize={[3, 4, 5]} fontWeight="bold" color="#2A324B">
                    <div className="verb">Inspires</div>
                  </Text>
                }
                wordList={[
                  'Inspires',
                  'Empowers',
                  'Challenges',
                  'Organizes',
                  'Loves',
                  'Codes',
                  'Plays Music With',
                  'Challenges',
                ]}
              />
            </Parallax>
            <Parallax className="" x={[10, -3]} tagOuter="figure">
              <Scramble
                name="noun"
                el={
                  <Text fontSize={[3, 4, 5]} fontWeight="bold" color="#2A324B">
                    <div className="noun">Creativity</div>
                  </Text>
                }
                wordList={[
                  'Creativity',
                  'The Team',
                  'Everything',
                  'Stuff by Color',
                  'Randomizers',
                  'Like a damn boss',
                  'Sexbruise?',
                  'The Game',
                ]}
              />
            </Parallax>

            <Fade left delay={600}>
              <Parallax
                className="custom-class"
                x={[-150, 100]}
                y={[25, -50]}
                tagOuter="figure"
              >
                <Grid cases={cases} />
              </Parallax>
            </Fade>
          </ParallaxProvider>
        </Fragment>
      )}
    />
  </Section.Container>
);

export default LandingPage;
