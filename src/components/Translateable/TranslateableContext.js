import React, { useCallback, useMemo, useState } from 'react'
import Context from './context'
import { useHistory, useRouteMatch } from 'react-router-dom'

const TranslateableContext = props => {
	const { lang, children } = props
	const { push } = useHistory()
	const { params } = useRouteMatch()

	const [ changed, setChanged ] = useState(false)

	const handleChangeLang = useCallback(
		newLang => {
			setChanged(true)
			push({ pathname: `/${params.view}`, search: `?lang=${newLang}` })
		},
		[ push, params.view ]
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
