import React from 'react'
import { Home, AboutMe, Skills, Projects, Contact } from 'views'
const routes = [
	{
		title: { en: 'Home', es: 'Página de Inicio' },
		showTitle: false,
		showParticles: true,
		component: <Home />,
		path: 'home'
	},
	{
		title: { en: 'About Me', es: 'Sobre Mí' },
		showTitle: true,
		showParticles: false,
		component: <AboutMe />,
		path: 'about-me',
		fadeInContent: true
	},
	{
		title: { en: 'Skills', es: 'Habilidades' },
		showTitle: true,
		showParticles: false,
		component: <Skills />,
		path: 'skills'
	},
	{
		title: { en: 'Projects', es: 'Proyectos' },
		showTitle: true,
		showParticles: false,
		component: <Projects />,
		path: 'projects',
		ignorePadding: true,
		fadeInContent: true
	},
	{
		title: { en: 'Contact', es: 'Información de Contacto' },
		showTitle: true,
		showParticles: false,
		component: <Contact />,
		path: 'contact'
	}
]

export default routes
