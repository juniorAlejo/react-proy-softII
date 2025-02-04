import { Info } from "lucide-react";
import React, { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onCancel]);

  const handleConfirmClick = () => {
    onConfirm();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-999"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <Info className="w-18 h-18 text-red-600" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
          ¿Estas seguro?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          ¡No podrás revertir esto!
        </p>

        <div className="flex justify-center space-x-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 dark:text-white bg-gray-300 dark:bg-gray-700 rounded-md text-lg hover:bg-gray-400 transition duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmClick}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md text-lg focus:outline-none transition duration-300"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
