import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import PropertyLabel from '../Properties/Labels/PropertyLabel';
import Icon from '@mdi/react';
import {
  mdiCheckboxOutline as checkboxIcon,
  mdiCheckboxBlankOutline as emptyCheckboxIcon,
} from '@mdi/js';
import NotesProperty from '../Properties/NotesProperty';
import propertyData from '../utils/helpers/propertyHelpers';
import NameProperty from '../Properties/NameProperty';

import { hoverStyle } from '../utils/theme';
import { DatabaseContext } from '../../context/context';
import { doc, deleteDoc } from 'firebase/firestore';
import AddNewPropertySidebar from './AddNewPropertySidebar';

const PropertiesContainer = styled.div`
  padding: 32px 48px 0 48px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const PropertyRow = styled.div`
  margin: 4px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 140px 1fr;
`;

const TodoName = styled(NameProperty)`
  font-size: 30px;
  font-weight: 700;
  grid-column: 1 / -1;
`;

const StyledPropertyLabel = styled(PropertyLabel)`
  ${hoverStyle};
`;

const StyledPropertyValue = styled.div`
  ${hoverStyle};
  & > div:focus {
    background: rgb(37, 37, 37);
    box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
      rgb(15 15 15 / 20%) 0px 3px 6px, rgb(15 15 15 / 40%) 0px 9px 24px;
  }
`;

const DoneButton = styled(Icon)`
  cursor: pointer;
  align-self: start;
  margin: 6px 8px 7px;
  color: var(--main-font-color);
`;

const StyledNotes = styled(NotesProperty)`
  height: 100%;
  width: 100%;
  grid-column: 1 / -1;
  margin: 10px 0;
`;

const StyledAddPropButton = styled(AddNewPropertySidebar)`
  margin: 0 0 10px 5px;
`;

// TODO make sure all small components work
const SidebarContents = ({
  dbItemId,
  dbItems,
  setDbItems,
  properties,
  addProperty,
  removeDbItem,
  handleClickClose,
}) => {
  const { userDbRef } = useContext(DatabaseContext);

  const selectedDbItem = useMemo(() => {
    return dbItems.find((item) => item.id === dbItemId);
  }, [dbItemId, dbItems]);

  const handleDeleteTodoAndCloseSidebar = async () => {
    handleClickClose();

    try {
      removeDbItem(dbItemId);
      await deleteDoc(doc(userDbRef, 'dbItems', dbItemId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PropertiesContainer id="properties">
      <TodoName name={'name'} data={selectedDbItem} autoFocus />
      {properties.map(({ name, type }) => {
        const { icon, getComponent } = propertyData[type];
        return (
          <PropertyRow key={name}>
            <StyledPropertyLabel
              icon={icon}
              data={selectedDbItem}
              name={name}
            />
            <StyledPropertyValue>
              {getComponent(name, selectedDbItem)}
            </StyledPropertyValue>
          </PropertyRow>
        );
      })}
      <PropertyRow>
        <PropertyLabel icon={checkboxIcon} name={'Done?'} disabled={true} />
        <DoneButton
          path={emptyCheckboxIcon}
          size={0.85}
          onClick={handleDeleteTodoAndCloseSidebar}
        />
      </PropertyRow>
      <StyledAddPropButton
        properties={properties}
        addProperty={addProperty}
        setDbItems={setDbItems}
      />
      <hr />
      <StyledNotes
        name={'notes'}
        data={selectedDbItem}
        placeholder={'Add notes here...'}
      />
    </PropertiesContainer>
  );
};

export default SidebarContents;
