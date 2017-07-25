import React from 'react'
import NewGame from '../containers/NewGame'
import Check from '../containers/Check'
import Solve from '../containers/Solve'

const Controllers = () => {
	return (
		<div className='controllers'>
			<NewGame />
			<Check />
			<Solve />
		</div>
	)
}

export default Controllers