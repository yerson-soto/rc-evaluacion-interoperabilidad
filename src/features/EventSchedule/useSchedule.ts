import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { ScheduleService } from "library/api/services/ScheduleService";
import { actions } from "redux/slices/scheduleSlice";

export function useSchedule(dateRange: [string, string]) {
  const { results, isLoading } = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.uid);
  const scheduleService = new ScheduleService();

  // Used to dispatch reload
  const evaluations = useAppSelector(state => state.evaluations.results);

  useEffect(() => {
    function fetchSchedule() {
      dispatch(actions.startLoadingSchedule());

      scheduleService
        .getSchedule({
          userId,
          dateFrom: dateRange[0],
          dateTo: dateRange[1],
        })
        .then((schedule) => {
          dispatch(actions.loadScheduleSuccess(schedule));
        })
        .catch((errorMessage) => {
          dispatch(actions.loadScheduleFailed(errorMessage));
        });
    }

    fetchSchedule();
  }, [userId, dateRange, evaluations]);

  return { isLoading, schedule: results };
}
