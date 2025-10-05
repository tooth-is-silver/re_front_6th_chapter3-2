import { EventForm } from '../types';
import { formatDate } from './dateUtils';

export const generateRepeatEvents = (event: EventForm) => {
  const events: EventForm[] = [];
  const startDate = new Date(event.date);
  const repeatType = event.repeat.type;
  const interval = event.repeat.interval;
  const endDate = event.repeat.endDate ? new Date(event.repeat.endDate) : new Date('2024-06-30');

  // 원본 날짜를 알고 있어야 월간 반복시 31일이나 예외 날짜일 경우 정상적으로 처리 가능
  const originalDay = startDate.getDate();
  const originalMonth = startDate.getMonth();

  let currentDate = new Date(startDate);

  // 반복 유형이 none이거나 repeat이 0인 경우 원본 이벤트만 반환
  if (repeatType === 'none' || interval === 0) {
    return [event];
  }

  // 반복 이벤트 생성 로직
  while (currentDate <= endDate) {
    events.push({
      ...event,
      date: formatDate(currentDate),
    });

    // repeatType에 따라 날짜 증가 로직 추가
    switch (repeatType) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + interval);
        break;

      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7 * interval);
        break;

      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + interval);
        currentDate.setDate(originalDay); // 월 변경 후 원래 날짜로 설정

        // 날짜가 변경된 경우 (예: 31일에서 월 반복시 -> 30일, 29일, 28일이 될수 있음)
        if (currentDate.getDate() !== originalDay) {
          currentDate.setDate(1); // 1일로 초기화
          currentDate.setMonth(currentDate.getMonth() + 1); // 다음 달로 이동
        }
        break;

      case 'yearly':
        // 년도 먼저 변경 후 나머지 설정
        if (originalDay === 29 && originalMonth === 1) {
          // 윤년은 4년마다 돌아온다
          currentDate.setFullYear(currentDate.getFullYear() + 4);
        } else {
          // 아닌 달은 년도만 더해준다.
          currentDate.setFullYear(currentDate.getFullYear() + interval);
        }

        currentDate.setDate(originalDay);
        currentDate.setMonth(originalMonth);

        // 년마다 반복시켜서 설정된 날짜나 달이 기존 값이랑 다를때 초기화시킴
        if (currentDate.getDate() !== originalDay || currentDate.getMonth() !== originalMonth) {
          currentDate.setDate(1);
          currentDate.setMonth(0);
          currentDate.setFullYear(currentDate.getFullYear() + 1);
        }
        break;
    }
  }

  return events; // 기본 구현: 원본 이벤트만 반환
};
