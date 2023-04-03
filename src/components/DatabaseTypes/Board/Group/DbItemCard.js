import React from 'react';
import styled from 'styled-components';
import CardDone from '../../../utils/components/CardDone';
import NameProperty from '../../../Properties/NameProperty';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';

const TodoContainer = styled.div`
  padding: 10px 10px 6px;
  background-color: var(--card-background-color);
  height: fit-content;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
  &:hover {
    background-color: var(--card-hover-background-color);
  }
`;

const StyledNameProp = styled(NameProperty)`
  background-color: inherit;
  padding: 0 0 6px 0;
`;

const DbItemCard = ({ dbItem, setDbItems }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'dbItem',
    item: { todoId: dbItem.id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <Link to={`${dbItem.id}`}>
      <TodoContainer
        ref={drag}
        className={dbItem.id}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <StyledNameProp
          selectedProperty={{ name: 'name' }}
          data={dbItem}
          setDbItems={setDbItems}
          className={dbItem.id}
          placeholder="Type a name..."
        />
        <CardDone dbItem={dbItem} />
      </TodoContainer>
    </Link>
  );
};

export default DbItemCard;
