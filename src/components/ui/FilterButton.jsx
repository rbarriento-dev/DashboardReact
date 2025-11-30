import { ChevronDown } from "lucide-react";

const FilterButton = ({ label, value, onClick }) => {
  const getLabel = (type) => {
    const labels = {
      tablero: "Tablero",
      usuarios: "Usuarios",
      categoria: "Categoría",
      rol: "Rol",
      fecha: "Fecha"
    };
    return labels[type] || type;
  };

  return (
    <div className="relative">
      <label className="block text-xs text-gray-600 mb-1 capitalize">
        {getLabel(label)}
      </label>
      <button 
        onClick={onClick}
        className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50"
      >
        <span>{value}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};

export default FilterButton;