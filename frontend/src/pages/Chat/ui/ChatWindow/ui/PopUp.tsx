import { format } from 'date-fns';
import { TChatList } from '@/app/store/slices/chatListSlice.ts';

export function PopUp(
  selectedDate: null | Date,
  filteredChatData: undefined | TChatList,
  availableDays: Array<Date>,
  setSelectedDate: {
    (value: null | Date | { (prevState: null | Date): null | Date }): void;
  },
  formatDate: (date: Date) => string,
  selectedSlot: null | string,
  timeSlots: Array<string>,
  setSelectedSlot: {
    (
      value: null | string | { (prevState: null | string): null | string }
    ): void;
  },
  selectedCommunication: null | string,
  communicationMethods: Array<string>,
  setSelectedCommunication: {
    (
      value: null | string | { (prevState: null | string): null | string }
    ): void;
  },
  sendSlotRequest: (slotNumber: number, communication: string) => Promise<void>
) {
  return (
    <div className="flex flex-col max-w-xs p-2 m-1 rounded-lg shadow-md bg-gray-100">
      {!selectedDate && !filteredChatData?.vacancySlot ? (
        availableDays.map((date, index) => (
          <div
            key={index}
            className="flex flex-col max-w-xs p-2 m-1 rounded-lg shadow-md bg-gray-100"
          >
            <button onClick={() => setSelectedDate(date)}>
              {formatDate(date)}
            </button>
          </div>
        ))
      ) : !selectedSlot && !filteredChatData?.vacancySlot ? (
        <div className="flex flex-col max-w-xs">
          <button onClick={() => setSelectedDate(null)}>Назад</button>
          {timeSlots.map((slot, index) => (
            <button
              className="flex flex-col max-w-xs p-2 m-1 rounded-lg shadow-md bg-gray-100"
              key={index}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      ) : !selectedCommunication && !filteredChatData?.vacancySlot ? (
        <div className="flex flex-col max-w-xs p-2 m-1 ">
          <button onClick={() => setSelectedSlot(null)}>Назад</button>
          {communicationMethods.map((method, index) => (
            <button
              key={index}
              className="flex flex-col max-w-xs p-2 m-1 rounded-lg shadow-md bg-gray-100"
              onClick={() => {
                setSelectedCommunication(method);
                sendSlotRequest(
                  timeSlots.indexOf(selectedSlot!) + 1,
                  method.toLowerCase()
                );
              }}
            >
              {method}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p>
            Встреча успешно забронирована на{' '}
            {filteredChatData &&
              filteredChatData.vacancySlot &&
              filteredChatData.vacancySlot.date &&
              format(filteredChatData?.vacancySlot?.date, 'dd.MM.yyyy HH:mm')}
            {}
          </p>
        </div>
      )}
    </div>
  );
}
