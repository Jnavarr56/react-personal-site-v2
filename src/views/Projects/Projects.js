import React, { useState } from 'react'
import styled from 'styled-components'
import theme from 'theme'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
// import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css'
import 'react-awesome-slider/dist/custom-animations/fold-out-animation.css'
import 'react-awesome-slider/dist/custom-animations/fall-animation.css'

// import { MobileCards } from './components'
// import { StackerSlide, StackerSlider } from 'react-stacker'

const projects = [
	{ name: 'IFBuddy', backgroundColor: 'blue' },
	{ name: 'CommuteCompare', backgroundColor: 'green' },
	{ name: 'GifizeMe', backgroundColor: 'purple' }
]

const ProjectsPage = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	& .awssld {
		height: 100%;
	}
	& .awssld__container {
		height: 100%;
	}
	& .awssld__content {
		background-color: transparent;
		& > div {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;
		}
		${({ projects }) => {
			let str = ''
			projects.forEach((p, i) => {
				str =
					str +
					`
					& .${p.name} {
						background-color: ${projects[i].backgroundColor};
						& * {
							color: white;
						}
					}
				`
			})
			return str
		}}
	}
	& .awssld__bullets {
		bottom: 60px;
	}
`

const projects2 = [
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
const Projects = props => {
	return (
		<ProjectsPage projects={projects}>
			{/* <AwesomeSlider
				animation="cubeAnimation"
			>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
			</AwesomeSlider>	     */}

			<AwesomeSlider animation="foldOutAnimation">
				{projects.map((project, i) => (
					<div
						className={project.name}
						key={`project-${i + 1}`}
					>
						<p>{project.name}</p>
					</div>
				))}
			</AwesomeSlider>
			{/* <MobileCards cards={cards} /> */}
			{/* <StackerSlider
				
               dots={true}
                infiniteLoop={true}
                // onChange={this.onChangeHandler}
                // onPrevChange={this.onPrevChangeHandler}
                // onNextChange={this.onNextChangeHandler}
            >
                <StackerSlide>
                    Slide 6/6
                </StackerSlide>
                <StackerSlide>
                    Slide 5/6
                </StackerSlide>
                <StackerSlide>
                    Slide 4/6
                </StackerSlide>
                <StackerSlide>
                    Slide 3/6
                </StackerSlide>
                <StackerSlide>
                    Slide 2/6
                </StackerSlide>
                <StackerSlide>
                    Slide 1/6
                </StackerSlide>
            </StackerSlider> */}
		</ProjectsPage>
	)
}

export default Projects
