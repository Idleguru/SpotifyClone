import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const DisplayAlbum = () => {
  const { id } = useParams()
  const AlbumData = albumsData[id]
  const {playWithId} = useContext(PlayerContext)
  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className='w-48 rounded' src={AlbumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{AlbumData.name}</h2>
          <h4>{AlbumData.desc}</h4>
          <p className="mt-1">
            <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
            <b>Spotify</b>
            1,323,549 Likes
            <b>50 songs</b>
            about 2 hr 26 min
          </p>
        </div>
      </div>
      <div className="grid grid-col-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] ">
        <p><b className="mr-4">#</b></p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img src={assets.clock_icon} alt="" className="m-auto w-4" />
      </div>
      <hr />
      {
        songsData.map((items, index) => (
          <div key={index} onClick={()=>playWithId(items.id)} className=" grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center hover:bg-[#ffffff2b] cursor-pointer text-[#a7a7a7] ">
            <p className="text-white">
              <b className="mr-4 text[#a7a7a7]">{index + 1}</b>
              <img src={items.image} alt="" className="inline w-10 mr-5" />
              {items.name}
            </p>
            <p className="text-[15px]">{AlbumData.name}</p>
            <p className="hidden text-[15px] sm:block">5 days ago</p>
            <p className='text-[15px] text-center'>{items.duration}</p>

          </div>
        ))
      }
    </>
  )
}

export default DisplayAlbum