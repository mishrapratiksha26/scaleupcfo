import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, DollarSign, AlertCircle, Sparkles } from 'lucide-react';

const chartData = [
  { name: 'Jan', value: 245 },
  { name: 'Feb', value: 289 },
  { name: 'Mar', value: 312 },
  { name: 'Apr', value: 298 },
  { name: 'May', value: 356 },
  { name: 'Jun', value: 401 },
];

const queries = [
  "Show me cash runway...",
  "What's driving AR growth?",
  "Predict Q4 burn rate...",
];

export function LiveDashboardGraphic() {
  const [queryIndex, setQueryIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const query = queries[queryIndex];
    
    if (isTyping && displayText.length < query.length) {
      const timeout = setTimeout(() => {
        setDisplayText(query.slice(0, displayText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else if (isTyping && displayText.length === query.length) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (!isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText('');
        setIsTyping(true);
        setQueryIndex((prev) => (prev + 1) % queries.length);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayText, isTyping, queryIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 relative h-[550px] flex flex-col"
    >
      {/* Icon Badge - Top Right */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute top-6 right-6 w-10 h-10 bg-[#4A6C6F] rounded-xl flex items-center justify-center shadow-lg"
      >
        <Sparkles className="w-5 h-5 text-white" />
      </motion.div>

      {/* AI Query Input */}
      <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3 mb-4 border border-slate-200">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white flex-shrink-0"
        >
          <span className="text-xs">AI</span>
        </motion.div>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-slate-700">{displayText}</span>
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-0.5 h-4 bg-[#4A6C6F]"
            />
          )}
        </div>
      </div>

      {/* Live Dashboard */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-2">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="bg-white rounded-xl p-2.5 border-2 border-slate-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-lg bg-[#4A6C6F] flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-slate-600">Revenue</span>
            </div>
            <div className="text-lg text-slate-900">$1.2M</div>
            <div className="text-xs text-[#4A6C6F]">+18%</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="bg-white rounded-xl p-2.5 border-2 border-slate-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-lg bg-slate-700 flex items-center justify-center">
                <DollarSign className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-slate-600">Cash</span>
            </div>
            <div className="text-lg text-slate-900">$401K</div>
            <div className="text-xs text-slate-500">↑ $56K</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            className="bg-white rounded-xl p-2.5 border-2 border-red-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-lg bg-red-500 flex items-center justify-center">
                <AlertCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-slate-600">Alerts</span>
            </div>
            <div className="text-lg text-slate-900">3</div>
            <div className="text-xs text-red-500">Action needed</div>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex-1">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === chartData.length - 1 ? '#4A6C6F' : '#cbd5e1'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-50 rounded-xl p-3 border border-slate-200"
        >
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-sm text-slate-900 mb-1">AI Insight</div>
              <div className="text-xs text-slate-600">
                Cash velocity improved 18% vs last month. Collections trending ahead of forecast.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}