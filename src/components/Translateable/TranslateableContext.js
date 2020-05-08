import React, { useCallback, useMemo, useState } from 'react'
import Context from './context'
import { useHistory } from 'react-router-dom'

const TranslateableContext = props => {
	const { lang, children } = props
	const [ changed, setChanged ] = useState(false)

	const history = useHistory()

	const handleChangeLang = useCallback(
		newLang => {
			// eslint-disable-next-line
			history.push({
				pathname: `${window.location.pathname}`,
				search: `?lang=${newLang}`
			})
			setChanged(true)
		},
		[ history ]
	)

	const value = useMemo(
		() => ({
			changed,
			lang,
			handleChangeLang
		}),
		[ changed, lang, handleChangeLang ]
	)

	return <Context.Provider value={value}>{children}</Context.Provider>
}

export default TranslateableContext
