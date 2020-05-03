import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import classNames from "classnames";

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import _ from "lodash"

import "../../css/stories.css";

export default function Stories({}) {
	const rootPath = `${__PATH_PREFIX__}/`;

	const stories = [
		{
			title: 'Hire Me',
			content: 'Like this site? Want one like it? Help me pay the hosting for this site while getting one of your own! Explore other projects I have created and see if I would be a good fit for your team.',
			link: '#'
		},
		{
			title: 'Twitter',
			content: 'Float down my stream of consciousness. Over rapids and down falls, you can follow me as I float out to sea through Twitter.',
			link: '#'
		},
		{
			title: 'Elsewhere',
			content: "Writing isn't the only thing I do, and now you can find out what other mischief I am up to. At my central hub, you'll find my bio and links to other shenanigans, including my programming lab.",
			link: '#'
		},
		{
			title: 'Writing',
			content: "Prose isn't my only master. Through poetry and informal writings, I follow my creative muse—wherever she may lead me",
			link: '#'
		}
	];
	
  return (<div id="storySlider">
    <div id="stories">
      <Carousel
        infinite
        >
        {_.map(stories, (story) => {
          const key = _.kebabCase(story.title);
          return (
            <div
              key={key}
              className={classNames("story", key)}>
              <div className="info">
                <h3><Link to={story.link}>{story.title}</Link></h3>
                <p>{story.content}</p>
                <Link className="action" to={story.link}>&rarr;</Link>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  </div>
  )
}
