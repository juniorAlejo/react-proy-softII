import React, { useState } from "react";
import dataJSON from '../../public/data.json';

interface ModalProps {
  closeModal: () => void;
  onSubmit: (formState: { id: string, para: string, criterion: string, value: string, type: string }) => void;
  defaultValue?: { id: string, para: string, criterion: string, value: string, type: string };
}

export const Modal: React.FC<ModalProps> = ({ closeModal, onSubmit, defaultValue }) => {
  const fields = Object.keys(Object.values(dataJSON)[0]).filter(item => !item.startsWith("delta_"));

  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      para: "price",
      criterion: "0",
      value: "",
      type: "0",
    }
  );

  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors = [];
    if (!formState.id.trim()) newErrors.push('Bond ID is required.');
    if (!formState.value.trim()) newErrors.push('Value is required.');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();
  };

  return (
    <div className="modal-container fixed z-50 flex top-25 bottom-5">
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <div className="w-full flex justify-end">
            <strong
              className="text-xl align-center cursor-pointer"
              onClick={closeModal}
            >&times;</strong>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-5">
              <div className="form-group w-full">
                <label htmlFor="id" className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Bond ID (Input "ALL" to track all bonds with parameters below)
                </label>
                <input
                  name="id"
                  value={formState.id}
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="para" className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Parameter
                </label>
                <select
                  name="para"
                  value={formState.para}
                  className="w-full rounded border border-stroke bg-gray p-1.5 pr-8 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                >
                  {fields.map((item, idx) => (
                    <option key={idx} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="criterion" className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Criterion
                </label>
                <select
                  name="criterion"
                  value={formState.criterion}
                  className="w-full rounded border border-stroke bg-gray p-1.5 pr-8 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                >
                  <option value="0">goes down by</option>
                  <option value="1">goes up by</option>
                  <option value="4">is equal to</option>
                </select>
              </div>

              <div className="form-group w-full">
                <label htmlFor="value" className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Value to give Alert
                </label>
                <input
                  name="value"
                  value={formState.value}
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type" className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Alert Type
                </label>
                <select
                  name="type"
                  value={formState.type}
                  className="w-full rounded border border-stroke bg-gray p-1.5 pr-8 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                >
                  <option value="0">Info</option>
                  <option value="1">Warning</option>
                  <option value="2">Alert</option>
                </select>
              </div>

              {errors.length > 0 && (
                <div className="form-group col-span-3">
                  <div className="text-red-500 text-sm">
                    {errors.map((error, idx) => (
                      <p key={idx}>{error}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-group col-span-3">
                <button
                  type="submit"
                  className="w-full rounded bg-primary py-3 text-white hover:bg-primary-dark focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
