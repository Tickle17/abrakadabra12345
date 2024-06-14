import React, { useState } from 'react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';

const CalendarPreferences = {
  duration: 1.5, // длительность одного собеседования в часах
  freeTime: 15, // время отдыха между собеседованиями
  dayStart: 8, // начало рабочего дня
  dayEnd: 17, // конец рабочего дня
  slots: 5, // кол-во слотов в день
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
function createRange(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
const CalendarWidget = () => {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );

  //   const hours_ = Array.from({ length: 10 }, (_, i) => 8 + i);

  //   const hours = createRange(
  //     CalendarPreferences.dayStart,
  //     CalendarPreferences.dayEnd
  //   );

  function calculateAndGenerateArray(x: number, y: number, z: number) {
    // Вычитаем x из y
    const difference = y - x;

    // Делим разницу на z
    const step = difference / z;

    // Генерируем массив от x до y с шагом step
    const array = [];
    let currentValue = x;
    while (currentValue <= y) {
      array.push(currentValue);
      currentValue += step;
    }

    // Добавляем y в массив, если он не был добавлен из-за округления
    if (array[array.length - 1] !== y) {
      array.push(y);
    }

    return array;
  }

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

  //   const hours = calculateAndGenerateArray(
  //     CalendarPreferences.dayStart,
  //     CalendarPreferences.dayEnd,
  //     CalendarPreferences.slots
  //   );

  const hours = createRange(
    CalendarPreferences.dayStart,
    CalendarPreferences.dayEnd
  );

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
      <div className="grid grid-cols-8 gap-2">
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
      <div className="grid grid-cols-8 gap-2">
        {hours.map((hour, hourIndex) => (
          <React.Fragment key={hourIndex}>
            <div className="border-r border-gray-300 text-right pr-2 font-bold h-[50px]">
              {hour}:00
            </div>
            {weekDays.map((_, dayIndex) => (
              <div
                key={dayIndex}
                className="border border-gray-300 h-16 h-[calc(50px * )]"
              ></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const CalendarPage = () => {
  return <CalendarWidget />;
};
