import React, { useState } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import {
	Container as GridContainer,
	Row,
	Col,
	setConfiguration
} from 'react-grid-system'
import PropTypes from 'prop-types'
import theme from 'theme'
import { Waypoint } from 'react-waypoint'
import { Translateable } from 'components/Translateable'
import { SkillCard } from './components'
const Container = styled.div`
	& * {
		font-family: Raleway;
	}
	height: 100%;
	width: 100%;
	padding: 7.25% 0;
`
const GridShadow = styled.div`
	border-radius: 4px;
	height: 100%;
	width: 100%;
	padding: 0px 6px;
	display: flex;
	align-items: flex-start;
	overflow-y: auto;
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

// const SkillCard = styled.div`
// 	cursor: pointer;
// 	background-color: white;
// 	box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
// 	border-radius: 4px;
// 	padding: 64px 0px;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	transition:
// 		opacity 0.75s ease ${({ delay }) => 250 + delay}ms,
// 		filter 0.75s ease ${({ delay }) => 250 + delay}ms,
// 		background-color .75s ease;
// 		box-shadow .75s ease;
// 	& * {
// 		transition: color .325s ease;
// 	}
// 	margin: 10px 0;
// 	${({ fadeIn }) =>
// 		fadeIn
// 			? `filter: blur(0px);
//          opacity: 1;`
// 			: `filter: blur(10px);
// 		opacity: 0;`}
// 	&:hover {
// 		${({ fadeIn }) =>
// 			fadeIn &&
// 			`
// 			background-color: rgba(255,0,0, .75);
// 			box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
// 			& * {
// 				color: white;
// 			}
// 		`}
// 	}
// `

setConfiguration({
	breakpoints: [
		theme.breakpoints['phone'],
		theme.breakpoints['tablet'],
		theme.breakpoints['desktop'],
		theme.breakpoints['large-desktop']
	]
})

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
			{ label: 'MongoDB', src: '/skills-logos/databases/mongodb.png' }
		]
	},
	{
		label: {
			en: 'DevOps/Cloud',
			es: 'DevOps/Nube'
		}
	},
	{
		label: {
			en: 'Tools',
			es: 'Herramientas'
		}
	},
	{
		label: {
			en: 'Other Engineering',
			es: 'Otros Technologicos'
		}
	},
	{
		label: {
			en: 'Misc.',
			es: 'Misceláneo'
		}
	}
]

const Skills = props => {
	const { backgroundColor, fontColor } = props
	const [ fadeIn, setFadeIn ] = useState(false)

	return (
		<>
			<Container>
				<GridShadow>
					<GridContainer fluid>
						<Row>
							{categories.map((cat, i) => (
								<Col
									key={cat.label.en}
									lg={4}
									md={6}
									sm={12}
								>
									<SkillCard
										backgroundColor={backgroundColor}
										engCategory={cat.label.en}
										esCategory={cat.label.es}
										fadeIn={fadeIn}
										index={i}
									/>
								</Col>
							))}
						</Row>
					</GridContainer>
				</GridShadow>
			</Container>
			<Waypoint
				onEnter={() => setFadeIn(true)}
				onLeave={() => setFadeIn(false)}
			/>
		</>
	)
}

Skills.propTypes = {
	backgroundColor: PropTypes.string,
	fontColor: PropTypes.string
}

export default Skills
