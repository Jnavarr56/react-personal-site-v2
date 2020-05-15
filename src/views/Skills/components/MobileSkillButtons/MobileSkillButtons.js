import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import {
	Slide,
	Button as MuiButton,
	Dialog,
	DialogTitle,
	IconButton,
	Divider,
	DialogContent,
	withStyles
} from '@material-ui/core'
import { config, animated, useTrail } from 'react-spring'
import ParticleEffectButton from 'react-particle-effect-button'
import { MdClose as CloseIcon } from 'react-icons/md'
import { Translateable } from 'components/Translateable'
import theme from 'theme'
import PropTypes from 'prop-types'
const Transition = React.forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction="up"
			ref={ref}
			{...props}
		/>
)
})

const Container = styled.div`
	width: 100%;
	overflow: auto;
	padding: 8px 0 0 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	${breakpoint('tablet')`
        display: none;
    `}
`

const CategoryButtonContainer = styled(animated.div)`
	height: 64px;
	width: 100%;
	&:not(:last-child) {
		margin-bottom: 16px;
	}
	& > div {
		height: 100%;
		width: 100%;
		& > div {
			height: 100%;
			width: 100%;
			& > div {
				height: 100%;
				width: 100%;
			}
		}
	}
`

const Button = withStyles(() => ({
	root: {
		borderRadius: 8,
		height: '100%',
		color: theme.colors.font.white,
		backgroundColor: theme.colors.font.red,
		'&:hover': {
			color: theme.colors.font.red,
			backgroundColor: 'white',
			textDecoration: 'none',
			border: `solid 2px ${theme.colors.font.red}`
		}
	}
}))(props => {
	return <MuiButton {...props} />
})

const ButtonText = styled.span`
	font-size: 12px;
	${breakpoint('phone')`
        font-size: 16px;
    `}
`

const ButtonItem = styled(animated.li)`
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
	font-family: Raleway;
	& > img {
		height: 26px;
	}
	${breakpoint('phone')`
        & > img { height: 32px; }
    `}
`

const PARTICLE_ANIMATION_DURATION = 300

const CategoryButton = ({ springProps, skills, category, fadeIn }) => {
	const [ open, setOpen ] = useState(false)
	const [ fadeOut, setFadeOut ] = useState(false)
	const handleOpen = useCallback(() => {
		setFadeOut(true)
		// setTimeout(() => setOpen(true), PARTICLE_ANIMATION_DURATION * 2)
	}, [])
	const handleClose = useCallback(() => {
		setOpen(false)
	}, [])

	const fadeInTrails = useTrail(skills.length, {
		from: {
			opacity: 0,
			transform: 'translateY(100%)'
		},
		to: {
			opacity: open ? 1 : 0,
			transform: `translateY(${open ? 0 : 100}%)`
		},
		config: config.stiff
	})

	useEffect(() => {
		if (!fadeIn) {
			setOpen(false)
			setFadeOut(false)
		}
	}, [ fadeIn ])
	return (
		<>
			<CategoryButtonContainer style={springProps}>
				<ParticleEffectButton
					color="#FF0000"
					duration={PARTICLE_ANIMATION_DURATION}
					hidden={fadeOut}
					key={category.label.en}
					onComplete={() => {
						if (fadeOut && !open) {
							setOpen(true)
							setFadeOut(false)
						}
					}}
				>
					<Button
						fullWidth
						variant="contained"
						onClick={handleOpen}
					>
						<ButtonText>
							<Translateable
								en={category.label.en}
								es={category.label.es}
							/>
						</ButtonText>
					</Button>
				</ParticleEffectButton>
			</CategoryButtonContainer>
			<Dialog
				fullScreen
				open={open}
				TransitionComponent={Transition}
			>
				<DialogTitle>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<Divider />
				<DialogContent>
					<ul>
						{skills.map((skill, i) => (
							<ButtonItem
								key={skill.label}
								style={fadeInTrails[i]}
							>
								<p>{skill.label}</p>
								<img
									alt={skill.label}
									src={skill.src}
								/>
							</ButtonItem>
						))}
					</ul>
				</DialogContent>
			</Dialog>
		</>
	)
}

const MobileSkillButtons = props => {
	const { fadeIn, categories } = props

	const fadeInTrails = useTrail(categories.length, {
		from: {
			opacity: 0,
			transform: 'translateY(100%)'
		},
		to: {
			opacity: fadeIn ? 1 : 0,
			transform: `translateY(${fadeIn ? 0 : 100}%)`
		},
		config: config.stiff
	})

	return (
		<Container>
			{categories.map((category, i) => (
				<CategoryButton
					category={category}
					fadeIn={fadeIn}
					key={category.label.en}
					skills={category.skills}
					springProps={fadeInTrails[i]}
				/>
			))}
		</Container>
	)
}

MobileSkillButtons.propTypes = {
	categories: PropTypes.array,
	fadeIn: PropTypes.bool
}

export default MobileSkillButtons
