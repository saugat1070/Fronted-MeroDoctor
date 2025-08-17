import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar';
import "./index.css";
import Appointment from './Pages/Appointment';
import Doctors from './Pages/Doctors';
import Home from './Pages/Home';
import Patients from './Pages/Patients';
import Footer from './Components/Footer';
import BookAppointment from './Pages/BookAppointment/BookAppointment';


function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="w-[90%] flex flex-col mx-auto items-center">
          <Navbar/>
          <main className="flex-1 py-6">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/book' element={<BookAppointment/>}/>
              <Route path='/appointment' element={<Appointment/>}/>
              <Route path='/patients' element={<Patients/>}/>
              <Route path='/doctors' element={<Doctors/>} />
            </Routes>
          </main>
        </div>
        <Footer/>
      </div>  
    </>
  )
}

export default App
