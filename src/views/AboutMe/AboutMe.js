import React, { useMemo } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Translateable } from 'components/Translateable'
import PropTypes from 'prop-types'
import { Text } from './components'

const Container = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 56px 16px 36px 8px;
	${breakpoint(`tablet`)`
		padding: 80px 48px 36px 24px;
	`}
	${breakpoint(`tablet`)`
		padding: 116px 48px 36px 32px;
`}
`

const DesktopWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	overflow: auto;
	padding-right: 8px;

	&::-webkit-scrollbar {
		border-radius: 4px;
		background-color: rgba(0, 0, 0, 1);
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 6px;
		background-color: white;
		border: 2px solid rgba(0, 0, 0, 1);
	}
`

const HTMLify = arrStr =>
	arrStr.map((text, i) => (
		<span key={text}>
			{text}
			{i < arrStr.length - 1 && (
				<>
					<br />
					<br />
				</>
			)}
		</span>
	))

const englishText = [
	`I'm an NYC-based DevOps Engineer going on 5 years of experience working in the legal space.
	Currently looking for my next opportunity.`,

	`I'm certified in Kubernetes, Terraform, and have recently done quite a bit of work around 
	agentic AI, specifically with managing and monitoring Azure AI resources, including LLM deployment and observability (Datadog).`,

	`I absolutely love developing with Python and Typescript and have recently authored my first open source project, which is a Terraform related Azure DevOps integration published on the Visual Studio marketplace`,

	`When I'm not developing my Spanish skills or reading about politics,  I'm
	probably tinkering or writing and recording music.`,

	`I'm highly adaptable and never shy away from a challenge or unfamiliar technology. 
	Take a look a around this site to learn more. Think I could be your next great hire? 
	Feel free to contact me for this or anything at all.`,

	`This mobile-friendly site runs on React and styled-components, and is deployed on Netlify.`
]

const spanishText = [
	`Soy ingeniero de DevOps con sede en Nueva York y casi 5 años de experiencia trabajando en el sector legal. Actualmente estoy buscando mi próxima oportunidad.`,

	`Tengo certificación en Kubernetes y Terraform, y recientemente he trabajado bastante en IA con agentes, específicamente en la gestión y monitorización de recursos de IA de Azure, incluyendo implementaciones de LLM.`,

	`Cuando no estoy mejorando mis conocimientos de español o leyendo sobre política, probablemente esté desarrollando aplicaciones full stack o escribiendo y grabando música.`,

	`Cuando no estoy desarrollando mis habilidades en español, leyendo sobre política urbana o 
	tocando la guitarra, es probable que construya aplicaciones full stack, escriba sobre 
	programación o responda preguntas sobre Stack Overflow.`,

	`Soy altamente adaptable y nunca evito un desafío o una tecnología desconocida.
	 Eche un vistazo a este sitio para obtener más información. ¿Crees que podría ser tu próxima gran contratación? 
	No dude en ponerse en contacto conmigo para esto o cualquier cosa.`,

	`Este sitio optimizado para dispositivos móviles se ejecuta en React y styled-components, 
	y se implementa en Netlify.`
]

const AboutMe = props => {
	const { fontColor } = props

	const en = useMemo(() => HTMLify(englishText), [])
	const es = useMemo(() => HTMLify(spanishText), [])
	return (
		<Container>
			<DesktopWrapper>
				<Text fontColor={fontColor}>
					<Translateable
						en={en}
						es={es}
					/>
				</Text>
			</DesktopWrapper>
		</Container>
	)
}

AboutMe.propTypes = {
	fontColor: PropTypes.string
}

export default AboutMe
