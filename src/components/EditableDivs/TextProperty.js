import React, { useContext } from 'react';
import ContentEditable from 'react-contenteditable';
import { SidebarContext, TodosContext } from '../MainContent';
import styled from 'styled-components';
import useEditableDiv from './useEditableDiv';

const StyledContentEditable = styled(ContentEditable)`
  width: 100%;
  word-break: break-word;
  display: inline-block;
  color: var(--main-font-color);
  border-radius: 4px;
  align-self: start;
  justify-self: start;
  outline: none;
  user-select: none;
  transition: background 20ms ease-in 0s;
`;

// Property name is unique so kinda like a key (active prop db)
const TextProperty = (props) => {
  const { todo, property } = props;
  const { setTodos, todos } = useContext(TodosContext);
  const { handleRemoveTodoAndSidebar } = useContext(SidebarContext);
  const editableDivProps = useEditableDiv(props);

  const handleChangePlainText = (e) => {
    const todosCopy = [...todos];
    const todoCopy = todosCopy.find(({ id }) => id === todo.id);
    todoCopy[e.currentTarget.id] = e.currentTarget.innerText;
    setTodos(todosCopy);
  };

  const handleBlurNameInput = () => {
    if (!todo.name) handleRemoveTodoAndSidebar(todo.id);
  };

  return (
    <StyledContentEditable
      onChange={handleChangePlainText}
      onBlur={property === 'name' ? handleBlurNameInput : null}
      {...editableDivProps}
    />
  );
};

export default TextProperty;