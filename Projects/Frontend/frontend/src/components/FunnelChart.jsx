import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import GlassCard from './ui/GlassCard';

const FunnelChart = ({ data = [] }) => {
  const chartData = [
    { name: 'POSTULADO', value: data.applied || 0, color: 'var(--applied-color)' },
    { name: 'ENTREVISTA', value: data.interview || 0, color: 'var(--interview-color)' },
    { name: 'PRUEBA TÉCNICA', value: data.technical || 0, color: 'var(--technical-color)' },
    { name: 'OFERTA', value: data.offer || 0, color: 'var(--offer-color)' },
    { name: 'RECHAZADO', value: data.rejected || 0, color: 'var(--rejected-color)' },
    { name: 'DESCARTADO', value: data.discarded || 0, color: 'var(--discarded-color)' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <GlassCard className="p-3 shadow-xl border-violet/20" hover={false}>
          <p className="font-mono text-[10px] text-text-muted mb-1 uppercase tracking-wider">
            {payload[0].payload.name}
          </p>
          <p className="font-display font-extrabold text-lg text-violet">
            {payload[0].value}
          </p>
        </GlassCard>
      );
    }
    return null;
  };

  return (
    <GlassCard className="p-6 h-[320px] flex flex-col" hover={false}>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted mb-6">
        FUNNEL DE ESTADOS
      </h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'var(--font-mono)' }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
              barSize={24}
              background={{ fill: 'rgba(0,0,0,0.04)', radius: [0, 4, 4, 0] }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export default FunnelChart;
