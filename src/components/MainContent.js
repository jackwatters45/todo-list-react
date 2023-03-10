import React, { createContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AddProject from './Project/AddProject';
import Project from './Project/Project';
import { defaultProperties } from './Properties/utils/propertyHelpers';
import Sidebar from './Sidebar/Sidebar';
import useArrayOfObjects from './utils/useArrayOfObjects';

const MainContentContainer = styled.div`
  display: flex;
  height: fit-content;
  margin: 0 0 0 50px;
  overflow: auto;
`;

const ProjectContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const ProjectsContext = createContext({});
export const TodosContext = createContext({});
export const SidebarContext = createContext({});

const testProjects = [
  {
    id: 'le6tmu59',
    name: 'Project 1',
  },
  {
    id: 'le6tmu60',
    name: 'Project 2',
  },
];

const MainContent = () => {
  const sidebarRef = useRef();

  const properties = useArrayOfObjects(defaultProperties)
  // const projects = useArrayOfObjects(testProjects)
  const [projects, setProjects] = useState(testProjects); // TODO replace initial
  const removeProject = (projectId) => {
    setProjects(projects.filter(({ id }) => id !== projectId));
  };

  // const todos = useArrayOfObjects('')
  const [todos, setTodos] = useState('');
  const handleRemoveTodo = (id) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const [selectedTodo, setSelectedTodo] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const closeSidebar = () => setIsSidebarVisible(false);
  const handleRemoveTodoAndSidebar = () => {
    if (selectedTodo) handleRemoveTodo(selectedTodo.id);
    closeSidebar();
  };
  // TODO move inside somewhere idk - use refs
  const toggleSidebar = (e, todo) => {
    const isCurrentlyOpen = () =>
      isSidebarVisible &&
      (e.target.outerHTML.includes(selectedTodo.name) ||
        e.target.parentElement.outerHTML.includes(selectedTodo.name));
    if (isCurrentlyOpen()) return setIsSidebarVisible(false);

    setIsSidebarVisible(true);
    setSelectedTodo(todo);
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        isSidebarVisible &&
        !isPopupVisible &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.className.includes('card')
      )
        closeSidebar();
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSidebarVisible && !isPopupVisible)
        closeSidebar();
    };
    window.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPopupVisible, isSidebarVisible]);

  return (
    <>
      <ProjectsContext.Provider
        value={{ removeProject, projects, setProjects }}
      >
        <TodosContext.Provider
          value={{ todos, setTodos, handleRemoveTodo, projects }}
        >
          <SidebarContext.Provider
            value={{
              isSidebarVisible,
              closeSidebar,
              handleRemoveTodoAndSidebar,
              selectedTodo,
              toggleSidebar,
              setIsPopupVisible,
            }}
          >
            <MainContentContainer>
              <ProjectContainer>
                {projects &&
                  projects.map((project) => (
                    <Project project={project} key={project.id} />
                  ))}
              </ProjectContainer>
              <AddProject projects={projects} setProjects={setProjects} />
            </MainContentContainer>
            <Sidebar
              ref={sidebarRef}
              isSidebarVisible={isSidebarVisible}
              closeSidebar={closeSidebar}
              todo={selectedTodo}
            />
          </SidebarContext.Provider>
        </TodosContext.Provider>
      </ProjectsContext.Provider>
    </>
  );
};

export default MainContent;
