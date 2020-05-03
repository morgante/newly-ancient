import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import classNames from "classnames";

import _ from "lodash"

import Stories from "./stories";

import "../../css/nav.css"

export default function Header({ data, location, title, children }) {
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
	
  return (
		<StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
						title
						menuLinks {
							name
							link
						}
          }
        }
      }
    `}
    render={data => {
			const menu = data.site.siteMetadata.menuLinks;
			console.log('data', data, menu);
			return (
				<div id="header" className="section">
					<div id="branding">
						<h1>
							<Link to={`/`} title="Pick up your heart at home">
							<span className="newly">Newly</span> <span className="ancient">Ancient</span>
							</Link>
					</h1>
					<div className="box">
						<div id="search" className="internal">
							{/* <form method="get" id="searchform" action="#"><div>
									<label for="s">Search:</label>
								<input type="text" id="s" name="criteria" value="<?php if ( isset( $criteria ) ) { echo htmlentities($criteria, ENT_COMPAT, 'UTF-8'); } ?>">
								<input type="submit" id="searchsubmit" value="Go!">
							</div></form> */}
						</div>
					</div>
				</div>
				<div id="navigation">
					<ol id="nav_main">
						{_.map(menu, (item) => {
							console.log("item", item);
							return (
								<li
									className={item.name}
									key={item.name}>
									<Link
										to={item.link}
										partiallyActive={true}
										activeClassName="active">
										<span>{_.startCase(item.name)}</span>
									</Link>
								</li>
							);
						})}
					</ol>
					<div id="spinner">Loading...</div>
					<Stories />
					{/* <ol id="stories-nav">
						<?php foreach( $stories as $index => $stitle): ?>
						<li class="story story<?php echo $index; ?>"><a href="#story<?php echo $index; ?>"><?php echo $stitle; ?></a></li>
						<?php endforeach; ?>
					</ol> */}
				</div>
			</div>
			)
		}}
  />
    
  )
}
