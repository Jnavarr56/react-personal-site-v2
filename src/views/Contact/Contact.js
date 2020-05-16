import React, { useState } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Waypoint } from 'react-waypoint'
import { useTrail, animated, config } from 'react-spring'
import {
	FiGithub as GithubIcon,
	FiCodepen as CodePenIcon,
	FiLinkedin as LinkedInIcon
} from 'react-icons/fi'
import { FaAngellist as AngelListIcon } from 'react-icons/fa'
import {
	AiOutlineMail as EmailIcon,
	AiOutlinePhone as PhoneIcon
} from 'react-icons/ai'
import { IconButton } from '@material-ui/core'

const contactLines = [
	{
		label: 'Github',
		link: 'https://github.com/Jnavarr56',
		icon: <GithubIcon />
	},
	{
		label: 'CodePen',
		link: 'https://codepen.io/collection/DQvVZN/',
		icon: <CodePenIcon />
	},
	{
		label: 'LinkedIn',
		link: 'https://www.linkedin.com/in/jnavarr5/',
		icon: <LinkedInIcon />
	},
	{
		label: 'AngelList',
		link: 'https://angel.co/jorge-navarro',
		icon: <AngelListIcon />
	},
	{
		label: '+1.917.683.0901',
		link: 'tel:+19176830901',
		icon: <PhoneIcon />
	},
	{
		label: 'jnavarr56@gmail.com',
		link: 'mailto:jnavarr56@gmail.com',
		icon: <EmailIcon />
	}
]

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

const AnimatedLi = styled(animated.li)`
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) { margin-bottom: 5px; }
    & .MuiIconButton-root {
        color: black;
        &:hover { color: red; }
        width: 100%;
        border-radius: 8px; 
        letter-spacing: 4px;
        font-family: Raleway;
        text-transform: uppercase;
        font-size: 16px;
    }
    ${breakpoint('phone')`
        &:not(:last-child) { margin-bottom: 8px; }
        & .MuiIconButton-root {
            font-size: 18px;
        }
    `}
    ${breakpoint('tablet')`
        &:not(:last-child) { margin-bottom: 12px; }
        & .MuiIconButton-root {
            font-size: 24px;
        }
    `}
    ${breakpoint('desktop')`
        &:not(:last-child) { margin-bottom: 18px; }
        & .MuiIconButton-root {
            font-size: 32px;
        }
    `}

`

const totalItems = contactLines.reduce(
	(acc, { label }) => acc + 1 + label.length,
	0
)

const Contact = () => {
	const [ fadeIn, setFadeIn ] = useState(false)

	const opacity = useTrail(totalItems, {
		from: { opacity: 0 },
		to: { opacity: fadeIn ? 1 : 0 }
	})

	const left = useTrail(totalItems, {
		from: { transform: 'translateX(-50%)' },
		to: { transform: `translateX(${fadeIn ? 0 : -50}%)` },
		config: config.stiff
	})

	const right = useTrail(totalItems, {
		from: { transform: 'translateX(50%)' },
		to: { transform: `translateX(${fadeIn ? 0 : 50}%)` },
		config: config.stiff
	})

	return (
		<>
			<Waypoint
				onEnter={() => setFadeIn(true)}
				onLeave={() => setFadeIn(false)}
			/>
			<Container>
				<ul>
					{contactLines.map(({ label, icon, link }, i) => {
						const trail = i % 2 === 0 ? left : right
						const onClick = () => setTimeout(() => window.open(link), 250)
						return (
							<AnimatedLi
								key={label}
								style={{ ...opacity[i], ...trail[i] }}
							>
								<IconButton onClick={onClick}>
									{icon}&nbsp;&nbsp;{label}
								</IconButton>
							</AnimatedLi>
						)
					})}
				</ul>
			</Container>
		</>
	)
}

export default Contact
