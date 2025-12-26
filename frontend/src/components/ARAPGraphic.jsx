import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { FileText, CheckCircle2, ArrowRight, Zap } from "lucide-react";

const invoices = [
  { id: 1, vendor: "Acme Corp", amount: "$4,250", status: "processing" },
  { id: 2, vendor: "TechSupply Inc", amount: "$1,890", status: "processing" },
  { id: 3, vendor: "Office Plus", amount: "$650", status: "processing" },
];

export function ARAPGraphic() {
  const [processedCount, setProcessedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessedCount((prev) => (prev + 1) % (invoices.length + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
      <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-white rounded-3xl shadow-2xl border border-slate-200 relative w-full h-full"
    style={{
      padding: "16px 16px 10px 16px",   // keep padding only
    }}
  >
      {/* Icon Badge - Top Right */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-3 right-3 w-8 h-8 bg-[#4A6C6F] rounded-xl flex items-center justify-center shadow-md"
      >
        <Zap className="w-4 h-4 text-white" />
      </motion.div>

      {/* Header */}
      <div className="pr-10 mb-2">
        <h3 className="text-slate-900 text-sm mb-0.5">Invoice Processing</h3>
        <p className="text-xs text-slate-600">AI auto-coding in progress</p>
      </div>

      {/* Processing Pipeline */}
      <div className="space-y-2.5 mb-3">
        {invoices.map((invoice, index) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <div
              className={`rounded-xl px-3 py-2.5 border-2 transition-all duration-500 ${
                index < processedCount
                  ? "bg-white border-[#4A6C6F]"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    index < processedCount ? "bg-[#4A6C6F]" : "bg-slate-300"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {index < processedCount ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="file"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <FileText className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex-1">
                  <div className="text-xs font-medium text-slate-900">
                    {invoice.vendor}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {invoice.amount}
                  </div>
                </div>

                {index < processedCount && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-300 whitespace-nowrap"
                  >
                    Coded to GL 5420
                  </motion.div>
                )}

                {index === processedCount && index < invoices.length && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-[10px] bg-[#4A6C6F] text-white px-2.5 py-0.5 rounded-full whitespace-nowrap"
                  >
                    Processing...
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-center">
          <div className="text-base text-slate-900">156</div>
          <div className="text-[10px] text-slate-600">Processed today</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 border-2 border-[#4A6C6F] text-center">
          <div className="text-base text-slate-900">94%</div>
          <div className="text-[10px] text-slate-600">Auto-coded</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-center">
          <div className="text-base text-slate-900">2.3s</div>
          <div className="text-[10px] text-slate-600">Avg time</div>
        </div>
      </div>

      {/* AI Learning Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-1.5 text-[10px] text-slate-600"
      >
        <ArrowRight className="w-3 h-3 text-[#4A6C6F]" />
        AI learning from your GL history • Accuracy improving daily
      </motion.div>
    </motion.div>
  );
}
