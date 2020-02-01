import React from 'react'
import styled from 'styled-components'
import { Translateable } from 'components/Translateable'

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	padding: 32px;
`

const Title = styled.h1`
	font-family: Raleway;
	font-color: black;
	font-size: 56px;
	margin-bottom: 16px;
`

const AboutMe = () => {
	return (
		<Container>
			<Title>
				<Translateable
					en="I'm a full-stack developer with 2 software development internships seeking a junior developer role."
					es="Soy un desarrollador full-stack con 2 pasantías de desarrollo de software buscando un rol de desarrollador junior."
				/>
			</Title>
		</Container>
	)
}

export default AboutMe
