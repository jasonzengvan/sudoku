import React from 'react'

const Cell = ({value, initial, invalid, onClick}) => {
	if (value === 0) value = ''
	if (initial) 
		return <td className='cell-initial'> {value} </td>
	if (invalid) 
		return (<td className='cell-invalid' onClick={onClick}>{value}</td>)
	return (<td className='cell' onClick={onClick}>{value}</td>)
}

export default Cell