import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Dot } from 'recharts';

const EvolutionChart = ({ data, onDateRangeSelect, selectedDateRange }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectionMode, setSelectionMode] = useState('single'); 
  const [rangeStart, setRangeStart] = useState(null);

  const handlePointClick = (data, index) => {
    if (selectionMode === 'single') {
      const newSelection = selectedPoint === index ? null : { point: data, index };
      setSelectedPoint(newSelection);
      
      if (onDateRangeSelect) {
        onDateRangeSelect(newSelection ? { start: data, end: data, type: 'single' } : null);
      }
    } else {
      // Modo rango
      if (!rangeStart) {
        setRangeStart({ point: data, index });
      } else {
        const start = Math.min(rangeStart.index, index);
        const end = Math.max(rangeStart.index, index);
        const range = {
          start: data[start],
          end: data[end],
          startIndex: start,
          endIndex: end,
          type: 'range'
        };
        
        if (onDateRangeSelect) {
          onDateRangeSelect(range);
        }
        setRangeStart(null);
      }
    }
  };

  const handleMouseEnter = (data, index) => {
    setHoveredPoint(index);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const clearSelection = () => {
    setSelectedPoint(null);
    setRangeStart(null);
    if (onDateRangeSelect) {
      onDateRangeSelect(null);
    }
  };

  const getPointColor = (index) => {
    if (selectedPoint && selectedPoint.index === index) return '#dc2626'; // Rojo para seleccionado
    if (hoveredPoint === index) return '#f59e0b'; // Amarillo para hover
    if (rangeStart && rangeStart.index === index) return '#059669'; // Verde para inicio de rango
    return '#8884d8'; // Color por defecto
  };

  const isInSelectedRange = (index) => {
    if (selectedDateRange && selectedDateRange.type === 'range') {
      return index >= selectedDateRange.startIndex && index <= selectedDateRange.endIndex;
    }
    return false;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    const isSelected = selectedPoint && selectedPoint.index === index;
    const isHovered = hoveredPoint === index;
    const isRangeStart = rangeStart && rangeStart.index === index;
    const inRange = isInSelectedRange(index);
    
    if (isSelected || isHovered || isRangeStart || inRange) {
      return (
        <Dot 
          cx={cx} 
          cy={cy} 
          r={6} 
          fill={getPointColor(index)}
          stroke="#fff"
          strokeWidth={2}
          style={{ cursor: 'pointer' }}
          onClick={() => handlePointClick(payload, index)}
        />
      );
    }
    return null;
  };

  const selectedData = selectedPoint ? selectedPoint.point : null;
  const rangeData = selectedDateRange && selectedDateRange.type === 'range' ? 
    data.slice(selectedDateRange.startIndex, selectedDateRange.endIndex + 1) : null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Evolutivo</h3>
        <div className="flex items-center space-x-2">
          <select 
            value={selectionMode} 
            onChange={(e) => {
              setSelectionMode(e.target.value);
              clearSelection();
            }}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="single">Punto único</option>
            <option value="range">Rango de fechas</option>
          </select>
          {(selectedPoint || selectedDateRange) && (
            <button 
              onClick={clearSelection}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Gráfico */}
        <div className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart 
              data={data}
              onMouseLeave={handleMouseLeave}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                label={{ value: 'Día del mes', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                label={{ value: 'Visitas', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [value.toLocaleString(), 'Visitas']}
                labelFormatter={(day) => `Día ${day}`}
                labelStyle={{ color: '#333' }}
              />
              
              {/* Líneas de referencia para rango seleccionado */}
              {selectedDateRange && selectedDateRange.type === 'range' && (
                <>
                  <ReferenceLine x={selectedDateRange.start.day} stroke="#059669" strokeDasharray="5 5" />
                  <ReferenceLine x={selectedDateRange.end.day} stroke="#059669" strokeDasharray="5 5" />
                </>
              )}
              
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: '#8884d8', strokeWidth: 2, fill: '#fff' }}
              />
              
              {/* Puntos personalizados para interacción */}
              {data.map((entry, index) => (
                <Line
                  key={`interactive-${index}`}
                  type="monotone"
                  dataKey="value"
                  stroke="transparent"
                  dot={<CustomDot />}
                  activeDot={false}
                  onMouseEnter={() => handleMouseEnter(entry, index)}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Panel de información */}
        <div className="lg:col-span-1">
          {selectedData ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Punto Seleccionado</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Día:</span>
                  <p className="font-medium">{selectedData.day}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Visitas:</span>
                  <p className="font-medium text-lg">{selectedData.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : rangeData ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Rango Seleccionado</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Período:</span>
                  <p className="font-medium">Día {selectedDateRange.start.day} - {selectedDateRange.end.day}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total visitas:</span>
                  <p className="font-medium text-lg">
                    {rangeData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Promedio:</span>
                  <p className="font-medium">
                    {Math.round(rangeData.reduce((sum, item) => sum + item.value, 0) / rangeData.length).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Días:</span>
                  <p className="font-medium">{rangeData.length}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              <p className="text-sm mb-2">
                {selectionMode === 'single' 
                  ? 'Haz clic en un punto para ver información detallada'
                  : 'Haz clic en dos puntos para seleccionar un rango'
                }
              </p>
              {rangeStart && (
                <p className="text-xs text-blue-600">
                  Inicio: Día {rangeStart.point.day}. Selecciona el punto final.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvolutionChart;