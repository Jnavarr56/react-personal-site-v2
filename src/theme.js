import routes from 'routes'

//https://ricostacruz.com/til/css-media-query-breakpoints

const theme = {
	breakpoints: {
		xs: 0,
		phone: 414,
		tablet: 834,
		desktop: 1200,
		'large-desktop': 1600
	},
	colors: {
		font: {
			red: '#ff0000',
			white: '#ffffff'
		},
		background: {
			red: 'linear-gradient(to right, #f00000, #dc281e)',
			white: '#ffffff'
		}
	},
	timing: {
		loadingAnimationTiming: 'ease',
		loadingFadeDelay: 500,
		loadingFadeDuration: 500,
		translateableFadeTiming: 'ease',
		translateableFadeDuration: 500,
		translateable: {
			fadeTiming: 'ease',
			fadeDuration: 500
		},
		loadingAnimation: {
			fadeOutTiming: 'ease',
			fadeOutDuration: 500,
			fadeOutDelay: 500
		},
		desktopNav: {
			navigateDelay: 0,
			toggleNavbarItemOpen: {
				duration: 500,
				delayInterval: 75,
				timing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
			},
			toggleNavbarOpen: {
				duration: 550,
				timing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
			}
		}
	}
}

theme.timing.desktopNav.toggleNavbarOpen = {
	...theme.timing.desktopNav.toggleNavbarOpen,
	getCloseDelay: () => {
		const {
			duration: baseDelay,
			delayInterval
		} = theme.timing.desktopNav.toggleNavbarItemOpen
		return baseDelay + routes.length * delayInterval
	}
}

export default theme
