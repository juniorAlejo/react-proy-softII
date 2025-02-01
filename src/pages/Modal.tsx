import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl"; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-[300px]", 
    md: "w-[500px]", 
    lg: "w-[700px]", 
    xl: "w-[900px]", 
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-9999"
      onClick={onClose}
    >
      <div
        className="flex justify-center items-center w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-white dark:bg-boxdark rounded-lg shadow-lg p-6 ${sizeClasses[size]} z-9999`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
