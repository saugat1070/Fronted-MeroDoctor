import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar';
import "./index.css";
import Appointment from './Pages/Appointment';
import Book from './Pages/Book';
import Doctors from './Pages/Doctors';
import Home from './Pages/Home';
import Patients from './Pages/Patients';


function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex justify-center">
        <div className="w-[90%] flex flex-col mx-auto items-center">
          <Navbar/>
          <main className="flex-1 py-6">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/book' element={<Book/>}/>
              <Route path='/appointment' element={<Appointment/>}/>
              <Route path='/patients' element={<Patients/>}/>
              <Route path='/doctors' element={<Doctors/>} />
            </Routes>
          </main>
        </div>
      </div>  
    </>
  )
}

export default App
