import React, { forwardRef } from 'react'
import { DatePicker } from 'antd';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD HH:mm';

const range = (start: number, end: number) => {
  const result: number[] = [];
  for (let i: number = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate: RangePickerProps['disabledDate'] = current => {
  // Can not select days before today and today
  return current && current < moment().startOf('day');
};

const disabledDateTime = (current: moment.Moment) => {
  if (!current?.isSame(moment(), "day")) return;

  return {
    disabledHours: () => range(0, moment().hour()),
    disabledMinutes: () => range(0, moment().minute()),
  }
};

export default forwardRef<any, DatePickerProps>((props, ref) => {
  const customProps = {
    disabledTime: disabledDateTime as any,
    showTime: { defaultValue: moment('00:00:00', 'hh:mm a') }
  }

  return (
    <DatePicker
      ref={ref}
      format={dateFormat}
      disabledDate={disabledDate}
      {...props}
      {...customProps}
    />
  );
});