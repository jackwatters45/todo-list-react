import { mdiDeleteOutline, mdiRenameBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { DatabaseContext } from '../../../context/context';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import useModal from '../../utils/custom/useModal';

const ModalContainer = styled.div`
  position: absolute;
  width: 220px;
  background: var(--secondary-background-color);
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 20%) 0px 3px 6px, rgb(15 15 15 / 40%) 0px 9px 24px;
  border-radius: 20px;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 6px 0px;
  color: var(--main-font-color);
`;

const ViewOption = styled.div`
  display: flex;
  gap: 4px;
  user-select: none;
  cursor: pointer;
  transition: background 20ms ease-in 0s;
  margin: 0 4px;
  padding: 0 8px;
  height: 28px;
  align-items: center;
  border-radius: 4px;
  gap: 8px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.055);
    border-radius: 4px;
  }
`;

const NewViewName = styled.form`
  display: flex;
  flex-direction: column;
  transition: background 20ms ease-in 0s;
  margin: 0 4px;
  padding: 0 8px;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const StyledInput = styled.input`
  padding: 4px;
`;

const ErrorMsg = styled.span`
  padding: 4px 4px 0;
  font-size: 12px;
  color: rgb(235, 87, 87);
`;

const ViewModal = ({
  selectedView,
  setViews,
  views,
  removeView,
  buttonRef,
  closeModal,
}) => {
  const { userDbRef } = useContext(DatabaseContext);

  const modalProps = useModal(buttonRef, closeModal);

  const [isRenaming, setIsRenaming] = useState(false);
  const handleClickRename = () => setIsRenaming(true);

  const [input, setInput] = useState(selectedView.name ?? '');
  const handleChange = (e) => setInput(e.target.value);
  const isErrorMsg = useMemo(() => {
    return !!views.find(({ name }) => name === input);
  }, [views, input]);

  const handleKeyDown = async (e) => {
    if (e.key !== 'Enter' || isErrorMsg || !input) return;
    closeModal();

    const updatedView = { ...selectedView, name: input };

    const { id } = selectedView;
    setViews((prev) =>
      prev.map((view) => (view.id === id ? updatedView : view)),
    );

    if (!userDbRef) return;

    try {
      await updateDoc(doc(userDbRef, 'views', selectedView.id), updatedView);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteView = async () => {
    if (views.length < 2) return;

    removeView(selectedView.id);

    if (!userDbRef) return;

    try {
      await deleteDoc(doc(userDbRef, 'views', selectedView.id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalContainer {...modalProps}>
      {!isRenaming ? (
        <>
          <ViewOption onClick={handleClickRename}>
            <Icon path={mdiRenameBoxOutline} size={0.75} />
            Rename
          </ViewOption>
          <ViewOption onClick={handleDeleteView}>
            <Icon path={mdiDeleteOutline} size={0.75} />
            Delete view
          </ViewOption>
        </>
      ) : (
        <>
          <NewViewName>
            <StyledInput
              autoFocus
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={input}
            />
            <button style={{ display: 'none' }} type="submit" />
            {isErrorMsg && input !== selectedView?.name && (
              <>
                <hr />
                <ErrorMsg>
                  A view named {input} already exists in this database.
                </ErrorMsg>
              </>
            )}
          </NewViewName>
        </>
      )}
    </ModalContainer>
  );
};

export default ViewModal;
