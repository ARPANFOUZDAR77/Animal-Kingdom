import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart2, PieChart as PieIcon, TrendingUp, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StatisticsView: React.FC = () => {
  const { dogsData, catsData, wildlifeData } = useApp();

  // Cat Intelligence Data
  const catIntelligenceData = catsData.map((cat) => ({
    name: cat.name,
    Intelligence: cat.intelligence,
    Affection: cat.affectionLevel
  }));

  // Wildlife Conservation Status Distribution
  const conservationMap: Record<string, number> = {};
  wildlifeData.forEach((animal) => {
    conservationMap[animal.conservationStatus] = (conservationMap[animal.conservationStatus] || 0) + 1;
  });

  const conservationData = Object.keys(conservationMap).map((key) => ({
    name: key,
    value: conservationMap[key]
  }));

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BarChart2 className="w-4 h-4" /> Animal Demographics & Metrics
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
          Statistics Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Visual analytical charts breaking down feline intelligence ratings, wildlife conservation statuses, and origins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cat Rating Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Cat Intelligence vs Affection Ratings
            </h3>
          </div>
          <p className="text-xs text-zinc-500">
            Comparing intelligence and affection levels across pedigree felines.
          </p>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={catIntelligenceData.slice(0, 8)}>
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={10} tickLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={10} domain={[0, 5]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderRadius: '12px', borderColor: '#27272a', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="Intelligence" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Affection" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wildlife Conservation Status Pie */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Conservation Status Distribution
            </h3>
          </div>
          <p className="text-xs text-zinc-500">
            Proportion of cataloged wildlife species across IUCN risk categories.
          </p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conservationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {conservationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderRadius: '12px', borderColor: '#27272a', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs pt-2">
            {conservationData.map((entry, idx) => (
              <div key={entry.name} className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
