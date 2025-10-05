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

// 2단계: 일간 반복 구현
// 요구사항 2.1 - 매일 반복

// 시작일부터 종료일까지 하루도 빠짐없이 이벤트가 생성되어야 합니다
// 예: 1월 1일 ~ 1월 3일 매일 반복 → 1일, 2일, 3일 총 3개

// 요구사항 2.2 - N일 간격 반복

// 지정된 간격만큼 건너뛰며 생성되어야 합니다
// 예: 1월 1일부터 2일 간격으로 반복 → 1일, 3일, 5일...
// 간격이 2라면 하루 건너뛰고 생성되는 개념입니다

describe('일간 반복', () => {
  it('2024-01-01부터 3일 반복되는 일정은 2024-01-01, 2024-01-02, 2024-01-03에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '3일간 매일 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'daily', interval: 1, endDate: '2024-01-03' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.date)).toEqual(['2024-01-01', '2024-01-02', '2024-01-03']);
  });

  it('2024-01-01부터 2일 간격으로 반복되는 일정은 2024-01-01, 2024-01-03, 2024-01-05에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '2일간격으로 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'daily', interval: 2, endDate: '2024-01-05' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.date)).toEqual(['2024-01-01', '2024-01-03', '2024-01-05']);
  });
});

// 3단계: 주간 반복 구현
// 요구사항 3.1 - 매주 반복 (같은 요일)

// 시작일과 같은 요일에 이벤트가 생성되어야 합니다
// 정확히 7일 간격으로 생성되는지 확인하세요
// 예: 1월 1일(월)부터 매주 → 1일, 8일, 15일 (모두 월요일)

// 요구사항 3.2 - N주 간격 반복

// 지정된 주 수만큼 건너뛰며 생성되어야 합니다
// 예: 2주 간격이면 14일씩 더해지는 개념입니다
describe('주간 반복', () => {
  it('2024-01-01부터 일주일 간격으로 반복되는 일정은 2024-01-01, 2024-01-08, 2024-01-15에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '일주일 간격으로 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'weekly', interval: 1, endDate: '2024-01-15' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.date)).toEqual(['2024-01-01', '2024-01-08', '2024-01-15']);
  });

  it('2024-01-01부터 2주일 간격으로 반복되는 일정은 2024-01-01, 2024-01-15, 2024-01-29에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '이주일 간격으로 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'weekly', interval: 2, endDate: '2024-01-29' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.date)).toEqual(['2024-01-01', '2024-01-15', '2024-01-29']);
  }
});
// 4단계: 월간 반복 구현
// 요구사항 4.1 - 매월 같은 날짜에 반복

// 시작일의 일(day) 값이 유지되어야 합니다
// 예: 1월 15일부터 매월 → 1월 15일, 2월 15일, 3월 15일

// 요구사항 4.2 - N개월 간격 반복

// 지정된 개월 수만큼 건너뛰며 생성되어야 합니다
// 예: 2개월 간격 → 1월 15일, 3월 15일, 5월 15일

// 요구사항 4.3 - 월말 날짜의 특수 처리

// 1월 31일을 기준으로 매월 반복할 때, 2월에는 어떻게 될까요?
// 해당 월에 존재하지 않는 날짜는 건너뛰어야 합니다
// 예: 1월 31일 매월 반복 → 1월 31일, (2월 건너뜀), 3월 31일
describe('월간 반복', () => {
  it('2024-01-01부터 매월 같은 날짜에 반복되는 일정은 2024-01-01, 2024-02-01, 2024-03-01에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '한달 간격으로 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'monthly', interval: 1, endDate: '2024-03-01' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.date)).toEqual(['2024-01-01', '2024-02-01', '2024-03-01']);
  });

  it('2024-01-01부터 2달 간격으로 같은 날짜에 반복되는 일정은 2024-01-01, 2024-03-01, 2024-05-01에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '두달 간격으로 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'monthly', interval: 2, endDate: '2024-05-01' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.date)).toEqual(['2024-01-01', '2024-03-01', '2024-05-01']);
  });

  it('2024-01-31부터 매월 반복되는 일정은 2024-01-31, 2024-03-31에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '한달 간격으로 특수 날짜 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-31',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'monthly', interval: 1, endDate: '2024-03-31' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.date)).toEqual(['2024-01-31', '2024-03-31']);
  });
});

// 5단계: 연간 반복 구현
// 요구사항 5.1 - 매년 같은 날짜에 반복

// 월과 일이 모두 유지되어야 합니다
// 예: 2024년 3월 15일부터 매년 → 2024/3/15, 2025/3/15, 2026/3/15

// 요구사항 5.2 - N년 간격 반복

// 지정된 연도만큼 건너뛰며 생성되어야 합니다
// 예: 2년 간격 → 2024년, 2026년, 2028년

// 요구사항 5.3 - 윤년의 2월 29일 처리

// 2월 29일은 4년마다만 존재합니다
// 평년(2025, 2026, 2027)에는 2월 29일이 없으므로 건너뛰어야 합니다
// 다음 윤년(2028)에만 다시 생성되어야 합니다

describe('연간 반복', () => {
  it('2024-01-01부터 매년 같은 날짜에 반복되는 일정은 2024-01-01, 2025-01-01, 2026-01-01에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '매년 같은 날짜 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'yearly', interval: 1, endDate: '2026-01-01' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.date)).toEqual(['2024-01-01', '2025-01-01', '2026-01-01']);
  })

  it('2024-01-01부터 2년마다 같은 날짜에 반복되는 일정은 2024-01-01, 2026-01-01, 2028-01-01에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '2년마다 같은 날짜 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'yearly', interval: 2, endDate: '2028-01-01' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(3);
    expect(result.map((e) => e.date)).toEqual(['2024-01-01', '2026-01-01', '2028-01-01']);
  })

  it('2024-02-29부터 1년마다 같은 날짜에 반복되는 일정은 2024-02-29, 2028-02-29에 동일한 일정이 있다.', () => {
    const event: Event = {
      id: '1',
      title: '매년마다 반복 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-02-29',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'yearly', interval: 1, endDate: '2028-02-29' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.date)).toEqual(['2024-02-29', '2028-02-29']);
  })
})

// 6단계: 예외 상황 처리
// 요구사항 6.1 - 간격이 0인 경우

// 반복 간격이 0이라면 무한 루프에 빠질 수 있습니다
// 이런 경우 반복하지 않고 원본 이벤트 하나만 반환해야 합니다

describe('예외 상황 처리', () => {
  it('반복 간격이 0인 경우, 기존에 이벤트 하나만 반환된다.',() => {
    const event: Event = {
      id: '1',
      title: '반복 간격이 0인 이벤트',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-01',
      description: '테스트 이벤트',
      location: '온라인',
      category: '회의',
      repeat: { type: 'yearly', interval: 0, endDate: '2024-12-31' },
      notificationTime: 15,
    };
    const result = generateRepeatEvents(event);
    expect(result).toHaveLength(1);
    expect(result).toEqual([event]);
  })
})