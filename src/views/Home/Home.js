import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Translateable } from 'components/Translateable'
import CONFIG from './ParticleConfig.json'

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`
const ParticleBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Title = styled.h1`
	font-family: Raleway;
	font-color: black;
	font-size: 56px;
	margin-bottom: 16px;
`
const Subtitle = styled.h2`
	text-transform: uppercase;
	font-weight: 200;
	font-size: 36px;
	font-family: Raleway;
	font-color: black;
	letter-spacing: 4px;
`

const Home = () => {
	// useEffect(() => window.particlesJS('particle-background', CONFIG), [])

	return (
		<Container>
			{/* <ParticleBackground id="particle-background" /> */}
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
