import React from "react";
import { Search, Filter,MapPin,Clock,Star } from "lucide-react";

export default function Doctor({ booking, setBooking, doctors, setStep }) {

    console.log(booking)
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2>Select Doctor</h2>
        <p className="text-blue-500 cursor-pointer" onClick={() => setStep(1)}>
          Change Speciality
        </p>
      </div>
      <div className="flex space-x-4 mt-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
      </div>
      <div className="flex-col space-y-2 mt-4">
        {doctors
          .filter(
            (doctor) =>
              booking?.speciality === "" ||
              booking?.speciality === doctor.specialty
          )
          .map((doctor) => {
           return <div
              key={doctor.id}
              className={`p-6 bg-white border-2 rounded-xl cursor-pointer transition-all ${
                booking?.doctor.id === doctor.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setBooking((prev)=>({...prev,
                doctor : doctor
              }))}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {doctor.specialty}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-gray-700 font-medium">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      {doctor.experience} • {doctor.availability}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {doctor.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>;
          })}
      </div>
    </div>
  );
}
