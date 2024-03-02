import React, { useEffect } from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, content }) => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal bg-white p-6 rounded-md"
      overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      portalClassName="modal-portal"
    >
      <div className="modal-content">
        <div className="modal-header border-b pb-2 flex justify-between items-center">
          <h2 className="modal-title text-xl font-semibold">{title}</h2>
          <button
            className="modal-close text-xl text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <p className="modal-text mb-4">{content}</p>
        <div className="modal-buttons flex justify-end">
          <button
            className="modal-button bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="modal-button bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
