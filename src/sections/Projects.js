import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import ImageSubtitle from '../components/ImageSubtitle';
import Hide from '../components/Hide';
import { getRandomInt, getRandomColor } from '../utils/misc';

const FadeWrapper = styled.div`
  width: 100%;
`;

const ListWrapper = styled(Flex)`
  width: calc(100% - 100px);
  min-height: calc(100vh - 200px);
  max-width: 520px;
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  margin: 0 auto;
  flex-direction: column;
`;

const ListItem = styled.li`
  width: 100%;
  height: 50px;
  display: block;
  position: relative;
  float: left;
  -webkit-transition: all 0.3s linear, opacity 0.2s linear;
  transition: all 0.3s linear, opacity 0.2s linear;

  &:before {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    background-color: #272727;
    opacity: 0.08;
    top: 14px;
    left: 0;
    z-index: 1;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }
`;

const ListItemLink = styled.a`
  width: 100%;
  display: block;
  position: relative;
  border: 0;
  float: left;
  z-index: 4;
  overflow: hidden;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const ListItemTitleWrapper = styled.div`
  display: block;
  float: left;
  position: relative;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #f7f9f4;
    left: 0;
    z-index: 2;
  }
`;

const ListItemTitle = styled(Text)`
  width: calc(100% - 8px);
  height: 40px;
  display: block;
  position: relative;
  padding-right: 8px;
  white-space: nowrap;
  z-index: 3;
  float: left;
`;

const ListItemMarkerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  -webkit-transition: all 0.15s linear;
  transition: all 0.15s linear;

  &:before {
    content: '';
    width: 6px;
    height: 100%;
    position: absolute;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(rgba(255, 255, 255, 0)),
      color-stop(50%, #f7f9f4),
      to(#f7f9f4)
    );
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      #f7f9f4 50%,
      #f7f9f4 100%
    );
    top: 0;
    right: 100%;
    z-index: 1;
  }
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #f7f9f4;
    top: 0;
    right: 0;
    z-index: 1;
  }
`;

const ListItemMarker = styled(Text)`
  position: relative;
  opacity: 0.5;
  z-index: 2;
`;

const FilterList = styled.ul`
  display: flex;
  flex-direction: column;
  position: -webkit-sticky;
  position: sticky;
  top: 50%;
  align-items: flex-end;
`;

const FilterListItem = styled(Text)`
  font-size: 15px;
  line-height: 18px;
  display: inline-block;
  position: relative;
  padding-right: 12px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  cursor: pointer;
  opacity: 0.3;

  &:after {
    content: '➬';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    right: 1px;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  &.selected,
  &:hover {
    opacity: 1;
  }
`;

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: { type: 'All', color: '#272727' },
      filters: [],
    };
  }

  componentDidMount() {
    const { cases } = this.props;
    const filters = cases.edges
      // reduce type comma delimited strings into array of filter types
      .reduce(
        (list, { node }) => {
          return list.concat(node.type.split(', '));
        },
        ['All'],
      )
      // filter out duplicates
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      // map random color to each type
      .map(type => {
        const color = getRandomColor();
        return { type, color };
      });

    this.setState({ filters });
  }

  render() {
    return (
      <Flex>
        <div>
          <FilterList>
            {this.state.filters.map(({ type, color }, i) => {
              return (
                <Fade left delay={500} key={i}>
                  <FilterListItem
                    className={
                      this.state.selectedFilter.type === type ? 'selected' : ''
                    }
                    style={{ color }}
                    onClick={() => {
                      var element = document.getElementById('projects');
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'nearest',
                      });
                      this.props.handleActionColor(color);
                      this.setState({ selectedFilter: { type, color } });
                    }}
                  >
                    {type}
                  </FilterListItem>
                </Fade>
              );
            })}
          </FilterList>
        </div>

        <FadeWrapper>
          <Fade bottom delay={100}>
            <ListWrapper>
              {this.props.cases.edges
                .filter(
                  ({ node }) =>
                    node.type.includes(this.state.selectedFilter.type) ||
                    this.state.selectedFilter.type === 'All',
                )
                .map(({ node }, i) => {
                  const randUnicode = String.fromCharCode(
                    '0x' + 29 + getRandomInt(0, 255).toString(16),
                  );
                  const color = this.state.selectedFilter.color;
                  return (
                    <ListItem key={i}>
                      <ListItemLink>
                        <ListItemTitleWrapper className="title">
                          <ListItemTitle color={color}>
                            {node.title}
                          </ListItemTitle>
                        </ListItemTitleWrapper>
                        <ListItemMarkerWrapper className="marker">
                          <ListItemMarker color={color}>
                            {randUnicode}
                          </ListItemMarker>
                        </ListItemMarkerWrapper>
                      </ListItemLink>
                    </ListItem>
                  );
                })}
            </ListWrapper>
          </Fade>
        </FadeWrapper>
      </Flex>
    );
  }
}

const Projects = props => (
  <Section.Container id="projects">
    <Section.Header name="Projects" />
    <StaticQuery
      query={graphql`
        query Project {
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
              }
            }
          }
        }
      `}
      render={({ cases }) => (
        <ProjectList
          handleActionColor={props.handleActionColor}
          cases={cases}
        />
      )}
    />
  </Section.Container>
);

export default Projects;
