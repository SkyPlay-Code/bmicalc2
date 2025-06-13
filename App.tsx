
import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import { Theme, UnitSystem, type BMIEntry } from './types';
import * as localStorageService from './services/localStorageService';
import { getHealthInsights } from './services/geminiService';
import ThemeToggle from './components/ThemeToggle';
import BMICalculatorForm from './components/BMICalculatorForm';
import BMIVisualization from './components/BMIVisualization';
import HealthInsightsSection from './components/HealthInsightsSection';
import WeightHistorySection from './components/WeightHistorySection';
import { CURRENT_YEAR, KG_TO_LBS, LBS_TO_KG, CM_TO_INCHES, INCHES_TO_CM, FT_TO_INCHES } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(localStorageService.loadTheme() || Theme.Light);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(localStorageService.loadUnitSystem() || UnitSystem.Metric);
  
  const [heightCm, setHeightCm] = useState<string>('');
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');
  const [weightLbs, setWeightLbs] = useState<string>('');

  const [bmi, setBmi] = useState<number | null>(null);
  const [healthInsights, setHealthInsights] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState<boolean>(false);
  const [weightHistory, setWeightHistory] = useState<BMIEntry[]>(localStorageService.loadWeightHistory());

  useEffect(() => {
    if (theme === Theme.Dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorageService.saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    localStorageService.saveUnitSystem(unitSystem);
  }, [unitSystem]);

  useEffect(() => {
    localStorageService.saveWeightHistory(weightHistory);
  }, [weightHistory]);

  const calculateBmi = useCallback(() => {
    let h: number, w: number; // height in meters, weight in kg

    if (unitSystem === UnitSystem.Metric) {
      h = parseFloat(heightCm) / 100;
      w = parseFloat(weightKg);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = ft * FT_TO_INCHES + inch;
      if (totalInches <= 0) {
        setBmi(null);
        return;
      }
      h = totalInches * INCHES_TO_CM / 100;
      w = parseFloat(weightLbs) * LBS_TO_KG;
    }

    if (h > 0 && w > 0) {
      const calculatedBmi = w / (h * h);
      setBmi(calculatedBmi);
    } else {
      setBmi(null);
    }
  }, [heightCm, weightKg, heightFt, heightIn, weightLbs, unitSystem]);


  useEffect(() => {
    calculateBmi();
  }, [heightCm, weightKg, heightFt, heightIn, weightLbs, unitSystem, calculateBmi]);


  const handleThemeToggle = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  };

  const handleUnitSwitch = () => {
    const newUnitSystem = unitSystem === UnitSystem.Metric ? UnitSystem.Imperial : UnitSystem.Metric;
    
    if (newUnitSystem === UnitSystem.Imperial) { // Metric to Imperial
        const hCm = parseFloat(heightCm);
        const wKg = parseFloat(weightKg);
        if (!isNaN(hCm) && hCm > 0) {
            const totalInches = hCm * CM_TO_INCHES;
            setHeightFt(Math.floor(totalInches / FT_TO_INCHES).toString());
            setHeightIn(Math.round(totalInches % FT_TO_INCHES).toString());
        } else {
            setHeightFt(''); setHeightIn('');
        }
        if (!isNaN(wKg) && wKg > 0) {
            setWeightLbs((wKg * KG_TO_LBS).toFixed(1));
        } else {
            setWeightLbs('');
        }
    } else { // Imperial to Metric
        const hFt = parseFloat(heightFt) || 0;
        const hIn = parseFloat(heightIn) || 0;
        const wLbs = parseFloat(weightLbs);
        if (hFt > 0 || hIn > 0) {
            const totalInches = hFt * FT_TO_INCHES + hIn;
            setHeightCm((totalInches * INCHES_TO_CM).toFixed(0));
        } else {
            setHeightCm('');
        }
        if (!isNaN(wLbs) && wLbs > 0) {
            setWeightKg((wLbs * LBS_TO_KG).toFixed(1));
        } else {
            setWeightKg('');
        }
    }
    setUnitSystem(newUnitSystem);
  };

  const fetchInsights = useCallback(async () => {
    if (bmi === null) {
      setHealthInsights("Please calculate your BMI first to get insights.");
      return;
    }
    setIsLoadingInsights(true);
    setHealthInsights(null); // Clear previous insights

    let currentW: number, currentH1: number, currentH2: number | undefined;
    if (unitSystem === UnitSystem.Metric) {
        currentW = parseFloat(weightKg);
        currentH1 = parseFloat(heightCm);
    } else {
        currentW = parseFloat(weightLbs);
        currentH1 = parseFloat(heightFt);
        currentH2 = parseFloat(heightIn);
    }
    
    if (isNaN(currentW) || currentW <=0 || isNaN(currentH1) || currentH1 <=0 ) {
         setHealthInsights("Please enter valid height and weight to get insights.");
         setIsLoadingInsights(false);
         return;
    }

    const insights = await getHealthInsights(bmi, unitSystem, currentW, currentH1, currentH2);
    setHealthInsights(insights);
    setIsLoadingInsights(false);
  }, [bmi, unitSystem, weightKg, heightCm, weightLbs, heightFt, heightIn]);

  const addHistoryEntry = (entryWeightKg: number, date: string) => {
    let currentHeightMeters: number;
    if (unitSystem === UnitSystem.Metric) {
        currentHeightMeters = parseFloat(heightCm) / 100;
    } else {
        const ft = parseFloat(heightFt) || 0;
        const inch = parseFloat(heightIn) || 0;
        currentHeightMeters = (ft * FT_TO_INCHES + inch) * INCHES_TO_CM / 100;
    }

    if (isNaN(currentHeightMeters) || currentHeightMeters <=0 || isNaN(entryWeightKg) || entryWeightKg <=0) {
        alert("Cannot add history entry. Please ensure current height and new weight are valid.");
        return;
    }

    const entryBmi = entryWeightKg / (currentHeightMeters * currentHeightMeters);
    const newEntry: BMIEntry = {
      id: new Date().toISOString() + Math.random().toString(), // simple unique id
      date,
      weight: entryWeightKg, // Always store in KG
      bmi: entryBmi,
    };
    setWeightHistory(prev => [...prev, newEntry].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };
  
  const Card: React.FC<{children: React.ReactNode; className?: string; style?: CSSProperties}> = ({children, className, style}) => (
    <div 
      className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 transition-all duration-300 ${className || ''} animate-fadeIn`}
      style={style}
    >
      {children}
    </div>
  );


  return (
    <div className={`min-h-screen flex flex-col items-center p-4 pt-8 sm:p-6 md:p-8 selection:bg-primary/30 selection:text-primary-dark bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-950 transition-colors duration-500`}>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      </div>

      <header className="text-center mb-8 md:mb-12 animate-fadeIn" style={{animationDelay: '0.1s'}}>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink dark:from-primary-light dark:to-accent-yellow">
          BMI Calculator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          A premium health tracking tool for modern lifestyles
        </p>
      </header>

      <main className="w-full max-w-2xl space-y-6 md:space-y-8">
        <Card className="hover:shadow-2xl" style={{animationDelay: '0.2s'}}>
          <BMICalculatorForm
            unitSystem={unitSystem}
            heightCm={heightCm} setHeightCm={setHeightCm}
            weightKg={weightKg} setWeightKg={setWeightKg}
            heightFt={heightFt} setHeightFt={setHeightFt}
            heightIn={heightIn} setHeightIn={setHeightIn}
            weightLbs={weightLbs} setWeightLbs={setWeightLbs}
            onUnitSwitch={handleUnitSwitch}
          />
        </Card>

        <Card className="hover:shadow-2xl" style={{animationDelay: '0.3s'}}>
          <BMIVisualization bmi={bmi} />
        </Card>
        
        <Card className="hover:shadow-2xl" style={{animationDelay: '0.4s'}}>
          <HealthInsightsSection
            insights={healthInsights}
            isLoading={isLoadingInsights}
            onFetchInsights={fetchInsights}
            bmiCalculated={bmi !== null && bmi > 0}
          />
        </Card>

        <Card className="hover:shadow-2xl" style={{animationDelay: '0.5s'}}>
          <WeightHistorySection 
            history={weightHistory} 
            addHistoryEntry={addHistoryEntry} 
            unitSystem={unitSystem}
          />
        </Card>
      </main>

      <footer className="mt-12 mb-6 text-center text-xs text-gray-500 dark:text-gray-400 animate-fadeIn" style={{animationDelay: '0.6s'}}>
        &copy; {CURRENT_YEAR} Premium BMI Calculator. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
