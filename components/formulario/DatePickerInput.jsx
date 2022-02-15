import styled from 'styled-components';

export const DatePickerWrapper = styled.div`

  .SingleDatePickerInput__withBorder {
    border: none;
  }

  .DateInput {
    background-color: #1f3859;
  }

  .DateInput_input {
    font-size: 16px;
    outline: none;
    min-height: 4rem;
    margin: 0.5rem 0;
    flex: 1;
    font-weight: normal;

    background-color: #162942;
    border: ${(props) => (props.valido ? '1px solid #ffffff36' : '1px solid #E86262')};
    border-radius: 3rem;
    color: white;
    padding: 12px 15px;
    width: 100%;

    &::placeholder {
      color: white;
    }
  }
  
  .CalendarDay__default {
    background-color:rgba(113, 217, 70, 0.2);
  }
  .CalendarDay__default:hover {
    background-color: #71d946;
    border: 1px solid #e4e7e7;
    color: #fff;
  }
  .CalendarDay__blocked_out_of_range {
    background-color: #FFFFFF;
  }
  .CalendarDay__selected {
    background-color: #71d946;
    border: 1px solid #e4e7e7;
    color: #fff;
  }

  .CalendarDay__blocked_out_of_range:hover {
    background: #fff;
    border: 1px solid #e4e7e7;
    color: #cacccd;
  }

  .CalendarDay__blocked_calendar, .CalendarDay__blocked_calendar:active, .CalendarDay__blocked_calendar:hover {
    background: #fff;
    border: 1px solid #e4e7e7;
    color: #cacccd;
  }
`;
