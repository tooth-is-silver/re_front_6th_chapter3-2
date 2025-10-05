import { Event } from '../../types';
import { generateRepeatEvents } from '../../utils/generateRepeatEvents';

// 1단계: 기본 동작 정의
// 요구사항 1.1 - 반복하지 않는 일정 처리

// 반복 유형이 'none'인 경우, 원본 이벤트 하나만 결과로 나와야 합니다
// 입력한 이벤트가 그대로 배열에 담겨 반환되는지 확인하세요

// 요구사항 1.2 - 종료일이 없는 경우의 기본 동작

// 반복 종료일이 지정되지 않았다면, 시스템은 합리적인 최대 날짜까지만 생성해야 합니다
// 무한정 생성되는 것을 방지하기 위한 안전장치가 필요합니다
// 생성된 마지막 이벤트의 날짜가 예상한 최대 날짜와 일치하는지 확인하세요

describe('반복 유형 & 반복 종료일이 없는 경우', () => {
  it('반복이 되지않는 이벤트는 단일로 배열에 담겨 반환된다.', () => {
    const event: Event = {
      id: '1',
      title: '단일 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-06-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);

    expect(result).toEqual([event]);
  });

  it('반복 종료일이 없는 이벤트는 최대 6월 30일까지만 생성한다.', () => {
    const event: Event = {
      id: '2',
      title: '매일 반복 이벤트',
      startTime: '09:00',
      endTime: '10:00',
      date: '2024-06-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '운동',
      repeat: { type: 'daily', interval: 1 },
      notificationTime: 30,
    };
    const result = generateRepeatEvents(event);
    const last = result[result.length - 1];
    expect(Date.parse(last.date)).toBe(Date.parse('2024-06-30')); // new Date가 아닌 Date.parse 사용
  });
});
