import React from "react";

const EditModal = ({ transaction, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    description: transaction.description,
    value: transaction.value,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Editar Transação</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mb-2"
          />
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
