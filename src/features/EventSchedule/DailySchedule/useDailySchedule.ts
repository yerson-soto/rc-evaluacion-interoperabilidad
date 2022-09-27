import { useEffect, useState } from "react";
import { useAppSelector } from "redux/hooks";
import { ScheduleService } from "library/api/services/ScheduleService";
import { Schedule } from "library/models/Schedule";
import moment from "moment";

const datetimeFormat = "YYYY-MM-DD[T]HH:mm:ss";

export function useDailySchedule(date: string | null) {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const scheduleService = new ScheduleService();
  const userId = useAppSelector((state) => state.auth.user.uid);

  // Used to dispatch reload
  const evaluations = useAppSelector(state => state.evaluations.results);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
  
      try {
        const dateFrom = moment(date).clone().startOf("day").format(datetimeFormat);
        const dateTo = moment(date).clone().endOf("day").format(datetimeFormat);
        
        const schedule = await scheduleService.getSchedule({
          userId,
          dateFrom,
          dateTo,
        });
  
        setSchedule(schedule[0]);
      } catch {
        setSchedule(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (date) fetchSchedule();

  }, [userId, date, evaluations]);

  return { isLoading, schedule };
}
