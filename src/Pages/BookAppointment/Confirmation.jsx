import React, { useEffect, useState } from 'react'
import { Calendar, Clock, MapPin, User } from 'lucide-react'

export default function Confirmation({ 
  booking, 
  setBooking, 
  setStep
}) {
  const [patientNotes, setPatientNotes] = useState(booking?.patientNotes || "");

  useEffect(() => {
    setBooking((prev) => ({
      ...prev,
      patientNotes: patientNotes
    }));
  }, [patientNotes, setBooking]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Appointment</h2>
      
      {/* Appointment Type Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Type</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setBooking((prev) => ({
              ...prev,
              appointmentType: "New Patient"
            }))}
            className={`p-4 border-2 rounded-lg transition-all ${
              booking?.appointmentType === 'New Patient'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-semibold">New Patient</div>
              <div className="text-sm text-gray-600 mt-1">First time visit</div>
            </div>
          </button>
          <button
            onClick={() => setBooking((prev) => ({
              ...prev,
              appointmentType: "Follow-up"
            }))}
            className={`p-4 border-2 rounded-lg transition-all ${
              booking?.appointmentType === 'Follow-up'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-semibold">Follow-up</div>
              <div className="text-sm text-gray-600 mt-1">Return visit</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {booking?.doctor?.image ? (
              <img
                src={booking?.doctor.image}
                alt={booking?.doctor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">{booking?.doctor?.name || 'Dr. Sample Doctor'}</p>
              <p className="text-blue-600">{booking?.doctor?.specialty || 'General Medicine'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">
                {booking?.date_time ? new Date(booking?.date_time).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'Date not selected'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{booking?.timeSlots || 'Time not selected'}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700">{booking?.doctor?.location || 'Medical Center'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking?.appointmentType === 'New Patient' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {booking?.appointmentType}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes (Optional)</h3>
        <textarea
          value={patientNotes}
          onChange={(e) => setPatientNotes(e.target.value)}
          placeholder="Please describe your symptoms or reason for visit..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep && setStep(3)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => alert(JSON.stringify(booking, null, 2))}
          className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Confirm {booking?.appointmentType || 'New Patient'} Appointment
        </button>
      </div>
    </div>
  )
}
