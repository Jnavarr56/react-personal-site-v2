import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Translateable } from 'components/Translateable'
import { ContactIcons } from './components'

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`

const Title = styled.h1`
	background-color: rgba(255, 255, 255, .75);
	margin-bottom: 16px;
	font-family: Raleway;
	color: black;
	font-size: 32px;
	${breakpoint('phone')`
		font-size: 42px;
	`}
	${breakpoint('tablet')`
		font-size: 46px;
		margin-bottom: 24px;
	`}
	${breakpoint('desktop')`
		font-size: 64px;
		margin-bottom: 32px;
	`}
`
const Subtitle = styled.h2`
	background-color: rgba(255, 255, 255, .75);
	text-transform: uppercase;
	font-weight: 200;
	font-family: Raleway;
	color: black;
	letter-spacing: 4px;
	text-align: center;
	font-size: 16px;
	${breakpoint('phone')`
		font-size: 21px;
	`}
	${breakpoint('tablet')`
		font-size: 28px;
	`}
	${breakpoint('desktop')`
		font-size: 42px;
	`}
`

const Home = () => {
	return (
		<Container>
			<ContactIcons />
			<Title>Jorge Navarro</Title>

			<Subtitle>
				<Translateable
					en="Full-Stack Developer"
					es="Desarollador Full-Stack"
				/>
			</Subtitle>
		</Container>
	)
}

export default Home
