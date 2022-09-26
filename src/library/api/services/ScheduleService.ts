import { APIResponse } from "library/common/interfaces";
import { Schedule } from 'library/models/Schedule';
import { AbstractAPIService } from './AbstractApiService';
import { ScheduleMapper } from '../mappers/ScheduleMapper';
import * as dto from "library/api/dto/evaluation-dto";

export interface ScheduleRepository {
  getSchedule: (data: dto.FilterSchedule) => Promise<Schedule[]>;
}

export class ScheduleService extends AbstractAPIService implements ScheduleRepository {
  mapper: ScheduleMapper;

  constructor() {
    super();
    this.mapper = new ScheduleMapper();
  }

  getSchedule(data: dto.FilterSchedule): Promise<Schedule[]> {
    return new Promise((resolve, reject) => {
      const { userId, dateFrom, dateTo} = data;
      const url = `/evaluationsinstitutional/calendar/${userId}/${dateFrom}/${dateTo}`;

      this.client
        .get<APIResponse<dto.GetSchedule[]>>(url)
        .then((res) => {
          const results = res.data.result;
          const schedule = results.map(this.mapper.fromAPI);
          resolve(schedule);
        })
        .catch(() => reject("backend.timeline_couldnt_load"));
    })
  }
}
