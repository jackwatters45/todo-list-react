import React from 'react';
import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';
import useEditableDiv from '../utils/useEditableDiv';
import { propertySharedStyle } from '../utils/Theme';
import DatePicker from './DatePicker';
import usePopupProperty from '../utils/usePopupProperty';

const DatePickerContainer = styled.div`
  ${propertySharedStyle};
  height: fit-content;
  `;
  
  const StyledContentEditable = styled(ContentEditable)`
  padding: 6px 8px 7px;
  cursor: pointer;
  width: 100%;
`;

const DateProperty = (props) => {
  // props = {...props, disabled: true}
  const {
    innerRef: dateButtonRef,
    onClick: _,
    html,
    style,
    ...editableDivProps
  } = useEditableDiv(props);

  const { isDropdown, ...popupProps } = usePopupProperty(props, dateButtonRef);

  console.log(html)
  return (
    <DatePickerContainer>
      <StyledContentEditable
        {...editableDivProps}
        html={html ? html.toDateString() : 'Empty'}
        style={{ ...style, color: html ? '' : 'var(--empty-font-color)' }}
        // disabled={true}
        hoverable={'true'}
        innerRef={dateButtonRef}
      />
      {isDropdown ? <DatePicker {...popupProps} /> : ''}
    </DatePickerContainer>
  );
};

export default DateProperty;
