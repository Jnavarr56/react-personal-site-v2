import React, { useState } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import {
	Container as GridContainer,
	Row,
	Col,
	setConfiguration
} from 'react-grid-system'
import PropTypes from 'prop-types'
import theme from 'theme'
import { Waypoint } from 'react-waypoint'
import { Translateable } from 'components/Translateable'

const Container = styled.div`
	height: 100%;
	width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
	// padding: 56px 16px 36px 8px;
	// ${breakpoint(`tablet`)`
	// 	padding: 80px 48px 36px 24px;
	// `}
	// ${breakpoint(`tablet`)`
	// 	padding: 116px 48px 36px 32px;
    // `}
`
const SkillCard = styled.div`
	box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
		0 1px 3px 0 rgba(63, 63, 68, 0.15);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	transition: all 0.75s ease;
	transition-delay: ${({ delay }) => 500 + delay}ms;
	${({ fadeIn }) =>
		fadeIn
			? `filter: blur(0px);
         opacity: 1;`
			: `filter: blur(10px);
        opacity: 0;`}
`
const SkillCardHeader = styled.div`
	// justify-content: flex-start;
	width: 100%;
`
const SkillCardDivider = styled.div`
	height: 2px;
	width: 100%;
	background-color: ${({ fontColor }) => fontColor};
`
const SkillCardContent = styled.div`
	// justify-content: flex-start;
	flex-grow: 1;
	width: 100%;
`

setConfiguration({
	breakpoints: [
		theme.breakpoints['phone'],
		theme.breakpoints['tablet'],
		theme.breakpoints['desktop'],
		theme.breakpoints['large-desktop']
	]
})

const categories = [
	{
		label: {
			en: 'Programming Languages'
		}
	},
	{
		label: {
			en: 'Front End Frameworks/Libraries'
		}
	},
	{
		label: {
			en: 'Back End Frameworks/Libraries'
		}
	},
	{
		label: {
			en: 'Databases'
		}
	},
	{
		label: {
			en: 'DevOps/Cloud'
		}
	},
	{
		label: {
			en: 'Tools'
		}
	},
	{
		label: {
			en: 'Other Engineering'
		}
	},
	{
		label: {
			en: 'Misc.'
		}
	}
]

const Skills = props => {
	const { fontColor } = props
	const [ fadeIn, setFadeIn ] = useState(false)

	return (
		<Container>
			<GridContainer
				fluid
				style={{ height: '60%' }}
			>
				<Row style={{ height: '100%' }}>
					{categories.map((cat, i) => (
						<Col
							key={cat.label.en}
							lg={4}
							md={6}
							sm={12}
						>
							<SkillCard
								delay={i * 250}
								fadeIn={fadeIn}
							>
								<SkillCardHeader>
									<span>{cat.label.en}</span>
								</SkillCardHeader>
								<SkillCardDivider fontColor={fontColor} />
								<SkillCardContent>asd</SkillCardContent>
							</SkillCard>
						</Col>
					))}
				</Row>
			</GridContainer>
			<Waypoint
				onEnter={() => setFadeIn(true)}
				onLeave={() => setFadeIn(false)}
			/>
		</Container>
	)
}

Skills.propTypes = {
	backgroundColor: PropTypes.string,
	fontColor: PropTypes.string
}

export default Skills
