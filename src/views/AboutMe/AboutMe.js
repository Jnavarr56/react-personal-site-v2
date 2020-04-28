import React, { useMemo } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Translateable } from 'components/Translateable'
import PropTypes from 'prop-types'
import { MobileText, Text } from './components'

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
	// display: none;
	// ${breakpoint(`tablet`)`
	// 	display: flex;
	// `}
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
	`I'm an NYC-based full-stack developer with 2 software development internships
	currently seeking a junior/entry software development role in the greater
	New York area.`,

	`I have experience with a variety of programming languages as well as 
	several front-end and back-end frameworks but at the moment tend towards a full JavaScript stack, 
	specifically React/Express/MongoDB.`,

	`I graduated in 2016 with a bachelor's degree from Binghamton University and afterwords worked
	for about a year in corporate restructuring before shifting gears and completing a full stack
	development bootcamp at the New York Academy of Code and Design, which led me to my software
	development internships. I am working part-time on a Master's of Science in Computer Science
	degree at Pace University's Seidenberg School of Computer Science and Information Systems.`,

	`When I'm not developing my Spanish skills, reading about urban policy, or playing guitar I'm
	probable building full stack apps, writing about programming or
	answering questions on Stack Overflow.`,

	`I'm highly adaptable and never shy away from a challenge or unfamiliar technology. 
	Take a look a around this site to learn more. Think I could be your next great hire? 
	Feel free to contact me for this or anything at all.`,

	`This mobile-friendly site runs on React and styled-components, and is deployed on Netlify.`
]

const spanishText = [
	`Soy un desarrollador full-stack con sede en Nueva York con 2 pasantías de desarrollo de 
	software que actualmente busco un rol de desarrollo de software junior / de entrada en el
	área metropolitana de Nueva York.`,

	`Tengo experiencia con una variedad de lenguajes de programación, así como con varios 
	marcos front-end y back-end, pero en este momento tienden a una pila completa de JavaScript, 
	específicamente React / Express / MongoDB.`,

	`Me gradué en 2016 con una licenciatura de la Universidad de Binghamton y después trabajé
	durante aproximadamente un año en la reestructuración corporativa antes de cambiar de marcha
	y completar un campamento de desarrollo de pila completa en la Academia de Código y Diseño de
	Nueva York, lo que me llevó a mis pasantías de desarrollo de software. Estoy trabajando a tiempo
	parcial en una Maestría en Ciencias en Ciencias de la Computación en la Escuela de Ciencias de la
	Computación y Sistemas de Información Seidenberg de la Universidad de Pace.`,

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
			{/* <MobileText
				englishText={englishText}
				fontColor={fontColor}
				spanishText={spanishText}
			/> */}
		</Container>
	)
}

AboutMe.propTypes = {
	backgroundColor: PropTypes.string,
	fontColor: PropTypes.string
}

export default AboutMe
