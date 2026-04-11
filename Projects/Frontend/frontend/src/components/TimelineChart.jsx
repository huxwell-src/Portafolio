import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import GlassCard from './ui/GlassCard';

const TimelineChart = ({ data = [] }) => {
  const chartData = data.map((d) => ({
    week: `SEM ${d.week}`,
    count: d.count,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <GlassCard className="p-3 shadow-xl border-violet/20" hover={false}>
          <p className="font-mono text-[10px] text-text-muted mb-1 uppercase tracking-wider">
            {payload[0].payload.week}
          </p>
          <p className="font-display font-extrabold text-lg text-violet">
            {payload[0].value} POSTULACIONES
          </p>
        </GlassCard>
      );
    }
    return null;
  };

  return (
    <GlassCard className="p-6 h-[320px] flex flex-col" hover={false}>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted mb-6">
        POSTULACIONES POR SEMANA
      </h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--violet)" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="var(--violet)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="week" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'var(--text-dim)', fontSize: 9, fontFamily: 'var(--font-mono)' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'var(--text-dim)', fontSize: 9, fontFamily: 'var(--font-mono)' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--violet)', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="var(--violet)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export default TimelineChart;
