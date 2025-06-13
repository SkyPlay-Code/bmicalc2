
import React, { useState } from 'react';
import { type BMIEntry, UnitSystem } from '../types';
import HistoryChart from './HistoryChart';
import Modal from './Modal';
import PlusIcon from './icons/PlusIcon';
import { KG_TO_LBS, LBS_TO_KG } from '../constants';

interface WeightHistorySectionProps {
  history: BMIEntry[];
  addHistoryEntry: (weightInKg: number, date: string) => void;
  unitSystem: UnitSystem;
}

const WeightHistorySection: React.FC<WeightHistorySectionProps> = ({ history, addHistoryEntry, unitSystem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  const handleAddEntry = () => {
    const weightNum = parseFloat(newWeight);
    if (isNaN(weightNum) || weightNum <= 0) {
      alert(`Please enter a valid positive weight in ${unitSystem === UnitSystem.Metric ? 'kg' : 'lbs'}.`);
      return;
    }

    let weightInKg = weightNum;
    if (unitSystem === UnitSystem.Imperial) {
      weightInKg = weightNum * LBS_TO_KG;
    }
    
    addHistoryEntry(weightInKg, newDate);
    setNewWeight('');
    setIsModalOpen(false);
  };
  
  const weightUnit = unitSystem === UnitSystem.Metric ? 'kg' : 'lbs';

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Weight History</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-3 py-2 bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary dark:text-textdark text-white text-sm rounded-md shadow-md transition-transform transform active:scale-95"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Entry
        </button>
      </div>

      <HistoryChart history={history} unitSystem={unitSystem} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Weight Entry">
        <div className="space-y-4">
          <div>
            <label htmlFor="newDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              id="newDate"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="newWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight ({weightUnit})
            </label>
            <input
              type="number"
              id="newWeight"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              placeholder={`Enter weight in ${weightUnit}`}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500 rounded-md shadow-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEntry}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary dark:text-textdark rounded-md shadow-sm transition-colors"
            >
              Save Entry
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WeightHistorySection;
    