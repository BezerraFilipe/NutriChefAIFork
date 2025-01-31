// components/NutritionTable.js
import React from "react";

const NutritionTable = ({ nutritionData }: any) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Tabela Nutricional</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Nutriente</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Quantidade</th>
            <th className="border border-gray-300 px-4 py-2 text-right">% Valor Diário</th>
          </tr>
        </thead>
        <tbody>
          {nutritionData.map((item: any, index: number) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border border-gray-300 px-4 py-2">{item.nutrient}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{item.amount}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{item.dailyValue}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionTable;
