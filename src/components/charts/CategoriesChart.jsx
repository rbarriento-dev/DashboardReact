import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CategoriesChart = ({ data, onCategorySelect, selectedCategory }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleBarClick = (data, index) => {
    const isCurrentlySelected = selectedCategory && selectedCategory.name === data.name;
    const newSelection = isCurrentlySelected ? null : data;
    
    if (onCategorySelect) {
      onCategorySelect(newSelection);
    }
  };

  const handleMouseEnter = (data, index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getBarColor = (entry, index) => {
    const isSelected = selectedCategory && selectedCategory.name === entry.name;
    const isHovered = hoveredIndex === index;
    
    if (isSelected) return '#2563eb'; // Azul más intenso para seleccionado
    if (isHovered) return '#3b82f6'; // Azul medio para hover
    return '#8884d8'; // Color por defecto
  };

  const getBarOpacity = (entry, index) => {
    const isSelected = selectedCategory && selectedCategory.name === entry.name;
    const isHovered = hoveredIndex === index;
    
    if (isSelected) return 1;
    if (isHovered) return 0.8;
    return selectedCategory ? 0.5 : 0.7; // Si hay algo seleccionado, atenuar las no seleccionadas
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Categorías</h3>
        {selectedCategory && (
          <button 
            onClick={() => onCategorySelect && onCategorySelect(null)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Limpiar selección
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Gráfico */}
        <div className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={data}
              onMouseLeave={handleMouseLeave}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value.toLocaleString(), 'Visitas']}
                labelStyle={{ color: '#333' }}
              />
              <Bar 
                dataKey="value" 
                cursor="pointer"
                onMouseEnter={handleMouseEnter}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={getBarColor(entry, index)}
                    fillOpacity={getBarOpacity(entry, index)}
                    onClick={() => handleBarClick(entry, index)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Panel de información */}
        <div className="lg:col-span-1">
          {selectedCategory ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Categoría Seleccionada</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Nombre:</span>
                  <p className="font-medium text-sm">{selectedCategory.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Visitas:</span>
                  <p className="font-medium text-lg">{selectedCategory.value.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Porcentaje:</span>
                  <p className="font-medium">
                    {((selectedCategory.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Ranking:</span>
                  <p className="font-medium">
                    #{data.findIndex(item => item.name === selectedCategory.name) + 1} de {data.length}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              <p className="text-sm">Haz clic en una barra para ver información detallada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesChart;