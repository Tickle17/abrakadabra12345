import { useState } from 'react';
import {
  addWeeks,
  format,
  startOfWeek,
  subWeeks,
  parseISO,
  eachDayOfInterval,
  endOfWeek,
} from 'date-fns';
import clsx from 'clsx';
import { ScrollArea, ScrollBar } from '@/shared/ui';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const CalendarPreferences = {
  duration: 0.75, // длительность одного собеседования в часах
  freeTime: 0.37, // время отдыха между собеседованиями
  dayStart: 10, // начало рабочего дня
  dayEnd: 18.25, // конец рабочего дня
  slots: (18 - 10) / (1.5 + 0.5), // кол-во слотов в день
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
      isWorking: true,
    },
    {
      day: 'SUNDAY',
      isWorking: false,
    },
  ],
};

// const getIsoTimeString = (hour: number) => {
//   const gapDate = new Date();
//   gapDate.setHours(hour);
//   const gapDateString = gapDate.toISOString();
//   return gapDateString;
// };

const SLOTS = [
  {
    date: new Date(2024, 5, 10, 10, 0, 0),
    slot: 2,
    dayOfWeek: 'Monday',
  },
  {
    date: new Date(2024, 5, 10, 10, 0, 0),
    slot: 3,
    dayOfWeek: 'Monday',
  },
  {
    date: new Date(2024, 5, 10, 10, 0, 0),
    slot: 5,
    dayOfWeek: 'Monday',
  },
  {
    date: new Date(2024, 5, 11, 10, 0, 0),
    slot: 1,
    dayOfWeek: 'Monday',
  },
  {
    date: new Date(2024, 5, 11, 10, 0, 0),
    slot: 4,
    dayOfWeek: 'Monday',
  },
  {
    date: new Date(2024, 5, 17, 10, 0, 0),
    slot: 1,
    dayOfWeek: 'Monday',
  },
  {
    date: new Date(2024, 5, 18, 10, 0, 0),
    slot: 3,
    dayOfWeek: 'Monday',
  },
];

// function getToday() {
//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, '0');
//   const month = String(today.getMonth() + 1).padStart(2, '0'); // Январь это 0

//   return `${month}/${day}`;
// }

// const CalendarSlot = {
//   slot: 3,
//   free: false,
//   communication: 'zoom',
//   acceptingByUser: false,
//   date: getToday(),
//   dayOfWeek: 'MONDAY',
// };

// export const CalendarPageRewrited = () => {
//   const [currentWeek, setCurrentWeek] = useState(
//     startOfWeek(new Date(), { weekStartsOn: 0 })
//   );

//   const daysOfWeek = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];

//   const generateWeekDays = (startDate: Date) => {
//     return daysOfWeek.map((day, index) => {
//       const date = addDays(startDate, index);
//       return {
//         day,
//         date: format(date, 'MM/dd'),
//       };
//     });
//   };

//   const weekDays = generateWeekDays(currentWeek);

//   const handlePrevWeek = () => {
//     setCurrentWeek(subWeeks(currentWeek, 1));
//   };

//   const handleNextWeek = () => {
//     setCurrentWeek(addWeeks(currentWeek, 1));
//   };

//   const hours = [];
//   for (
//     let i = CalendarPreferences.dayStart;
//     i <= CalendarPreferences.dayEnd;
//     i++
//   ) {
//     hours.push(i);
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={handlePrevWeek}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Previous Week
//         </button>
//         <div className="text-xl font-bold">
//           Week of {format(currentWeek, 'MM/dd/yyyy')}
//         </div>
//         <button
//           onClick={handleNextWeek}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Next Week
//         </button>
//       </div>
//       <div className="grid grid-cols-8 gap-0">
//         <div className="border-b border-gray-300"></div>
//         {weekDays.map((weekDay, index) => (
//           <div
//             key={index}
//             className="text-center font-bold border-b border-gray-300"
//           >
//             {weekDay.day} <br /> {weekDay.date}
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-8 gap-0">
//         {hours.map((hour, hourIndex) => (
//           <React.Fragment key={hourIndex}>
//             <div className="border-r border-gray-300 text-right pr-2 font-bold h-[50px] flex items-center justify-end">
//               {hour}:00
//             </div>
//             {weekDays.map((day, dayIndex) => {
//               const isTargetSlot =
//                 day.date === CalendarSlot.date &&
//                 CalendarSlot.slot - 1 === hourIndex;

//               return (
//                 <div
//                   key={dayIndex}
//                   className="border border-gray-300 h-[50px] relative"
//                 >
//                   {isTargetSlot && (
//                     <div
//                       className="absolute left-0 right-0 bg-green-500"
//                       style={{
//                         height: `${CalendarPreferences.duration * 50}px`,
//                         bottom: `${CalendarPreferences.freeTime * 50}px`,
//                       }}
//                     ></div>
//                   )}
//                 </div>
//               );
//             })}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

const generateNumberRange = (start: number, end: number) => {
  if (start >= end) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const checkIfWorkingDay = (day: string) => {
  return CalendarPreferences.dayOfWeek.some(
    dayObj =>
      dayObj.day.toLocaleLowerCase() === day.toLocaleLowerCase() &&
      dayObj.isWorking
  );
};

const getSlotHeight = () => {
  const slotTimeInHours = CalendarPreferences.duration;
  return slotTimeInHours * 100;
};

const getGapHeight = () => {
  const freeTimeInHours = CalendarPreferences.freeTime;
  return freeTimeInHours * 100;
};

const getSlots = () => {
  return Math.floor(
    (CalendarPreferences.dayEnd - CalendarPreferences.dayStart) /
      (CalendarPreferences.duration + CalendarPreferences.freeTime)
  );
};

export type TSlot = {
  height: number;
  duration: number;
  timeStart: number;
  timeEnd: number;
  date: string;
};

const getSlotsRange = () => {
  const range = generateNumberRange(0, getSlots());
  const result: TSlot[] = [];
  range.forEach(index => {
    const slotTimeStart =
      CalendarPreferences.dayStart +
      index * (CalendarPreferences.duration + CalendarPreferences.freeTime);
    const slotDate = new Date();
    slotDate.setHours(slotTimeStart);
    slotDate.setMinutes(0);
    slotDate.setSeconds(0);
    const dateString = slotDate.toISOString();
    const SlotTimeEnd = slotTimeStart + CalendarPreferences.duration;
    const Slot: TSlot = {
      height: getSlotHeight(),
      duration: CalendarPreferences.duration,
      timeStart: slotTimeStart,
      timeEnd: SlotTimeEnd,
      date: dateString,
    };

    result.push(Slot);

    if (
      index === range.length - 1 &&
      SlotTimeEnd + CalendarPreferences.freeTime > CalendarPreferences.dayEnd
    )
      return;
    const gapTimeStart = Slot.timeEnd;
    const gapDate = new Date();
    gapDate.setHours(gapTimeStart);
    const gapDateString = gapDate.toISOString();
    const Gap: TSlot = {
      height: getGapHeight(),
      duration: CalendarPreferences.freeTime,
      timeStart: gapTimeStart,
      timeEnd: Slot.timeEnd + CalendarPreferences.freeTime,
      date: gapDateString,
    };

    result.push(Gap);
  });
  return result;
};

// const getDatesRange = (startDate: Date, endDate: Date): Date[] => {
//   const dates: Date[] = [];
//   const currentDate = new Date(startDate); // Create a new Date instance
//   while (currentDate <= endDate) {
//     dates.push(new Date(currentDate));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   return dates;
// };

// eslint-disable-next-line react-refresh/only-export-components
export const convertToHumanReadableTime = (time: number) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
  return `${hours}:${minutesString}`;
};

const getThisWeeksMonday = (today: Date) => {
  const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
  // const formattedDate = format(startOfWeekDate, 'dd-MM-yyyy');
  // return new Date(formattedDate);
  return new Date(startOfWeekDate);
};

const getThisWeeksSunday = (today: Date) => {
  const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });
  // const formattedDate = format(endOfWeekDate, 'dd-MM-yyyy');
  // return new Date(formattedDate);
  return new Date(endOfWeekDate);
};

// export const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
//   const dates: Date[] = [];
//   const currentDate = new Date(startDate); // Create a new Date instance
//   while (currentDate <= endDate) {
//     dates.push(new Date(currentDate));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   return dates;
// };

const getDatesRange = (startDate: Date, endDate: Date) => {
  const start = parseISO(startDate.toISOString());
  const end = parseISO(endDate.toISOString());
  return eachDayOfInterval({ end, start });
};

const areSameDayMonthYear = (date1: Date, date2: Date) => {
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getUTCFullYear();

  return day1 === day2 && month1 === month2 && year1 === year2;
};

localStorage.setItem('slot', '1');

function getMonthName(monthNumber: number) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[monthNumber];
}

export const CalendarPage = () => {
  const slotsRange = getSlotsRange();
  const [startDate, setStartDate] = useState<Date>(
    getThisWeeksMonday(new Date())
  );
  const [endDate, setEndDate] = useState<Date>(getThisWeeksSunday(new Date()));
  // const [currentSlot, setCurrentSlot] = useState<number>(1);
  const datesRange = getDatesRange(startDate, endDate);

  const moveWeekForward = () => {
    setStartDate(addWeeks(startDate, 1));
    setEndDate(addWeeks(endDate, 1));
  };
  const moveWeekBack = () => {
    setStartDate(subWeeks(startDate, 1));
    setEndDate(subWeeks(endDate, 1));
  };
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  // const workingDaysCount = CalendarPreferences.dayOfWeek
  //   .map(day => {
  //     return day.isWorking ? 1 : 0;
  //   })
  //   .reduce((a: number, b) => a + b, 0);

  const hoursObj = {
    totalWirkingHours:
      CalendarPreferences.dayEnd - CalendarPreferences.dayStart,
    range: generateNumberRange(
      Math.floor(CalendarPreferences.dayStart),
      Math.floor(CalendarPreferences.dayEnd)
    ),
    start: CalendarPreferences.dayStart,
    end: CalendarPreferences.dayEnd,
  };
  return (
    <ScrollArea>
      {/* <div className="w-full flex justify-center items-center gap-3 mb-5">
        <Button
          className="w-[100px] bg-zinc-950 text-slate-50 rounded-[2px] flex justify-between items-center"
          onClick={() => moveWeekBack()}
        >
          <ChevronLeftIcon className="w-5 h-5" /> Back
        </Button>
        <Button className="w-[100px]" onClick={() => moveWeekForward()}>
          Forward <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div> */}
      <div className="min-w-fit w-full h-fit min-h-full grid grid-rows-[75px_1fr] grid-cols-[75px_1fr] border border-slate-300 rounded-[2px]">
        <div className="w-full h-full col-start-1 col-span-1 row-span-1 bg-slate-200 flex justify-center items-center text-md font-medium">
          {getMonthName(startDate.getMonth())}
        </div>
        <div
          className="w-full h-full col-start-2 col-span-1 row-span-1 grid"
          style={{ gridTemplateColumns: `repeat(7, 1fr)` }}
        >
          {daysOfWeek.map((day, index, daysOfWeek) => {
            // const isWorkingDay =
            //   CalendarPreferences.dayOfWeek.filter(
            //     dayObj =>
            //       dayObj.day.toLocaleLowerCase() === day.toLocaleLowerCase() &&
            //       dayObj.isWorking
            //   ).length > 0;
            // if (!isWorkingDay) return null;
            return (
              <div
                key={index}
                className={clsx(
                  'flex gap-1 justify-center items-center min-w-[100px] w-full h-full text-slate-950 text-xs relative bg-slate-200',
                  index === 0 && '',
                  index === daysOfWeek.length - 1 && '',
                  index !== 0 && index !== daysOfWeek.length - 1 && '',
                  areSameDayMonthYear(new Date(), datesRange[index]) && ''
                )}
              >
                {index === 0 && (
                  <button onClick={() => moveWeekBack()}>
                    <ChevronLeftIcon className="w-5 h-5 absolute top-[27.5px] left-1" />
                  </button>
                )}
                {index === daysOfWeek.length - 1 && (
                  <button onClick={() => moveWeekForward()}>
                    <ChevronRightIcon className="w-5 h-5 absolute top-[27.5px] right-1" />
                  </button>
                )}
                {areSameDayMonthYear(new Date(), datesRange[index]) && (
                  <p className="absolute top-[50px] w-[50%] h-[1px] border border-slate-950 font-thin text-xs"></p>
                )}
                <p
                  className={clsx(
                    'text-md font-medium',
                    areSameDayMonthYear(new Date(), datesRange[index])
                      ? 'text-slate-950'
                      : 'text-slate-950'
                  )}
                >
                  {format(datesRange[index], 'dd')}
                </p>
                <p
                  className={clsx(
                    'text-xs',
                    areSameDayMonthYear(new Date(), datesRange[index])
                      ? 'text-slate-950 font-medium'
                      : 'text-slate-950 font-light'
                  )}
                >
                  {day}
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-full h-full col-span-1 row-span-2 flex flex-col">
          {hoursObj.range.map((hour, index, range) => {
            return (
              <div
                key={index}
                className={clsx(
                  'bg-slate-200 flex justify-center items-center w-full text-slate-950 text-xs font-medium',
                  index === range.length - 1 && ''
                )}
                style={{
                  height:
                    index === 0
                      ? 100 *
                        (1 - (hoursObj.start - Math.floor(hoursObj.start)))
                      : index === hoursObj.range.length - 1
                        ? `${100 * (1 + (hoursObj.end - Math.floor(hoursObj.end)))}px`
                        : '100px',
                }}
              >
                {/* {index === 0 &&
                  `${Math.round(hoursObj.start)}:${(Math.round(hoursObj.start) - hoursObj.start) * 60}`} */}
                {/* {index === hoursObj.range.length - 1 &&
                  `${Math.round(hoursObj.end)}:${Math.abs((Math.round(hoursObj.end) - hoursObj.end) * 60)}`} */}
                {/* {index !== 0 &&
                  index !== hoursObj.range.length - 1 &&
                  `${Math.round(hour)}:00`} */}
                {index === 0 && convertToHumanReadableTime(hoursObj.start)}
                {index !== 0 &&
                  index !== hoursObj.range.length - 1 &&
                  convertToHumanReadableTime(hour)}
                {index === hoursObj.range.length - 1 &&
                  convertToHumanReadableTime(hoursObj.end)}
              </div>
            );
          })}
        </div>
        <div
          className="w-full h-full col-span-1 row-span-2 grid"
          style={{
            gridTemplateColumns: `repeat(7, 1fr)`,
            gridTemplateRows: `repeat(${hoursObj.totalWirkingHours}, 1fr)`,
          }}
        >
          {/* {hoursObj.range.map((hour, hourIndex) => (
            <React.Fragment key={hourIndex}>
              {daysOfWeek.map((day, dayIndex) => {
                return (
                  <div
                    key={dayIndex}
                    className="bg-slate-200 text-slate-950 flex justify-center items-center w-full h-[100px]"
                  >
                    {day} {hour}:00
                  </div>
                );
              })}
            </React.Fragment>
          ))} */}
          {daysOfWeek.map((day, dayIndex, daysOfWeek) => {
            return (
              <div
                key={dayIndex}
                className={clsx(
                  'w-full h-full col-span-1 row-span-full flex flex-col min-w-[100px] bg-slate-100 relative',
                  checkIfWorkingDay(day) && ''
                )}
                // style={{
                //   gridTemplateRows: `repeat(${CalendarPreferences.slots}, 100px)`,
                // }}
              >
                {true && (
                  <div className="w-full h-full flex flex-col absolute">
                    {hoursObj.range.map((_, hourIndex) => {
                      return (
                        <div
                          key={hourIndex}
                          className={clsx(
                            'w-full h-[100px] border-r border-b border-slate-300',
                            dayIndex === daysOfWeek.length - 1 && 'border-r-0'
                          )}
                        />
                      );
                    })}
                  </div>
                )}

                {checkIfWorkingDay(day) &&
                  // generateNumberRange(1, CalendarPreferences.slots).map(
                  //   (slot, slotIndex) => {
                  //     return (
                  //       <div
                  //         key={slotIndex}
                  //         className="border border-slate-950 w-full h-[100px]"
                  //       >
                  //         {slot}
                  //       </div>
                  //     );
                  //   }
                  // )}
                  slotsRange.map((slotObj, slotIndex, slotsRange) => {
                    const isSelected = SLOTS.some(obj => {
                      const isSlot = slotIndex % 2 === 0;
                      const dateMatch = areSameDayMonthYear(
                        obj.date,
                        datesRange[dayIndex]
                      );
                      const prevSlot = Number(localStorage.getItem('slot'));
                      const slotMatch = prevSlot === obj.slot;

                      dateMatch && console.log(prevSlot, obj.slot);
                      return isSlot && slotMatch && dateMatch;
                    });
                    const result = (
                      <div
                        key={slotIndex}
                        className={clsx(
                          'w-full flex justify-center items-center h-full min-w-[100px] z-10 p-[5px]'
                          // slotIndex % 2 === 0 &&
                          // SLOTS.some(obj => {
                          //   // areSameDayMonthYear(
                          //   //   obj.date,
                          //   //   datesRange[dayIndex]
                          //   // ) && console.log(obj.slot);
                          //   const isSlot = slotIndex % 2 === 0;
                          //   const dateMatch = areSameDayMonthYear(
                          //     obj.date,
                          //     datesRange[dayIndex]
                          //   );
                          //   const prevSlot = Number(
                          //     localStorage.getItem('slot')
                          //   );
                          //   const slotMatch = prevSlot === obj.slot;

                          //   dateMatch && console.log(prevSlot, obj.slot);
                          //   // console.log(
                          //   //   prevSlot,
                          //   //   obj.slot,
                          //   //   slotMatch,
                          //   //   dateMatch
                          //   // );
                          //   return isSlot && slotMatch && dateMatch;
                          //   // setCurrentSlot(prev => prev + 1);
                          // })
                          // ? 'bg-slate-950 text-white'
                          // : 'bg-slate-300 text-slate-950'
                        )}
                        style={{ height: slotObj.height }}
                      >
                        {slotIndex % 2 === 0 ? (
                          <div
                            className={clsx(
                              'text-xs font-thin flex flex-col justify-center items-center w-full h-full rounded-[2px] shadow-sm shadow-slate-100',
                              isSelected
                                ? 'bg-slate-950 text-white'
                                : 'bg-slate-200 text-slate-950'
                            )}
                          >
                            Slot Place
                            <span className="text-xs font-thin">
                              {convertToHumanReadableTime(slotObj.timeStart)} -{' '}
                              {convertToHumanReadableTime(slotObj.timeEnd)}
                            </span>
                          </div>
                        ) : (
                          <div className="w-full h-full"></div>
                          // <div className="text-slate-950 text-xs font-thin flex flex-col justify-center items-center w-full h-full bg-slate-200">
                          //   {/* Gap
                          //   <span className="text-slate-950 text-xs font-thin">
                          //     {convertToHumanReadableTime(slotObj.timeStart)} -{' '}
                          //     {convertToHumanReadableTime(slotObj.timeEnd)}
                          //   </span> */}
                          // </div>
                        )}
                      </div>
                    );
                    const prevSlot = Number(localStorage.getItem('slot'));
                    slotIndex % 2 === 0 &&
                      localStorage.setItem('slot', String(prevSlot + 1));
                    if (slotIndex === slotsRange.length - 1) {
                      localStorage.setItem('slot', '1');
                    }
                    return result;
                  })}
                {!checkIfWorkingDay(day) && (
                  <div className="w-full h-full bg-slate-100"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
