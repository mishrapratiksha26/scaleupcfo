import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { FileText, CheckCircle2, AlertCircle, RefreshCw, FileCheck } from 'lucide-react';

const records = [
  { id: 1, vendor: 'Vendor A', amount: 45000, status: 'matched', tds: 4500 },
  { id: 2, vendor: 'Vendor B', amount: 28000, status: 'matched', tds: 2800 },
  { id: 3, vendor: 'Vendor C', amount: 65000, status: 'mismatch', tds: 6500 },
  { id: 4, vendor: 'Vendor D', amount: 32000, status: 'matched', tds: 3200 },
];

export function TDSGraphic() {
  const [reconciling, setReconciling] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(0);
  const [reconciledCount, setReconciledCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setReconciling(true);
      setTimeout(() => {
        setCurrentRecord((prev) => (prev + 1) % records.length);
        setReconciledCount((prev) => prev + 1);
        setReconciling(false);
      }, 1500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const matchedCount = records.filter(r => r.status === 'matched').length;
  const mismatchCount = records.filter(r => r.status === 'mismatch').length;

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
        animate={{ rotate: reconciling ? 360 : 0 }}
        transition={{ duration: 1, ease: "linear" }}
        className="absolute top-6 right-6 w-10 h-10 bg-[#4A6C6F] rounded-xl flex items-center justify-center shadow-lg"
      >
        <FileCheck className="w-5 h-5 text-white" />
      </motion.div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-slate-900 mb-1">26AS Reconciliation</h3>
          <p className="text-sm text-slate-600">Auto-matching in progress</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <motion.div
          animate={{ scale: reconciling ? [1, 1.05, 1] : 1 }}
          className="bg-white rounded-xl p-3 border-2 border-[#4A6C6F]"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 bg-[#4A6C6F] rounded flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-slate-700">Matched</span>
          </div>
          <div className="text-xl text-slate-900">{matchedCount}</div>
          <div className="text-xs text-slate-600">Auto-reconciled</div>
        </motion.div>

        <div className="bg-slate-50 rounded-xl p-3 border-2 border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
              <AlertCircle className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-slate-700">Mismatches</span>
          </div>
          <div className="text-xl text-slate-900">{mismatchCount}</div>
          <div className="text-xs text-slate-600">Need review</div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-2 mb-4 flex-1 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {records.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: index === currentRecord && reconciling ? [1, 1.02, 1] : 1
              }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl p-3 border-2 transition-all ${
                record.status === 'matched'
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-50 border-red-200'
              } ${index === currentRecord && reconciling ? 'ring-2 ring-[#4A6C6F]' : ''}`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  record.status === 'matched' ? 'bg-[#4A6C6F]' : 'bg-red-500'
                }`}>
                  {record.status === 'matched' ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-900 truncate">{record.vendor}</div>
                  <div className="text-xs text-slate-600">
                    ₹{record.amount.toLocaleString()} • TDS: ₹{record.tds.toLocaleString()}
                  </div>
                </div>

                {record.status === 'matched' ? (
                  <div className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-300 whitespace-nowrap">
                    Verified
                  </div>
                ) : (
                  <div className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full border border-red-300 whitespace-nowrap">
                    ₹{Math.floor(record.tds * 0.02)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Stats */}
      <div className="bg-slate-50 rounded-xl p-3 border-2 border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-900">Progress</span>
          <span className="text-sm text-slate-700">{reconciledCount} processed</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-[#4A6C6F]"
            initial={{ width: 0 }}
            animate={{ width: `${(matchedCount / records.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="text-xs text-slate-600">
          AI matching • {matchedCount}/{records.length} auto-verified
        </div>
      </div>
    </motion.div>
  );
}