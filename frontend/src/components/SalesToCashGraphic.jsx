import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { DollarSign, Check, Clock, ArrowRight, RefreshCw } from 'lucide-react';

const payments = [
  { customer: 'Acme Industries', amount: 12450, invoice: 'INV-2401' },
  { customer: 'TechCorp LLC', amount: 8900, invoice: 'INV-2402' },
  { customer: 'Global Solutions', amount: 15600, invoice: 'INV-2403' },
];

export function SalesToCashGraphic() {
  const [activePayment, setActivePayment] = useState(0);
  const [matchingStage, setMatchingStage] = useState(0);
  const [collected, setCollected] = useState([]);


 useEffect(() => {
  const stageInterval = setInterval(() => {
    setMatchingStage((prev) => {
      if (prev >= 3) {
        setCollected((current) => {
          // if this payment is already marked collected, skip
          if (current.includes(activePayment)) return current;
          return [...current, activePayment];
        });
        setActivePayment((p) => (p + 1) % payments.length);
        return 0;
      }
      return prev + 1;
    });
  }, 800);

  return () => clearInterval(stageInterval);
}, [activePayment]);


  const stages = ['Received', 'Matching', 'Applying', 'Complete'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 relative"
    >
      {/* Icon Badge - Top Right */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute top-6 right-6 w-10 h-10 bg-[#4A6C6F] rounded-xl flex items-center justify-center shadow-lg"
      >
        <RefreshCw className="w-5 h-5 text-white" />
      </motion.div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-900 mb-1">Payment Processing</h3>
          <p className="text-sm text-slate-600">AI-powered cash application</p>
        </div>
      </div>

      {/* Current Payment Being Processed */}
      <div className="bg-slate-50 rounded-2xl p-5 mb-6 border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-slate-600 mb-1">Processing Payment</div>
            <div className="text-xl text-slate-900">{payments[activePayment].customer}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl text-slate-900">
              ${payments[activePayment].amount.toLocaleString()}
            </div>
            <div className="text-xs text-slate-600">{payments[activePayment].invoice}</div>
          </div>
        </div>

        {/* Stage Progress */}
        <div className="grid grid-cols-4 gap-2">
          {stages.map((stage, index) => (
            <motion.div
              key={stage}
              className={`text-center py-2 rounded-lg text-xs transition-all ${
                index <= matchingStage
                  ? 'bg-[#4A6C6F] text-white'
                  : 'bg-white text-slate-400 border-2 border-slate-200'
              }`}
              animate={{
                scale: index === matchingStage ? [1, 1.05, 1] : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {index <= matchingStage && index < matchingStage ? (
                <Check className="w-3 h-3 mx-auto" />
              ) : index === matchingStage ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-3 h-3 mx-auto" />
                </motion.div>
              ) : (
                stage
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Completed Payments */}
      <div className="space-y-2 mb-6">
        <div className="text-xs text-slate-600 mb-2">Recently Applied</div>
        <AnimatePresence mode="popLayout">
          {collected.slice(-3).reverse().map((paymentIndex) => (
            <motion.div
              key={paymentIndex}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 bg-white rounded-lg p-3 border-2 border-slate-200"
            >
              <div className="w-8 h-8 rounded-lg bg-[#4A6C6F] flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-900">{payments[paymentIndex].customer}</div>
                <div className="text-xs text-slate-600">{payments[paymentIndex].invoice}</div>
              </div>
              <div className="text-sm text-slate-900">
                ${payments[paymentIndex].amount.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
          <div className="text-xl text-slate-900">{collected.length + 47}</div>
          <div className="text-xs text-slate-600">Today</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
          <div className="text-xl text-slate-900">2.3s</div>
          <div className="text-xs text-slate-600">Avg time</div>
        </div>
        <div className="bg-white rounded-xl p-3 border-2 border-[#4A6C6F] text-center">
          <div className="text-xl text-slate-900">98%</div>
          <div className="text-xs text-slate-600">Auto-match</div>
        </div>
      </div>
    </motion.div>
  );
}
