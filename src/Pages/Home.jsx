import React from "react";
import { Calendar,User,Activity,Clock,ArrowRight } from "lucide-react";

export default function Home() {


    const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2025-01-15',
      time: '10:30 AM',
      type: 'Check-up'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '2025-01-18',
      time: '2:00 PM',
      type: 'Consultation'
    },
    {
      id: 3,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '2025-01-18',
      time: '2:00 PM',
      type: 'Consultation'
    }
  ];

  const stats = [
    {
      label: "Appointments",
      value: "12",
      icon: Calendar,
      color: "bg-blue-500",
    },
    { label: "Upcoming", value: "2", icon: Clock, color: "bg-green-500" },
    {
      label: "Doctors Visited",
      value: "5",
      icon: User,
      color: "bg-purple-500",
    },
    {
      label: "Health Score",
      value: "95%",
      icon: Activity,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="w-[100%] mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome Back, Saugat
        </h1>
        <p className="text-lg text-gray-600">
          Manage your health appointments and stay connected with your
          healthcare providers
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {
        stats.map((stat, index) => {
            const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow w-[20rem]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-gray-600 mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        );
        })
    }
      </div>
      {/* For Upcoming Appointment and recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                            <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.type}</p>
                            <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 transition-colors">
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions & Alerts</h2>
          </div>
          <div className="flex flex-col w-full items-center justify-center space-y-2 mt-10">
          <button
              className="w-[90%] bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book New Appointment</span>
            </button>
            
            <button className="w-[90%] bg-gray-100 text-gray-700 rounded-lg px-4 py-3 font-medium hover:bg-gray-400 transition-colors">
            View Medical Records
            </button>
            
            <button className="w-[90%] bg-gray-100 text-gray-700 rounded-lg px-4 py-3 font-medium hover:bg-gray-400 transition-colors">
              Prescription Refills
            </button>
            
            <button className="w-[90%] bg-gray-100 text-gray-700 rounded-lg px-4 py-3 font-medium hover:bg-gray-400 transition-colors">
              Contact Support
            </button>
            </div>
          </div>
      </div>
    </div>
  );
}
