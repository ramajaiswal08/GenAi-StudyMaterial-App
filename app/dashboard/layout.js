"use client"
import React from 'react'
import SideBar from './_components/SideBar'
import DashboardHeader from './_components/DashboardHeader'
import { CourseCOuntContext } from '../_context/CourseCountContext'

const DashboardLayout = ({children}) => {
  const [totalCourse, setTotalCourse] = React.useState(0);
  return (
    <CourseCOuntContext.Provider value={{totalCourse, setTotalCourse}}>
    <div>
        <div className='md:w:64 hidden md:block fixed'>
            <SideBar/>
            </div>
            <div className='md:ml-64'>
                <DashboardHeader/>
                <div className='p-10'>
                {children}
                </div>
            </div>
           </div>
           </CourseCOuntContext.Provider>
  )
}

export default DashboardLayout