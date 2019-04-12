import React, {useState} from 'react';
import Modal from 'react-modal';

let confirmResolve, confirmSetQuestion, openModal;

// The Confirm component must be rendered before this is called.
export async function confirm(question) {
  confirmSetQuestion(question);
  return new Promise(resolve => {
    confirmResolve = resolve;
    openModal();
  });
}

export default function Confirm() {
  const [question, setQuestion] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  confirmSetQuestion = setQuestion;
  openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const answers = ['Yes', 'No'];

  // Why is this necessary?
  Modal.setAppElement('#root');

  function onClick(answer) {
    closeModal();
    confirmResolve(answer === 'Yes');
  }

  return (
    <div className="confirm">
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <header>
          <div>Confirm</div>
          <div aria-label="close modal" onClick={closeModal} role="img">
            &#x2716;
          </div>
        </header>
        <div className="body">
          <div>{question}</div>
          {answers.map(answer => (
            <button key={answer} onClick={() => onClick(answer)}>
              {answer}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
