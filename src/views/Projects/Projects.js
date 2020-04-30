import React, { useState } from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { MobileCards } from './components'
import { StackerSlide, StackerSlider } from 'react-stacker'

const ProjectsPage = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
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
