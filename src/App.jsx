import React, { useState } from "react";
import FilterButton from './components/ui/FilterButton';
import KpiCard from './components/ui/KpiCard';
import DataTable from './components/ui/DataTable';
import CategoriesChart from './components/charts/CategoriesChart';
import EvolutionChart from './components/charts/EvolutionChart';
import PieChartComponent from './components/charts/PieChartComponent';

const Dashboard = () => {
  const [filter, setFilter] = useState({
    tablero: "Todos",
    usuarios: "Todas",
    categoria: "Todos",
    rol: "Todos",
    fecha: "Todas"
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  // Función para manejar selección del pie chart y bar chart
  const handleCategorySelect = (categoryData) => {
    setSelectedCategory(categoryData);
    if (categoryData) {
      setFilter(prev => ({
        ...prev,
        categoria: categoryData.name
      }));
    } else {
      setFilter(prev => ({
        ...prev,
        categoria: "Todos"
      }));
    }
  };

  // Función para manejar selección del gráfico evolutivo
  const handleDateRangeSelect = (dateRange) => {
    setSelectedDateRange(dateRange);
    if (dateRange) {
      if (dateRange.type === 'single') {
        setFilter(prev => ({
          ...prev,
          fecha: `Día ${dateRange.start.day}`
        }));
      } else {
        setFilter(prev => ({
          ...prev,
          fecha: `Día ${dateRange.start.day} - ${dateRange.end.day}`
        }));
      }
    } else {
      setFilter(prev => ({
        ...prev,
        fecha: "Todas"
      }));
    }
  };

  const kpiData = [
    { title: "Visitas", value: 3688, sublabel: "Visitas" },
    { title: "Tableros", value: 155, sublabel: "Tableros" },
    { title: "Usuarios", value: 396, sublabel: "Usuarios" },
    { title: "Suma de Intentos", value: 69, sublabel: "Suma de Intentos" },
  ];

  const categoriasData = [
    { name: "BA Colaborativa", value: 1467 },
    { name: "mBA", value: 654 },
    { name: "Expresión BA", value: 523 },
    { name: "SSECI", value: 297 },
    { name: "SSECII - Sistema de Turnos", value: 189 },
    { name: "Flas Virtuales", value: 134 },
    { name: "Seguimiento", value: 98 },
    { name: "Otros", value: 326 },
  ];

  const evolutivoData = [
    { day: 1, value: 15 },
    { day: 2, value: 28 },
    { day: 3, value: 25 },
    { day: 4, value: 32 },
    { day: 5, value: 35 },
    { day: 6, value: 22 },
    { day: 7, value: 18 },
    { day: 8, value: 30 },
    { day: 9, value: 38 },
    { day: 10, value: 42 },
    { day: 11, value: 50 },
    { day: 12, value: 45 },
    { day: 13, value: 38 },
    { day: 14, value: 30 },
    { day: 15, value: 25 },
    { day: 16, value: 32 },
    { day: 17, value: 45 },
    { day: 18, value: 52 },
    { day: 19, value: 48 },
    { day: 20, value: 35 },
    { day: 21, value: 28 },
    { day: 22, value: 40 },
    { day: 23, value: 48 },
    { day: 24, value: 45 },
    { day: 25, value: 42 },
    { day: 26, value: 38 },
    { day: 27, value: 35 },
    { day: 28, value: 32 },
    { day: 29, value: 28 },
    { day: 30, value: 25 },
    { day: 31, value: 20 },
  ];

  const tableData = [
    {
      nombre: "Ailen Iglesias",
      apellido: "Barreiro",
      rol: "ADMIN",
      tablero: "BA Colaborativa - General",
      intentos: 1,
      fecha: "21/08/2025 12:00:00 a.m.",
    },
    {
      nombre: "Ailen Iglesias",
      apellido: "Barreiro",
      rol: "ADMIN",
      tablero: "BA Colaborativa - General",
      intentos: 1,
      fecha: "05/06/2025 12:00:00 a.m.",
    },
    {
      nombre: "Ailen Iglesias",
      apellido: "Barreiro",
      rol: "ADMIN",
      tablero: "BA Colaborativa - General",
      intentos: 1,
      fecha: "07/07/2025 12:00:00 a.m.",
    },
    {
      nombre: "Ailen Iglesias",
      apellido: "Barreiro",
      rol: "ADMIN",
      tablero: "BA Colaborativa - General",
      intentos: 1,
      fecha: "30/07/2025 12:00:00 a.m.",
    },
    {
      nombre: "Ailen Iglesias",
      apellido: "Barreiro",
      rol: "ADMIN",
      tablero: "BA Colaborativa - General",
      intentos: 1,
      fecha: "06/08/2025 12:00:00 a.m.",
    },
    {
      nombre: "Ailen Iglesias",
      apellido: "Barreiro",
      rol: "ADMIN",
      tablero: "BA Colaborativa - General",
      intentos: 1,
      fecha: "24/09/2025 12:00:00 a.m.",
    },
    {
      nombre: "Ailen Iglesias",
      apellido: "Barreiro",
      rol: "ADMIN",
      tablero: "Expresión BA - La ciudad te escucha",
      intentos: 1,
      fecha: "15/09/2025 12:00:00 a.m.",
    },
    {
      nombre: "Ailen Iglesias",
      apellido: "Barreiro",
      rol: "ADMIN",
      tablero: "Expresión BA - General",
      intentos: 1,
      fecha: "11/06/2025 12:00:00 a.m.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* 1️⃣ Header con filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        {(selectedCategory || selectedDateRange) && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                {selectedCategory && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-600 font-medium">Categoría:</span>
                    <span className="text-sm font-semibold text-blue-800">
                      {selectedCategory.name} ({selectedCategory.value.toLocaleString()} visitas)
                    </span>
                  </div>
                )}
                {selectedDateRange && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {selectedDateRange.type === 'single' ? 'Fecha:' : 'Período:'}
                    </span>
                    <span className="text-sm font-semibold text-blue-800">
                      {selectedDateRange.type === 'single' 
                        ? `Día ${selectedDateRange.start.day}`
                        : `Día ${selectedDateRange.start.day} - ${selectedDateRange.end.day}`}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                {selectedCategory && (
                  <button 
                    onClick={() => handleCategorySelect(null)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ✕ Categoría
                  </button>
                )}
                {selectedDateRange && (
                  <button 
                    onClick={() => handleDateRangeSelect(null)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ✕ Fecha
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Botones de filtro */}
        <div className="grid grid-cols-5 gap-4">
          {["tablero", "usuarios", "categoria", "rol", "fecha"].map((filterType) => (
            <FilterButton 
              key={filterType}
              label={filterType}
              value={filter[filterType]}
              onClick={() => {/* manejar click */}}
            />
          ))}
        </div>
      </div>

      {/* 2️⃣ KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => (
          <KpiCard 
            key={idx}
            value={kpi.value}
            sublabel={kpi.sublabel}
          />
        ))}
      </div>

      {/* 3️⃣ CategoriesChart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <CategoriesChart 
          data={categoriasData} 
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* 4️⃣ PieChart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <PieChartComponent 
          data={categoriasData} 
          onSegmentSelect={handleCategorySelect}
        />
      </div>

      {/* 5️⃣ EvolutionChart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <EvolutionChart 
          data={evolutivoData} 
          onDateRangeSelect={handleDateRangeSelect}
          selectedDateRange={selectedDateRange}
        />
      </div>

      {/* 6️⃣ Tabla */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <DataTable data={tableData} />
      </div>
    </div>
  );
};

export default Dashboard;

