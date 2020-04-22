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

const Container = styled.div`
	height: 100%;
	width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
	align-items: flex-start;
	& * {
		font-family: Raleway;
	}
	padding: 100px 0 0 0;
	// ${breakpoint(`tablet`)`
	// 	padding: 80px 48px 36px 24px;
	// `}
`
const SkillCard = styled.div`
	box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
		0 1px 3px 0 rgba(63, 63, 68, 0.15);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	transition: all 0.75s ease;
	transition-delay: ${({ delay }) => 250 + delay}ms;
	${({ fadeIn }) =>
		fadeIn
			? `filter: blur(0px);
         opacity: 1;`
			: `filter: blur(10px);
		opacity: 0;`}
	overflow:
`
const SkillCardHeader = styled.div`
	padding: 16px 24px;
	width: 100%;
`
const SkillCardDivider = styled.div`
	height: 2px;
	width: 100%;
	background-color: ${({ fontColor }) => fontColor};
`
const SkillCardContent = styled.div`
	padding: 64px 24px;
	flex-grow: 1;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
const SkillItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	&:not(:last-child) {
		margin-bottom: 12px;
	}
`
const SkillLogo = styled.img`
	margin-right: 8px;
	width: 35px;
`

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
	const { fontColor, backgroundColor } = props
	const [ fadeIn, setFadeIn ] = useState(false)

	return (
		<Container>
			<GridContainer
				fluid
				style={{ height: '60%' }}
			>
				<Row style={{ height: '100%' }}>
					{categories.map((cat, i) => (
						<Col
							key={cat.label.en}
							lg={4}
							md={6}
							sm={12}
						>
							<SkillCard
								delay={i * 250}
								fadeIn={fadeIn}
							>
								<SkillCardContent>
									<Translateable
										en={cat.label.en}
										es={cat.label.es}
									/>
								</SkillCardContent>
							</SkillCard>
						</Col>
					))}
				</Row>
			</GridContainer>
			<Waypoint
				onEnter={() => setFadeIn(true)}
				onLeave={() => setFadeIn(false)}
			/>
		</Container>
	)
}

Skills.propTypes = {
	backgroundColor: PropTypes.string,
	fontColor: PropTypes.string
}

export default Skills
