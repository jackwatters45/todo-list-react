import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';
import useEditableDiv from '../useEditableDiv';
import { propertySharedStyle } from '../Theme';
import SelectDropdown from './SelectDropdown';
import usePopupProperty from '../usePopupProperty';

const SelectContainer = styled.div`
  ${propertySharedStyle};
`;

const SelectButtonBackground = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
`;

const StyledContentEditable = styled(ContentEditable)`
  cursor: pointer;
  width: fit-content;
  background: rgb(90, 90, 90);
  padding: 0 6px;
  border-radius: 4px;
  height: 20px;
  margin: 0 0 0 6px;
`;

const SelectProp = (props) => {
  const {
    id,
    innerRef: selectButtonRef,
    html,
    ...editableDivProps
  } = useEditableDiv(props);

  const { isDropdown, ...popupProps } = usePopupProperty(
    props,
    selectButtonRef,
  );

  // hover for div parent div of content editable div
  const [hover, setHover] = useState(false);
  const handleClick = () => setHover(false);
  const toggleHoverOn = () => {
    if (!isDropdown) setHover(true);
  };
  const toggleHoverOff = () => {
    if (!isDropdown) setHover(false);
  };

  return (
    <SelectContainer>
      <SelectButtonBackground
        onMouseEnter={toggleHoverOn}
        onMouseLeave={toggleHoverOff}
        onClick={handleClick}
        style={{ backgroundColor: hover ? 'rgba(255, 255, 255, 0.055)' : '' }}
        ref={selectButtonRef}
      >
        <StyledContentEditable {...editableDivProps} html={html.name} id={id} />
      </SelectButtonBackground>
      {isDropdown ? <SelectDropdown {...popupProps} /> : ''}
    </SelectContainer>
  );
};

export default SelectProp;
