import { Schedule } from 'library/models/Schedule';
import { EvaluationMapper } from 'library/api/mappers/EvaluationMapper';
import * as dto from "library/api/dto/evaluation-dto";

export class ScheduleMapper {

  fromAPI(data: dto.GetSchedule): Schedule {
    const evaluationMapper = new EvaluationMapper();
    const events = data.evaluationResponses.map(evaluationMapper.fromAPI);
    
    return {
      date: data.date,
      total: data.count,
      events,
    }
  }
}
