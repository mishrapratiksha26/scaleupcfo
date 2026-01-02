import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Building2, TrendingUp, Globe, AlertTriangle } from 'lucide-react';

const banks = [
  { name: 'Chase', balance: 2450000, currency: 'USD', color: 'bg-slate-700' },
  { name: 'HSBC', balance: 1890000, currency: 'EUR', color: 'bg-slate-600' },
  { name: 'Citi', balance: 3200000, currency: 'USD', color: 'bg-slate-800' },
];

export function TreasuryGraphic() {
  const [selectedBank, setSelectedBank] = useState(0);
  const [forecastDay, setForecastDay] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setForecastDay((prev) => (prev + 1) % 30);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedBank((prev) => (prev + 1) % banks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalBalance = banks.reduce((sum, bank) => sum + bank.balance, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border border-slate-200 relative 
                 min-h-[400px] md:min-h-[500px] lg:min-h-[550px] flex flex-col overflow-y-auto"
    >
      {/* Icon Badge - Top Right */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-[#4A6C6F] rounded-xl flex items-center justify-center shadow-lg"
      >
        <Globe className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </motion.div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base md:text-lg text-slate-900 mb-1">Multi-Bank Treasury</h3>
          <p className="text-xs md:text-sm text-slate-600">Real time liquidity view</p>
        </div>
      </div>

      {/* Total Balance */}
      <motion.div
        className="bg-slate-900 rounded-2xl p-3 md:p-4 mb-4 text-white"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-xs md:text-sm opacity-75 mb-1">Total Cash Position</div>
        <div className="text-xl md:text-2xl mb-2">
          ${(totalBalance / 1000000).toFixed(2)}M
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-[#4A6C6F] rounded flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-white" />
          </div>
          <span>+$340K today</span>
        </div>
      </motion.div>

      {/* Bank Accounts */}
      <div className="space-y-2 mb-4 flex-1">
        {banks.map((bank, index) => (
          <motion.div
            key={bank.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className={`rounded-xl p-2 md:p-3 border-2 transition-all cursor-pointer ${
              selectedBank === index
                ? 'border-[#4A6C6F] bg-white'
                : 'border-slate-200 bg-slate-50'
            }`}
            onClick={() => setSelectedBank(index)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg ${bank.color} flex items-center justify-center`}>
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-900">{bank.name}</div>
                <div className="text-xs text-slate-600">{bank.currency}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-900">
                  ${(bank.balance / 1000000).toFixed(2)}M
                </div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs text-[#4A6C6F]"
                >
                  Live
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Forecast */}
      <div className="bg-slate-50 rounded-xl p-2 md:p-3 border-2 border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-900">30-Day Forecast</div>
          <div className="text-xs text-slate-600">Day {forecastDay + 1}/30</div>
        </div>

        <div className="h-2 md:h-3 bg-slate-200 rounded-full mb-2 overflow-hidden">
          <motion.div
            className="h-full bg-[#4A6C6F]"
            initial={{ width: 0 }}
            animate={{ width: `${((forecastDay + 1) / 30) * 100}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>

        <div className="flex items-start gap-2">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-3 h-3 text-white" />
          </div>
          <div className="text-xs md:text-sm text-slate-600">
            Projected shortfall of $145K on Day 23 • Consider credit line draw
          </div>
        </div>
      </div>
    </motion.div>
  );
}