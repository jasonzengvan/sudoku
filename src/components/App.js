import React from 'react'
import BoardContainer from '../containers/BoardContainer'
import Message from '../containers/Message'
import Controllers from '../components/Controllers'
import Footer from '../components/Footer'


const App = () => (
  <div className='content'>
  	<h1> Sudoku </h1>
  	<Message />
  	<BoardContainer />
  	<Controllers />
  	<Footer />
  </div>
)

export default App
