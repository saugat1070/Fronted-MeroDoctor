import React from 'react'

export default function Speciality({booking,setBooking,specialties,setStep}) {
    return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Specialty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => {
                    setBooking((prev) => ({
                      ...prev,
                      specialty: specialty
                    }))
                    setStep(2);
                  }}
                  className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                >
                  <div className="text-lg font-medium text-gray-900 group-hover:text-blue-700">
                    {specialty}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
  
}
