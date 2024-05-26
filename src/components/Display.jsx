import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/assets'

const Display = () => {
  const displayBg = useRef()
  const isLocation = useLocation().pathname.includes('album')
  const albumId = isLocation ? useLocation().pathname.slice(-1) : "";
  console.log(albumId)
  const albumColor = albumsData[Number(albumId)].bgColor
  console.log(albumColor)
  useEffect(() => {
    if (isLocation) {
      displayBg.current.style.background = `Linear-gradient(${albumColor}, #121212)`
    } else {
      displayBg.current.style.background = '#121212'
    }
  })


  return (
    <>
      <div ref={displayBg} className="w-[100%] m-2 px-6 pt-4 rounded  text-white overflow-auto lg:w-[75%] lg:ml-0 ">
        <Routes>
          <Route path='/' element={<DisplayHome />} />
          <Route path='/album/:id' element={<DisplayAlbum />} />

        </Routes>
      </div>

    </>
  )
}

export default Display