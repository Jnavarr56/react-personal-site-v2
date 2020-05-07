import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Waypoint } from 'react-waypoint'
import { SkillCard } from './components'
import { Tabs, Tab } from '@material-ui/core'
import breakpoint from 'styled-components-breakpoint'
import theme from 'theme'
import { useTrail, animated, config } from 'react-spring'
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
	& .MuiTabs-root {
		& * {
			max-width: none;
			& .MuiTab-wrapper {
				align-items: flex-end;
			}
		}

		& .MuiButtonBase-root {
			transition: background-color 500ms ease 0ms;
			& {
				transition: color 500ms ease 0ms;
			}
			&:hover {
				background-color: rgba(255, 0, 0, 0.9) !important;
				& {
					color: white;
				}
			}
		}
	}
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

const SkillCardGrid = styled.div`
	height: 100%;
	width: 40%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`

const Skills = props => {
	const { backgroundColor } = props
	const [ fadeIn, setFadeIn ] = useState(false)
	const [ hoverable, setHoverable ] = useState(false)
	const [ selectedTab, setSelectedTab ] = useState(categories[0].label.en)

	const handleChangeTab = useCallback((e, val) => {
		setSelectedTab(val)
	}, [])

	const [ trail, set, stop ] = useTrail(categories.length, () => ({
		opacity: 0,
		filter: `blur(10px)`,
		onRest: () => setHoverable(true)
	}))

	useEffect(() => {
		if (fadeIn) {
			set({ opacity: 1, filter: 'blur(0px)' })
		} else {
			set({ opacity: 0, filter: 'blur(10px)' })
			setHoverable(false)
		}
	}, [ fadeIn, set ])

	return (
		<Container>
			<Waypoint
				scrollableAncestor={window}
				onEnter={() => setFadeIn(true)}
				onLeave={() => setFadeIn(false)}
			/>
			<GridShadow>
				{/* <GridContainer fluid>
					<Row>
						{categories.map((cat, i) => (
							<Col
								className="col"
								key={cat.label.en}
								lg={4}
								md={6}
								sm={12}
							>
								<SkillCard
									backgroundColor={backgroundColor}
									engCategory={cat.label.en}
									esCategory={cat.label.es}
									fadeDelay={getMSDelay(i)}
									fadeDuration={750}
									fadeIn={fadeIn}
									hoverable={hoverable}
									index={i}
									skills={cat.skills}
								/>
							</Col>
						))}
					</Row>
				</GridContainer> */}
				{/* <SkillCardGrid> */}
				<Tabs
					orientation="vertical"
					value={selectedTab}
					variant="scrollable"
					onChange={handleChangeTab}
					// centered={true}
				>
					{categories.map(cat => {
						return (
							<Tab
								key={cat.label.en}
								label={<Translateable
									en={cat.label.en}
									es={cat.label.es}
								       />}
								value={cat.label.en}
								wrapped={false}
							/>
						)
					})}
					{/* {trail.map((props, i) => {
						const cat = categories[i]
						console.log(props)
						return (<SkillCard 
							style={props}
							backgroundColor={backgroundColor}
							engCategory={cat.label.en}
							esCategory={cat.label.es}
							hoverable={hoverable}
							index={i}
							skills={cat.skills}
							
						>
						</SkillCard>)
					})} */}
				</Tabs>
				{/* </SkillCardGrid> */}
			</GridShadow>
		</Container>
	)
}

Skills.propTypes = {
	backgroundColor: PropTypes.string,
	fontColor: PropTypes.string
}

export default Skills
