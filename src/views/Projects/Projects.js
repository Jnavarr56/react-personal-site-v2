import React, { useState } from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { MobileCards } from './components'

const ProjectsPage = styled.div`
	height: 100%;
	width: 100%;
`

const CardContainer = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`

const Card = styled.div`
	height: 60%;
	border-radius: 4px;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.5);
	left: 50%;
	transform: translate(-50%, 0);
	transition: all 100ms ease-in-out;
	top: ${({ top }) => top};
	width: ${({ width }) => width};
	background-color: ${({ backgroundColor }) => backgroundColor};
	& .title {
		color: ${({ color }) => color};
	}
	${({ nexting }) => nexting && `animation: scaleDown 500ms;`}
	@keyframes scaleDown {
		100% {
			transform: scale(1.2) translate(-40%, 100%);
			opacity: 0;
			filter: blur(10px);
		}
	}
`

const projects = [
	{
		type: 'APP',
		name: 'IFBuddy',
		tagline: 'A full-stack web app for tracking intermittent fasting goals.',
		mainTechnologies: [ 'jQuery', 'Bootstrap', 'Ruby on Rails', 'PostgreSQL' ],
		completed: true,
		deployedMedium: 'Heroku',
		githubLink: 'https://github.com/Jnavarr56/IFBuddy',
		deployedLink: 'https://ifbuddy.herokuapp.com/'
	}
]

const topOffset = 6.25
const topInterval = 25
const calculateTop = index => {
	if (index === 0) {
		return topOffset
	} else {
		return topOffset + (topInterval / 6) * index
	}
}
const Projects = props => {
	const [ cards, setCards ] = useState([
		'red',
		'orange',
		'yellow',
		'green',
		'blue',
		'purple',
		'black'
	])

	const [ nexting, setNexting ] = useState(false)
	const widthInterval = 40

	return (
		<ProjectsPage>
			<MobileCards cards={cards} />
			{/* <CardContainer>
				{cards.map((card, i) => {
					return (
						<Card
							backgroundColor={card}
							fontColor={'red'}
							key={card.color}
							nexting={nexting && i === cards.length - 1}
							top={`${calculateTop(i)}%`}
							width={`${
								i === 0
									? widthInterval
									: widthInterval + (widthInterval / 6) * i
							}%`}
						>
							<p className="title">{card}</p>
						</Card>
					)
				})}
			</CardContainer> */}
			{/* <button
				onClick={() => {
					setNexting(true)
					const lastCard = cards[cards.length - 1]
					const sliced = cards.slice(0, cards.length - 1)

					setTimeout(() => {
						setCards([ ...sliced ])
						setNexting(false)
						setCards([ lastCard, ...sliced ])
					}, 500)
				}}
			>
				next
			</button> */}
		</ProjectsPage>
	)
}

export default Projects
