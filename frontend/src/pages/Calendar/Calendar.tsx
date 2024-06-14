import React, { useState } from 'react';
import { addDays, addWeeks, format, startOfWeek, subWeeks } from 'date-fns';

const CalendarPreferences = {
  duration: 1, // длительность одного собеседования в часах
  freeTime: 0.25, // время отдыха между собеседованиями
  dayStart: 8, // начало рабочего дня
  dayEnd: 17, // конец рабочего дня
  slots: 17 - 8, // кол-во слотов в день
  dayOfWeek: [
    {
      day: 'MONDAY',
      isWorking: true,
    },
    {
      day: 'TUESDAY',
      isWorking: true,
    },
    {
      day: 'WEDNESDAY',
      isWorking: true,
    },
    {
      day: 'THURSDAY',
      isWorking: true,
    },
    {
      day: 'FRIDAY',
      isWorking: true,
    },
    {
      day: 'SATURDAY',
      isWorking: false,
    },
    {
      day: 'SUNDAY',
      isWorking: false,
    },
  ],
};

function getToday() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Январь это 0

  return `${month}/${day}`;
}

const CalendarSlot = {
  slot: 3,
  free: false,
  communication: 'zoom',
  acceptingByUser: false,
  date: getToday(),
  dayOfWeek: 'MONDAY',
};

const CalendarWidget = () => {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const generateWeekDays = (startDate: Date) => {
    return daysOfWeek.map((day, index) => {
      const date = addDays(startDate, index);
      return {
        day,
        date: format(date, 'MM/dd'),
      };
    });
  };

  const weekDays = generateWeekDays(currentWeek);

  const handlePrevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const hours = [];
  for (
    let i = CalendarPreferences.dayStart;
    i <= CalendarPreferences.dayEnd;
    i++
  ) {
    hours.push(i);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevWeek}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous Week
        </button>
        <div className="text-xl font-bold">
          Week of {format(currentWeek, 'MM/dd/yyyy')}
        </div>
        <button
          onClick={handleNextWeek}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next Week
        </button>
      </div>
      <div className="grid grid-cols-8 gap-0">
        <div className="border-b border-gray-300"></div>
        {weekDays.map((weekDay, index) => (
          <div
            key={index}
            className="text-center font-bold border-b border-gray-300"
          >
            {weekDay.day} <br /> {weekDay.date}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-8 gap-0">
        {hours.map((hour, hourIndex) => (
          <React.Fragment key={hourIndex}>
            <div className="border-r border-gray-300 text-right pr-2 font-bold h-[50px] flex items-center justify-end">
              {hour}:00
            </div>
            {weekDays.map((day, dayIndex) => {
              const isTargetSlot =
                day.date === CalendarSlot.date &&
                CalendarSlot.slot - 1 === hourIndex;

              return (
                <div
                  key={dayIndex}
                  className="border border-gray-300 h-[50px] relative"
                >
                  {isTargetSlot && (
                    <div
                      className="absolute left-0 right-0 bg-green-500"
                      style={{
                        height: `${CalendarPreferences.duration * 50}px`,
                        bottom: `${CalendarPreferences.freeTime * 50}px`,
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;

export const CalendarPage = () => {
  return <CalendarWidget />;
};
