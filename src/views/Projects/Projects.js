import React, { useState } from 'react'
import styled from 'styled-components'

const ProjectsPage = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`
// const CardContainer = styled.div`
//     width: 90vw;
//     max-width: 260px;
//     height: 300px;

//     & .swipe {
//         position: absolute;
//     }
// `

// const CardDiv = styled.div`
//   position: relative;
//   background-color: #fff;
//   width: 80vw;
//   max-width: 260px;
//   height: 300px;
//   box-shadow: 0px 0px 60px 0px rgba(0,0,0,0.30);
//   border-radius: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

const CardContainer = styled.div`
	position: relative;
	height: 100%;
	width: 80%;
`

const Card = styled.div`
	height: 50%;
	border-radius: 2px;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 64px 0px;
	box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.5);
	left: 50%;
	transform: translate(-50%, 0);
	transition: all 100ms ease-in-out;
	top: ${({ top }) => top};
	width: ${({ width }) => width};
	background-color: ${({ color }) => color};
	${({ nexting }) => nexting && `animation: scaleDown 500ms;`}
	@keyframes scaleDown {
		0% {
			//   transform: scale(1) translateY(0);
			//   opacity: 1;
		}
		20% {
			//   transform: scale(1.01) translateY(20px);
			//   opacity: 0.8;
		}
		40% {
			//   transform: scale(1.05) translateY(40px);
			//   opacity: 0.4;
		}
		60% {
			//   transform: scale(1.1) translateY(60px);
			//   opacity: 0.2;
		}
		80% {
			//   transform: scale(1.15) translateY(80px);
			//   opacity: 0.1;
		}
		100% {
			transform: scale(1.2) translate(-40%, 100%);
			opacity: 0;
		}
	}
`

// const cards = [
//     'a',
//     'b',
//     'c'
// ]

const Projects = props => {
	const [ cards, setCards ] = useState(
		[ 'red', 'orange', 'yellow', 'green', 'blue', 'purple' ].map(color => ({
			color,
			nextOut: false,
			nextIn: false
		}))
	)

	const [ nexting, setNexting ] = useState(false)
	const widthInterval = 40
	const topInterval = 25

	return (
		<ProjectsPage>
			<CardContainer>
				{cards.map((card, i) => {
					return (
						<Card
							color={card.color}
							key={card.color}
							nexting={nexting && i === cards.length - 1}
							top={`${
								i === 0 ? topInterval : topInterval + (topInterval / 6) * i
							}%`}
							width={`${
								i === 0
									? widthInterval
									: widthInterval + (widthInterval / 5) * i
							}%`}
						>
							<p>{card.color}</p>
						</Card>
					)
				})}
			</CardContainer>
			<button
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
			</button>
			{/* <Cards onEnd={hi => console.log(hi)}>
                {db.map(card => {
                    return (
                        <Card key={card.name}>
                            <h1>{card.name}</h1>
                        </Card>
                    )
                })}
            </Cards> */}
			{/* <CardContainer>
                {db.map(card => {
                    return (
                        <TinderCard className={'swipe'} key={card.name}>
                            <CardDiv>
                                {card.name}
                            </CardDiv>
                        </TinderCard>
                    )
                })}
            </CardContainer> */}
		</ProjectsPage>
	)
}

export default Projects
