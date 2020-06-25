import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
import './lettering.css'
import 'react-awesome-slider/dist/custom-animations/cube-animation.css'
import 'react-awesome-slider/dist/custom-animations/fall-animation.css'
import 'react-awesome-slider/dist/custom-animations/fold-out-animation.css'
import 'react-awesome-slider/dist/custom-animations/open-animation.css'
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css'
import { Chip, IconButton, Typography } from '@material-ui/core'
import { GoMarkGithub as GithubIcon } from 'react-icons/go'
import { IoIosLink as LinkIcon } from 'react-icons/io'
import breakpoint from 'styled-components-breakpoint'

const animations = [
	'cubeAnimation',
	'fallAnimation',
	'foldOutAnimation',
	'openAnimation',
	'scaleOutAnimation'
]

const projects = [
	{
		name: 'Covid-19 Death Toll Comparison',
		background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
		tagline:
			'Simple Dockerized Rails API aggregating Covid-19 death tolls feeding into a React UI.',
		tags: [
			'React',
			'Material UI',
			'Ruby on Rails',
			'Redis',
			'Docker-Compose',
			'AWS EC2',
			'Netlify'
		],
		github: 'https://github.com/Jnavarr56/covid-19-death-toll-comparison-ui',
		link: 'http://coviddeathtollcomparison.com'
	},
	{
		name: 'CommuteCompare',
		background: 'linear-gradient(to right, #7f00ff, #e100ff)',
		tagline: 'A full-stack web app for comparing apartment commutes.',
		tags: [ 'React', 'Bootstrap', 'Ruby on Rails', 'PostgreSQL' ],
		github: 'https://github.com/Jnavarr56/CommuteCompare',
		link: 'https://CommuteCompare.herokuapp.com/'
	},
	{
		name: 'GifizeMe',
		background: 'linear-gradient(to right, #f953c6, #b91d73)',
		tagline:
			'A full-stack web app for creating and sharing gifs on FB messenger.',
		tags: [ 'React', 'Bootstrap', 'Ruby on Rails', 'PostgreSQL' ],
		github: 'https://github.com/Jnavarr56/GifizeMe',
		link: 'https://GifizeMe.herokuapp.com/'
	}
]

const genProjectsCSS = () =>
	projects.reduce((css, project) => {
		return `${css}
		& .${project.name.replace(/ /g, '')} {
			background ${project.background};
			& * { color: white; }
		}
	`
	}, '')

const ProjectsPage = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	& .awssld,
	& .awssld__container {
		height: 100%;
	}
	& .awssld__content {
		background-color: transparent;
		${genProjectsCSS()}
		& > div {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			padding: 12px;
			& > * {
				font-family: Raleway !important;
			}
		}
	}
	& .awssld__controls__arrow-right,
	& .awssld__controls__arrow-left {
		&:before,
		&:after {
			background-color: white;
		}
	}
	& .awssld__bullets {
		bottom: 80px;
		& > button {
			opacity: 0.5;
			background: white;
			&.awssld__bullets--active {
				opacity: 1;
			}
		}
	}
	& .project-title {
		font-size: 36px;
		margin-bottom: 18px;
	}
	& .project-tagline {
		text-align: center;
		font-style: italic;
		font-size: 12px;
		margin-bottom: 12px;
	}

	& .project-tags {
		& * {
			border-color: white !important;
			font-family: Raleway !important;
		}
		& > *.MuiChip-root:not(:first-child):not(:last-child) {
			margin: 0 1px;
		}
		& > *.MuiChip-root:first-child {
			margin-right: 1px;
		}
		& > *.MuiChip-root:last-child {
			margin-left: 1px;
		}
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		margin-bottom: 18px;
	}
	& .project-links {
		& * {
			font-size: 42px;
		}
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	${breakpoint('tablet')`
		& .project-title {
			font-size: 46px;
			margin-bottom: 18px;
		}
		& .project-tagline {
			font-size: 16px;
			margin-bottom: 18px;
		}

		& .project-tags {
			& * { font-size: 16px; }
			& > *.MuiChip-root:not(:first-child):not(:last-child) { margin: 0 2px; }
			& > *.MuiChip-root:first-child { margin-right: 2px; }
			& > *.MuiChip-root:last-child { margin-left: 2px; }
			margin-bottom: 32px;
		}
		& .project-links {
			& * {  font-size: 52px; }
		}
	`}
	${breakpoint('desktop')`
		& .project-title {
			font-size: 56px;
			margin-bottom: 24px;
		}
		& .project-tagline {
			font-size: 20px;
			margin-bottom: 20px;
		}

		& .project-tags {
			& * { font-size: 22px; }
			& > *.MuiChip-root:not(:first-child):not(:last-child) { margin: 0 4px; }
			& > *.MuiChip-root:first-child { margin-right: 4px; }
			& > *.MuiChip-root:last-child { margin-left: 4px; }
			margin-bottom: 38px;
		}
		& .project-links {
			& * {  font-size: 58px; }
		}
	`}
`

const Projects = () => {
	const [ animIndex, setAnimIndex ] = useState(0)

	const handleSwitchAnimation = useCallback(() => {
		setAnimIndex(idx => (idx === animations.length - 1 ? 0 : idx + 1))
	}, [])

	return (
		<ProjectsPage projects={projects}>
			<AwesomeSlider
				animation={animations[animIndex]}
				onTransitionEnd={handleSwitchAnimation}
			>
				{projects.map((project, i) => {
					return (
						<div
							className={project.name.replace(/ /g, '')}
							key={project.name}
						>
							<Typography
								className="project-title"
								variant="h1"
							>
								{project.name}
							</Typography>
							<Typography
								className="project-tagline"
								variant="overline"
							>
								{project.tagline}
							</Typography>
							<div className="project-tags">
								{project.tags.map(tag => (
									<Chip
										key={tag}
										label={'#' + tag}
										variant="outlined"
									/>
								))}
							</div>
							<div className="project-links">
								{project.github && (
									<IconButton
										onClick={() =>
											setTimeout(() => window.open(project.github), 250)}
									>
										<GithubIcon />
									</IconButton>
								)}
								{project.link && (
									<IconButton
										onClick={() =>
											setTimeout(() => window.open(project.link), 250)}
									>
										<LinkIcon />
									</IconButton>
								)}
							</div>
						</div>
					)
				})}
			</AwesomeSlider>
		</ProjectsPage>
	)
}

export default Projects
