import React, { useState } from 'react';
import Confirmation from './Confirmation';
import Doctor from './Doctor';
import Speciality from './Speciality';
import { ArrowLeft, Speaker } from 'lucide-react';





export default function BookAppointment() {

  const [step,setStep] = useState(1);
  const [booking,setBooking] = useState({
    speciality : "",
    doctor : "",
    date_time :""
  })

  const specialties = [
    'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 
    'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery'
  ];

    const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      experience: '15+ years',
      location: 'Main Hospital - Floor 3',
      availability: 'Available Today',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.8,
      experience: '12+ years',
      location: 'Main Hospital - Floor 2',
      availability: 'Available Tomorrow',
      image: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Neurology',
      rating: 4.9,
      experience: '18+ years',
      location: 'Main Hospital - Floor 4',
      availability: 'Available Today',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];
// speciality,setSpeciality,specialties,setStep
  const stepfunction = ()=>{
    switch(step){
      case 1:
        return (<Speciality booking={booking} setBooking={setBooking} specialties={specialties} setStep={setStep}/>)
      case 2:
        return (<Doctor/>)
      case 3:
        return (<Confirmation/>)
      default:
        return <Speciality/>
    }
  }



  return (
    <div className='m-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='mb-8'>
        <button className='text-blue-600 hover:text-blue-700 font-medium mb-4 flex cursor-pointer'>
          <ArrowLeft/> <p>Back to Dashboard</p>
        </button>
     

      <div className='flex items-center space-x-8 mb-6'>
        {
          [
            { step: 1, label: 'Specialty' },
            { step: 2, label: 'Doctor' },
            { step: 3, label: 'Date & Time' },
            { step: 4, label: 'Confirmation' }
          ].map((item,index)=>(
            <div key={index} className='flex items-center'>
              <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= item.step ? 'bg-blue-600 text-white' : 'bg-gray-200'}
                `}
              >{item.step}</div>
              <span className={`ml-2 text-sm font-medium ${step >= item.step ? 'text-blue-600' : 'text-gray-600'}`}>{item.label}</span>
              {index < 3 && <div className='ml-4 w-8 h-0.5 bg-gray-200'></div>}

            </div>
          ))
        }
      </div>
       </div>
       <div className='bg-gray-50 rounded-xl p-6'>
        {stepfunction()}
       </div>
    </div>
  )
}
