import React from 'react'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Movie } from './components/Movie'
import { NewMovie } from './components/NewMovie'
import { Edit } from './components/Edit'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/new' element={<NewMovie />}></Route>
        <Route path='/:id' element={<Movie />}></Route>
        <Route path='/:id/edit' element={<Edit />}></Route>
      </Routes>
    </>
  )
}
export default App