import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Waypoint } from 'react-waypoint'
import { MobileSkillButtons, AnimatedSkillGrid } from './components'

const categories = [
	{
		label: {
			en: 'Programming Languages',
			es: 'Lenguajes de Programación'
		},
		skills: [
			{
				label: 'TypeScript',
				src: '/skills-logos/programming-languages/typescript.png'
			},
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
			en: 'Front End',
			es: 'Front End'
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
			en: 'Back End',
			es: 'Bibliotecas Back End'
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
			},
			{
				label: 'Spring Boot',
				src: '/skills-logos/back-end-frameworks-libraries/spring-boot.png'
			}
		]
	},
	{
		label: {
			en: 'Databases',
			es: 'Bases de Datos'
		},
		skills: [
			{ label: 'MySQL', src: '/skills-logos/databases/mysql.png' },
			{ label: 'PostgreSQL', src: '/skills-logos/databases/postgresql.png' },
			{ label: 'MongoDB', src: '/skills-logos/databases/mongodb.png' },
			{ label: 'Redis', src: '/skills-logos/databases/redis.png' }
		]
	},
	{
		label: {
			en: 'DevOps/Cloud',
			es: 'DevOps/Nube'
		},
		skills: [
			{ label: 'Docker', src: '/skills-logos/devops-cloud/docker.png' },
			{ label: 'Git', src: '/skills-logos/devops-cloud/git.png' },
			{ label: 'GitHub', src: '/skills-logos/devops-cloud/github.png' },
			{ label: 'Gitlab', src: '/skills-logos/devops-cloud/gitlab.png' },
			{ label: 'NGINX', src: '/skills-logos/devops-cloud/nginx.png' },
			{
				label: 'AWS (S3/EC2/Cognito)',
				src: '/skills-logos/devops-cloud/aws.png'
			},
			{
				label: 'MongoDB Atlas',
				src: '/skills-logos/devops-cloud/mongodb-atlas.png'
			},
			{ label: 'Netlify', src: '/skills-logos/devops-cloud/netlify.png' },
			{ label: 'Heroku', src: '/skills-logos/devops-cloud/heroku.png' }
		]
	},
	{
		label: {
			en: 'Tools',
			es: 'Herramientas'
		},
		skills: [
			{ label: 'iTerm2', src: '/skills-logos/tools/iterm2.png' },
			{ label: 'Oh My Zsh', src: '/skills-logos/tools/oh-my-zsh.png' },
			{ label: 'Visual Studio Code', src: '/skills-logos/tools/vs-code.png' },
			{ label: 'Robo3T', src: '/skills-logos/tools/robo3t.png' },
			{ label: 'Postico', src: '/skills-logos/tools/postico.png' },
			{ label: 'Android Studio', src: '/skills-logos/tools/android-studio.png' }
		]
	},
	{
		label: {
			en: 'Previously Used',
			es: 'Usado Previamente'
		},
		skills: [
			{
				label: 'Apollo/GraphQL',
				src: '/skills-logos/previously-used/apollo-graphql.png'
			},
			{ label: 'Vagrant', src: '/skills-logos/previously-used/vagrant.png' },
			{
				label: 'VirtualBox',
				src: '/skills-logos/previously-used/virtualbox.png'
			},
			{ label: 'Ubuntu', src: '/skills-logos/previously-used/ubuntu.png' }
		]
	},
	{
		label: {
			en: 'Other',
			es: 'Otro'
		},
		skills: [
			{
				label: 'Spanish Language (native)',
				src: '/skills-logos/other/spanish-language.png'
			},
			{
				label: 'French Language (intermediate)',
				src: '/skills-logos/other/french-language.png'
			},
			{ label: 'MS Excel', src: '/skills-logos/other/ms-excel.png' }
		]
	}
]
const Container = styled.div`
	& * {
		font-family: Raleway;
	}
	height: 100%;
	width: 100%;
	padding: 7.25% 0;
`

const Skills = () => {
	const [ fadeIn, setFadeIn ] = useState(false)
	return (
		<Container>
			<Waypoint
				fireOnRapidScroll={false}
				scrollableAncestor={window}
				onEnter={() => setFadeIn(true)}
				onLeave={() => setFadeIn(false)}
			/>
			<MobileSkillButtons
				categories={categories}
				fadeIn={fadeIn}
			/>
			<AnimatedSkillGrid
				categories={categories}
				fadeIn={fadeIn}
			/>
		</Container>
	)
}

Skills.propTypes = {
	backgroundColor: PropTypes.string,
	fontColor: PropTypes.string
}

export default Skills
