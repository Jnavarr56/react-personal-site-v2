import React from 'react'
import Ripples from 'react-ripples'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
const RippleWrapper = styled.div`
	border-radius: 100%;
	overflow: hidden;
	& .icon-btn {
		padding: 0.75rem;
		cursor: pointer;
		${({ active }) => {
			if (!active) {
				return `   
                        pointer-events: none;
                        opacity: .5;
                    `
			}
		}}
	}
	transition: background-color 250ms ease;
	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
	${breakpoint('tablet')`
        & .icon-btn {
            padding: 1rem;
        }
    `}
`

const IconButton = props => {
	const { active, children, className, onClick } = props
	return (
		<RippleWrapper
			active={active}
			className={className}
		>
			<Ripples
				className="icon-btn"
				onClick={onClick}
			>
				{children}
			</Ripples>
		</RippleWrapper>
	)
}

IconButton.defaultProps = {
	active: true,
	onClick: () => {}
}

export default IconButton
