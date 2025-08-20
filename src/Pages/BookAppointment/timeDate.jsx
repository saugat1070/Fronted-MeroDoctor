import React from "react";

export default function TimeDate({booking,setBooking,setStep,timeSlots}) {

    const selectedDoctor = booking?.doctors

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Select Date & Time
          </h2>
          <button
            onClick={() => setStep(2)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Change Doctor
          </button>
        </div>

        {booking?.doctors && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedDoctor.name}
                </h3>
                <p className="text-blue-600">{selectedDoctor.specialty}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Available Dates
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 14 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dateStr = date.toISOString().split("T")[0];
                const dayName = date.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const dayNumber = date.getDate();

                return (
                  <button
                    key={dateStr}
                    onClick={() => setBooking((prev)=>({
                        ...prev,
                        date_time : dateStr
                    }))}
                    className={`p-3 text-center rounded-lg border-2 transition-all ${
                      booking?.date_time === dateStr
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-xs text-gray-500">{dayName}</div>
                    <div className="text-lg font-semibold">{dayNumber}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          {booking?.date_time && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Times
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setBooking((prev)=>({
                        ...prev,
                        timeSlots : time
                    }))}
                    className={`p-3 text-center rounded-lg border-2 transition-all ${
                      booking?.timeSlots === time
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {booking?.date_time && booking?.timeSlots && (
          <div className="mt-6">
            <button
              onClick={() => setStep(4)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue to Confirmation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
