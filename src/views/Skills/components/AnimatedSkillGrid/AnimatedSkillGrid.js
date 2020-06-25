import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Tabs, Tab, Divider, Card, Typography } from '@material-ui/core'
import breakpoint from 'styled-components-breakpoint'
import {
	animated,
	config,
	useSpring,
	useTransition,
	useChain
} from 'react-spring'
import { Translateable } from 'components/Translateable'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 2rem;
	display: none;
	${breakpoint('tablet')`
        display: initial;
    `}
`

const SkillGridContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	& > *:nth-child(1) {
		flex-shrink: 0;
	}
	& > *:nth-child(2) {
		flex-shrink: 0;
		display: none !important;
	}
	& > *:nth-child(3) {
	}
	& > *:nth-child(4) {
		display: none !important;
	}
	& > *:last-child {
		flex-grow: 1;
	}
	${breakpoint('desktop')`
        & > * { height: 100%; }
        flex-direction: row;
        & > *:nth-child(1) { 
            flex-shrink: 0;
            display: none !important; 
        }
        & > *:nth-child(2) {
            flex-shrink: 0;
            display: flex !important; 
        }
        & > *:nth-child(3) { display: none !important; }
        & > *:nth-child(4) { display: flex !important; }
    `}
`

const SkillGridBoxContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	padding: 16px;
`

const SkillGrid = styled(animated.div)`
	position: relative;
	padding: 25px;
	background: white;
	box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
	border-radius: 100%;
	height: 200px;
	width: 200px;
	background: rgba(255, 0, 0, 1);
	border-radius: 8px;
	& .MuiGrid-container {
		height: 100%;
		& .MuiGrid-item {
			height: 33%;
			& .MuiCard-root {
				& > img {
					margin-bottom: 8px;
				}
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}
	& .MuiTypography-root {
		font-family: Raleway;
	}
	${breakpoint('tablet')`
        & .MuiCard-root {
            & img { height: 56px; }
            & .MuiTypography-root { font-size: 14px; }
        }
    `}
	${breakpoint('desktop')`
        & .MuiCard-root {
            & img { height: 72px; }
            & .MuiTypography-root { font-size: 16px; }
        }
    `}
`

const AnimatedGrid = animated(Grid)

const SkillGridBox = ({ entering, skills, onEnd }) => {
	const springRef = useRef()
	const SpringProps = useSpring({
		ref: springRef,
		config: config.stiff,
		from: {
			height: '30%',
			width: '15%',
			background: 'rgba(255, 0, 0, 1)',
			transform: 'rotate(180deg)'
		},
		to: {
			height: entering ? '100%' : '30%',
			width: entering ? '100%' : '15%',
			background: entering ? 'rgba(255, 0, 0, .5)' : 'rgba(255, 0, 0, 1)',
			transform: entering ? 'rotate(0deg)' : 'rotate(180deg)'
		},
		onRest: onEnd
	})

	const transitionRef = useRef()
	const TransitionProps = useTransition(
		entering ? skills : [],
		item => item.label,
		{
			ref: transitionRef,
			trail: 400 / skills.length,
			from: { opacity: 0, transform: 'scale(0)' },
			enter: { opacity: 1, transform: 'scale(1)' },
			leave: { opacity: 0, transform: 'scale(0)' }
		}
	)

	useChain(entering ? [ springRef, transitionRef ] : [ transitionRef, springRef ], [
		0,
		0.5
	])

	return (
		<SkillGrid style={SpringProps}>
			<Grid
				alignContent="flex-start"
				container
				spacing={2}
			>
				{TransitionProps.map(({ item, key, props }) => {
					return (
						<AnimatedGrid
							item
							key={key}
							style={{ ...props }}
							xs={4}
						>
							<Card>
								{item.src && <img
									alt={item.label}
									src={item.src}
								             />}
								<Typography variant="subtitle1">{item.label}</Typography>
							</Card>
						</AnimatedGrid>
					)
				})}
			</Grid>
		</SkillGrid>
	)
}

const TabSelector = props => {
	const { selectedCategory, onChange, categories, orientation } = props

	return (
		<Tabs
			orientation={orientation}
			value={selectedCategory}
			variant="scrollable"
			onChange={onChange}
		>
			{categories.map((cat, i) => {
				return (
					<Tab
						key={cat.label.en}
						label={<Translateable
							en={cat.label.en}
							es={cat.label.es}
						       />}
						value={i}
						wrapped={false}
					/>
				)
			})}
		</Tabs>
	)
}

const AnimatedSkillGrid = props => {
	const { fadeIn, categories } = props

	const [ entering, setEntering ] = useState(false)
	const [ lastCategory, setLastCategory ] = useState(0)
	const [ selectedCategory, setSelectedCategory ] = useState(0)

	useEffect(() => {
		if (fadeIn) {
			setTimeout(() => {
				setEntering(true)
			}, 1000)
		} else {
			setEntering(false)
			setLastCategory(0)
			setSelectedCategory(0)
		}
	}, [ fadeIn ])

	const skills = !entering
		? categories[lastCategory].skills
		: categories[selectedCategory].skills

	const onChangeTab = (e, val) => {
		if (val !== selectedCategory) {
			setEntering(false)
			setLastCategory(selectedCategory)
			setSelectedCategory(val)
		}
	}

	return (
		<Container>
			<SkillGridContainer>
				<TabSelector
					categories={categories}
					orientation="horizontal"
					selectedCategory={selectedCategory}
					onChange={onChangeTab}
				/>
				<TabSelector
					categories={categories}
					orientation="vertical"
					selectedCategory={selectedCategory}
					onChange={onChangeTab}
				/>
				<Divider orientation="horizontal" />
				<Divider orientation="vertical" />
				<div>
					<SkillGridBoxContainer>
						{fadeIn && (
							<SkillGridBox
								entering={entering}
								skills={skills}
								onEnd={entering ? () => {} : () => setEntering(true)}
							/>
						)}
					</SkillGridBoxContainer>
				</div>
			</SkillGridContainer>
		</Container>
	)
}

AnimatedSkillGrid.propTypes = {
	categories: PropTypes.array,
	fadeIn: PropTypes.bool
}

export default AnimatedSkillGrid
