import React, { useState, useContext } from 'react';
import Todo from './Todo';
import Icon from '@mdi/react';
import { mdiPlus, mdiDeleteOutline } from '@mdi/js';
import styled from 'styled-components';
import uniqid from 'uniqid';
import { TodosContext } from './MainContent';

const ProjectContainer = styled.div`
  margin: 4px;
  width: 260px;
  background-color: var(--section-background-color);
  height: fit-content;
  border-radius: 4px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 24px;
  width: inherit;
  align-items: center;
  padding: 4px;
  margin-bottom: 2px;
`;

const ProjectTitle = styled.p`
  width: fit-content;
  border-radius: 4px;
  background-color: var(--card-background-color);
  padding: 0 6px;
`;

const TrashIcon = styled(Icon)`
  color: var(--secondary-font-color);
  padding: 1px;
  border-radius: 4px;

  &:hover {
    background-color: var(--card-hover-background-color);
  }
`;

const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NewTodoButton = styled.button`
  gap: 2px;
  margin-top: 4px;
  color: var(--secondary-font-color);
  display: flex;
  padding: 6px 2px;
`;

const Project = ({ project, removeProject }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const handleAddTodo = () =>
    setTodos([
      ...todos,
      {
        name: '',
        id: uniqid(),
        project: project,
        priority: '',
        date: new Date(),
        created: new Date(),
        notes: '',
      },
    ]);

  const [trashIconStatus, setTrashIconStatus] = useState('none');
  const handleMouseEnter = () => setTrashIconStatus('block');
  const handleMouseLeave = () => setTrashIconStatus('none');

  return (
    <ProjectContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Header>
        <ProjectTitle>{project.name}</ProjectTitle>
        <TrashIcon
          style={{ display: trashIconStatus }}
          path={mdiDeleteOutline}
          size={0.75}
        />
      </Header>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodosContainer>
          {todos.map((todo) => {
            return todo.project.id === project.id ? (
              <Todo todo={todo} key={todo.id} />
            ) : undefined;
          })}
        </TodosContainer>
      </TodosContext.Provider>
      <NewTodoButton onClick={handleAddTodo}>
        <Icon path={mdiPlus} size={0.75} />
        <p>New</p>
      </NewTodoButton>
    </ProjectContainer>
  );
};

export default Project;