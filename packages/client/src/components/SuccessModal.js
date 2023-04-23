import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    textAlign: 'center',
  },
};

Modal.setAppElement('#root');

const ModalWrapper = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  button {
    background-color: #008000;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #006400;
    }
  }
`;

export const SuccessModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Úspěšný hlasování"
    >
      <ModalWrapper>
        <h2>Úspěšný hlasovací!</h2>
        <p>Váš hlas byl úspěšně zaznamenán.</p>
        <button onClick={closeModal}>Zavřít</button>
      </ModalWrapper>
    </Modal>
  );
};
