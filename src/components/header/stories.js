import React from "react"
import classNames from "classnames";

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import _ from "lodash"

import FlexLink from "../../utils/flexlink";

import "../../css/stories.css";

export default class Stories extends React.Component {
  constructor() {
    super()
    this.state = { value: 0 };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }
  
  render() {
    const stories = [
      {
        title: 'Hire Me',
        content: 'Like this site? Want one like it? Help me pay the hosting for this site while getting one of your own! Explore other projects I have created and see if I would be a good fit for your team.',
        link: 'https://linkedin.com/in/morgante',
      },
      {
        title: 'Twitter',
        content: 'Float down my stream of consciousness. Over rapids and down falls, you can follow me as I float out to sea through Twitter.',
        link: 'https://twitter.com/morgantepell',
      },
      {
        title: 'Elsewhere',
        content: "Writing isn't the only thing I do, and now you can find out what other mischief I am up to. At my central hub, you'll find my bio and links to other shenanigans, including my programming lab.",
        link: '/elsewhere',
      },
      {
        title: 'Writing',
        content: "Prose isn't my only master. Through poetry and informal writings, I follow my creative muse—wherever she may lead me",
        link: '/writing',
      }
    ];

    const goSlideLink = (num) => {
      return (evt) => {
        console.log('clicked', evt);
        this.setState({ value: num });
      }
    }

    return (<div id="storySlider">
      <div id="stories">
        <Carousel
          infinite
          value={this.state.value}
          onChange={this.onChange}
          >
          {_.map(stories, (story, index) => {
            const key = _.kebabCase(story.title);
            return (
              <div
                key={key}
                className={classNames("story", key, `story` + index)}>
                <div className="info">
                  <h3><FlexLink to={story.link}>{story.title}</FlexLink></h3>
                  <p>{story.content}</p>
                  <FlexLink className="action" to={story.link}>&rarr;</FlexLink>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <ol id="stories-nav">
        {_.map(stories, (story, index) => {
          const key = _.kebabCase(story.title);
          return (<li
            key={key}
            className={classNames("story", key, `story` + index)}>
            <a href="#" onClick={goSlideLink(index)}>{story.title}</a>
          </li>);
        })}
      </ol>
    </div>
    )
  }
}
