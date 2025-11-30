import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const PieChartComponent = ({ data, onSegmentSelect }) => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const handleSegmentClick = (entry, index) => {
    const newSelection = selectedSegment === index ? null : index;
    setSelectedSegment(newSelection);
    
    // Notificar al componente padre si hay callback
    if (onSegmentSelect) {
      onSegmentSelect(newSelection !== null ? entry : null);
    }
  };

  const handleMouseEnter = (data, index) => {
    setHoveredSegment(index);
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  const getCellProps = (index) => {
    const isSelected = selectedSegment === index;
    const isHovered = hoveredSegment === index;
    
    return {
      fill: COLORS[index % COLORS.length],
      fillOpacity: isSelected ? 1 : (isHovered ? 0.8 : 0.7),
      stroke: isSelected ? '#333' : 'none',
      strokeWidth: isSelected ? 2 : 0,
      style: { cursor: 'pointer' }
    };
  };

  const selectedData = selectedSegment !== null ? data[selectedSegment] : null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Distribución por Categorías</h3>
        {selectedData && (
          <button 
            onClick={() => handleSegmentClick(null, null)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Limpiar selección
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfico */}
        <div className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    {...getCellProps(index)}
                    onClick={() => handleSegmentClick(entry, index)}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value.toLocaleString(), name]}
                labelStyle={{ color: '#333' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Panel de información */}
        <div className="lg:col-span-1">
          {selectedData ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Información Detallada</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Categoría:</span>
                  <p className="font-medium">{selectedData.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Valor:</span>
                  <p className="font-medium text-lg">{selectedData.value.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Porcentaje:</span>
                  <p className="font-medium">
                    {((selectedData.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              <p className="text-sm">Haz clic en un segmento para ver información detallada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PieChartComponent; 