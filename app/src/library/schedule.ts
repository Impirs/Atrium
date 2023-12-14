declare var schedule: Schedule;

interface Schedule {
    draw(option: Record<string, any>): boolean;
}

interface ScheduleData {}

interface Options {}

(function (global: any) {
    //onclick();

    global.schedule = schedule;
})(typeof window !== 'undefined' ? window : this);

export const drawSchedule = (schedule as any).draw;
