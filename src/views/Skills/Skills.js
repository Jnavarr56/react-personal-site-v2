import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Waypoint } from 'react-waypoint'
import { SkillCard } from './components'
import { Tabs, Tab, Divider } from '@material-ui/core'
import breakpoint from 'styled-components-breakpoint'
import theme from 'theme'
import {
	useTrail,
	animated,
	config,
	useSpring,
	useTransition,
	useChain
} from 'react-spring'
import { Translateable } from 'components/Translateable'

const categories = [
	{
		label: {
			en: 'Programming Languages',
			es: 'Lenguajes de Programación'
		},
		skills: [
			{
				label: 'JavaScript',
				src: '/skills-logos/programming-languages/javascript.png'
			},
			{
				label: 'Python',
				src: '/skills-logos/programming-languages/python.png'
			},
			{ label: 'Ruby', src: '/skills-logos/programming-languages/ruby.png' },
			{ label: 'Java', src: '/skills-logos/programming-languages/java.png' },
			{ label: 'MATLAB', src: '/skills-logos/programming-languages/matlab.png' }
		]
	},
	{
		label: {
			en: 'Front End Frameworks/Libraries',
			es: 'Frameworks/Bibliotecas Front End'
		},
		skills: [
			{
				label: 'React.js',
				src: '/skills-logos/front-end-frameworks-libraries/reactjs.png'
			},
			{
				label: 'React-Native',
				src: '/skills-logos/front-end-frameworks-libraries/reactjs.png'
			},
			{
				label: 'Next.js',
				src: '/skills-logos/front-end-frameworks-libraries/nextjs.png'
			},
			{
				label: 'styled-components',
				src:
					'/skills-logos/front-end-frameworks-libraries/styled-components.png'
			},
			{
				label: 'JSS',
				src: '/skills-logos/front-end-frameworks-libraries/jss.png'
			},
			{
				label: 'Material-UI',
				src: '/skills-logos/front-end-frameworks-libraries/material-ui.png'
			},
			{
				label: 'TailwindCSS',
				src: '/skills-logos/front-end-frameworks-libraries/tailwindcss.png'
			},
			{
				label: 'Bootstrap',
				src: '/skills-logos/front-end-frameworks-libraries/bootstrap.png'
			},
			{
				label: 'jQuery',
				src: '/skills-logos/front-end-frameworks-libraries/jquery.gif'
			}
		]
	},
	{
		label: {
			en: 'Back End Frameworks/Libraries',
			es: 'Frameworks/Bibliotecas Back End'
		},
		skills: [
			{
				label: 'Express.js',
				src: '/skills-logos/back-end-frameworks-libraries/express.png'
			},
			{
				label: 'Ruby on Rails',
				src: '/skills-logos/back-end-frameworks-libraries/ruby-on-rails.png'
			},
			{
				label: 'Flask',
				src: '/skills-logos/back-end-frameworks-libraries/flask.png'
			}
		]
	},
	{
		label: {
			en: 'Databases',
			es: 'Bases de Datos'
		},
		skills: [
			{ label: 'PostgreSQL', src: '/skills-logos/databases/postgresql.png' },
			{ label: 'MongoDB', src: '/skills-logos/databases/mongodb.png' },
			{ label: 'Mongoose', src: '/skills-logos/databases/mongoose.png' },
			{ label: 'node-postgres', src: '' }
		]
	},
	{
		label: {
			en: 'DevOps/Cloud',
			es: 'DevOps/Nube'
		},
		skills: [
			{ label: 'Docker', src: '/skills-logos/devops-cloud/docker.png' },
			{ label: 'Git', src: '/skills-logos/devops-cloud/git.png' },
			{ label: 'GitHub', src: '/skills-logos/devops-cloud/github.png' },
			{ label: 'Gitlab', src: '/skills-logos/devops-cloud/gitlab.png' },
			{ label: 'NGINX', src: '/skills-logos/devops-cloud/nginx.png' },
			{
				label: 'AWS (S3/EC2/Cognito)',
				src: '/skills-logos/devops-cloud/aws.png'
			},
			{
				label: 'MongoDB Atlas',
				src: '/skills-logos/devops-cloud/mongodb-atlas.png'
			},
			{ label: 'Netlify', src: '/skills-logos/devops-cloud/netlify.png' },
			{ label: 'Heroku', src: '/skills-logos/devops-cloud/heroku.png' }
		]
	},
	{
		label: {
			en: 'Tools',
			es: 'Herramientas'
		},
		skills: [
			{ label: 'iTerm2', src: '/skills-logos/tools/iterm2.png' },
			{ label: 'Oh My Zsh', src: '/skills-logos/tools/oh-my-zsh.png' },
			{ label: 'Visual Studio Code', src: '/skills-logos/tools/vs-code.png' },
			{ label: 'Robo3T', src: '/skills-logos/tools/robo3t.png' },
			{ label: 'Postico', src: '/skills-logos/tools/postico.png' },
			{ label: 'Android Studio', src: '/skills-logos/tools/android-studio.png' }
		]
	},
	{
		label: {
			en: 'Previously Used',
			es: 'Usado Previamente'
		},
		skills: [
			{
				label: 'Apollo/GraphQL',
				src: '/skills-logos/previously-used/apollo-graphql.png'
			},
			{ label: 'Vagrant', src: '/skills-logos/previously-used/vagrant.png' },
			{
				label: 'VirtualBox',
				src: '/skills-logos/previously-used/virtualbox.png'
			},
			{ label: 'Ubuntu', src: '/skills-logos/previously-used/ubuntu.png' }
		]
	},
	{
		label: {
			en: 'Other',
			es: 'Otro'
		},
		skills: [
			{ label: 'Spanish Languag (native)', src: '' },
			{ label: 'French Language (intermediate)', src: '' },
			{ label: 'MS Excel', src: '' }
		]
	}
]
const Container = styled.div`
	& * {
		font-family: Raleway;
	}
	height: 100%;
	width: 100%;
	padding: 7.25% 0;
`

const InnerContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 2rem;
`

const SkillGridContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	& > * {
		height: 100%;
	}
	& > *:first-child {
	}
	& > *:last-child {
		flex-grow: 1;
	}
`

const SkillGridBoxContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	/* overflow: hidden; */
	padding: 16px;
`

const SkillGridBox = styled(animated.div)`
	position: relative;
	display: grid;
	grid-auto-rows: 1fr;
	grid-template-columns: repeat(4, minmax(100px, 1fr));
	grid-gap: 25px;
	padding: 25px;
	background: white;
	cursor: pointer;
	box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
	border-radius: 100%;
	height: 200px;
	width: 200px;
	background: rgba(255, 0, 0, 1);
	border-radius: 8px;
`

const GridShadow = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	overflow: auto;
	&::-webkit-scrollbar {
		border-radius: 4px;
		background-color: black;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 6px;
		background-color: white;
		border: 2px solid black;
	}
`

const SkillCardGrid = styled(animated.div)`
	height: 100%;
	width: 40%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`

const Item = styled(animated.div)`
	width: 100%;
	height: 100%;
	background: white;
	border-radius: 5px;
	will-change: transform, opacity;
	display: flex;
	justify-content: center;
	align-items: center;
`

// const OpenBox = ({ }) => {

// }

const Grid = ({ entering, skills, onEnd }) => {
	const springRef = useRef()
	const SpringProps = useSpring({
		ref: springRef,
		config: config.stiff,
		from: {
			height: '30%',
			width: '15%',
			background: 'rgba(255, 0, 0, 1)',
			transform: 'rotate(180deg)'
		},
		to: {
			height: entering ? '100%' : '30%',
			width: entering ? '100%' : '15%',
			background: entering ? 'rgba(255, 0, 0, .5)' : 'rgba(255, 0, 0, 1)',
			transform: entering ? 'rotate(0deg)' : 'rotate(180deg)'
		},
		onRest: onEnd
	})

	const transitionRef = useRef()
	const TransitionProps = useTransition(
		entering ? skills : [],
		item => item.label,
		{
			ref: transitionRef,
			trail: 400 / skills.length,
			from: { opacity: 0, transform: 'scale(0)' },
			enter: { opacity: 1, transform: 'scale(1)' },
			leave: { opacity: 0, transform: 'scale(0)' }
		}
	)

	useChain(entering ? [ springRef, transitionRef ] : [ transitionRef, springRef ], [
		0,
		0.5
	])

	return (
		<SkillGridBox style={SpringProps}>
			{TransitionProps.map(({ item, key, props }) => {
				return (
					<Item
						key={key}
						style={{ ...props }}
					>
						<p>{item.label}</p>
					</Item>
				)
			})}
		</SkillGridBox>
	)
}

const AnimatedSkillGrid = ({ inView }) => {
	const [ lastCategory, setLastCategory ] = useState(0)
	const [ selectedCategory, setSelectedCategory ] = useState(0)
	const [ entering, setEntering ] = useState(false)

	useEffect(() => {
		let timer = setTimeout(() => {
			setEntering(true)
		}, 1000)
		return () => clearTimeout(timer)
	}, [ inView ])

	const skills = !entering
		? categories[lastCategory].skills
		: categories[selectedCategory].skills

	return (
		<InnerContainer>
			<SkillGridContainer>
				<Tabs
					orientation="vertical"
					value={selectedCategory}
					variant="scrollable"
					onChange={(e, val) => {
						setEntering(false)
						setLastCategory(selectedCategory)
						setSelectedCategory(val)
					}}
				>
					{categories.map((cat, i) => {
						return (
							<Tab
								key={cat.label.en}
								label={<Translateable
									en={cat.label.en}
									es={cat.label.es}
								       />}
								value={i}
								wrapped={false}
							/>
						)
					})}
				</Tabs>
				<Divider orientation="vertical" />
				<div>
					<SkillGridBoxContainer>
						{inView && (
							<Grid
								entering={entering}
								skills={skills}
								onEnd={entering ? () => {} : () => setEntering(true)}
							/>
						)}
					</SkillGridBoxContainer>
				</div>
			</SkillGridContainer>
		</InnerContainer>
	)
}

const Skills = props => {
	const [ fadeIn, setFadeIn ] = useState(false)
	return (
		<Container>
			<Waypoint
				fireOnRapidScroll={false}
				scrollableAncestor={window}
				onEnter={() => setFadeIn(true)}
				onLeave={() => setFadeIn(false)}
			/>

			<AnimatedSkillGrid inView={fadeIn} />
		</Container>
	)
}

Skills.propTypes = {
	backgroundColor: PropTypes.string,
	fontColor: PropTypes.string
}

export default Skills
