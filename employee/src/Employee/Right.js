import React from 'react'
import AdminHome from './AdminHome'
import { Route,Routes } from 'react-router-dom'

import AdminMessage from './AdminMessage'
import AdminLeavehistory from './AdminLeavehistory'

const Right = () => {
  return (
    <div className='flex flex-col py-12 px-12 flex-1 h-full'>
       <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
       
        <Routes>
          <Route path="/home" element={<AdminHome/>}/>
          <Route path='/message' element={<AdminMessage/>}/>
          <Route path='/history' element={<AdminLeavehistory />}/>
          </Routes>
          
          </div>
          
    </div>
  )
}

export default Right
