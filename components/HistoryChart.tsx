
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type BMIEntry, UnitSystem } from '../types';
import { KG_TO_LBS } from '../constants';


interface HistoryChartProps {
  history: BMIEntry[];
  unitSystem: UnitSystem;
}

const HistoryChart: React.FC<HistoryChartProps> = ({ history, unitSystem }) => {
  if (history.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400 py-8">No weight history yet. Add an entry to see your progress!</p>;
  }

  const chartData = history.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }),
    weight: unitSystem === UnitSystem.Metric ? entry.weight : parseFloat((entry.weight * KG_TO_LBS).toFixed(1)),
    bmi: parseFloat(entry.bmi.toFixed(1)),
  })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const weightUnit = unitSystem === UnitSystem.Metric ? 'kg' : 'lbs';

  return (
    <div className="h-72 md:h-80 w-full animate-fadeIn">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} className="stroke-gray-300 dark:stroke-gray-700" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} className="fill-gray-600 dark:fill-gray-400" />
          <YAxis yAxisId="left" 
            tick={{ fontSize: 10 }} 
            className="fill-gray-600 dark:fill-gray-400"
            label={{ value: `Weight (${weightUnit})`, angle: -90, position: 'insideLeft', offset:-5, fontSize: 12,  fill: 'currentColor' }}
          />
          <YAxis yAxisId="right" orientation="right" 
            tick={{ fontSize: 10 }} 
            className="fill-gray-600 dark:fill-gray-400"
            label={{ value: 'BMI', angle: 90, position: 'insideRight', offset:10, fontSize: 12, fill: 'currentColor' }}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              border: '1px solid #ccc',
              borderRadius: '8px',
              color: '#333'
            }}
            labelStyle={{ fontWeight: 'bold', color: '#6C5CE7' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name={`Weight (${weightUnit})`} />
          <Line yAxisId="right" type="monotone" dataKey="bmi" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="BMI" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
    