"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const ROUTINE_ITEMS = [
  "Wash face",
  "Brush teeth",
  "Shave",
  "Get dressed",
  "Supplements",
  "Creatine + NMN",
  "Cold plunge",
  "Red light therapy",
  "Journal",
  "Meditate",
];

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return { day, month, year };
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Home() {
  const [checked, setChecked] = useState<boolean[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const todayKey = getTodayKey();
    const stored = localStorage.getItem("routine");

    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === todayKey) {
        setChecked(data.checked);
      } else {
        setChecked(new Array(ROUTINE_ITEMS.length).fill(false));
      }
    } else {
      setChecked(new Array(ROUTINE_ITEMS.length).fill(false));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        "routine",
        JSON.stringify({ date: getTodayKey(), checked })
      );
    }
  }, [checked, mounted]);

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const { day, month, year } = formatDate(new Date());
  const completedCount = checked.filter(Boolean).length;
  const progress = (completedCount / ROUTINE_ITEMS.length) * 100;

  return (
    <AnimatePresence mode="wait">
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen bg-background text-foreground"
        >
          <div className="max-w-md mx-auto px-8 py-16">

            {/* Date */}
            <motion.header
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-20 text-right"
            >
              <div className="text-8xl font-extralight tracking-tighter">{day}</div>
              <div className="text-sm tracking-widest text-muted uppercase mt-1">{month}</div>
              <div className="text-sm tracking-widest text-muted">{year}</div>
            </motion.header>

            {/* List */}
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {ROUTINE_ITEMS.map((routineItem, i) => (
                <motion.li key={i} variants={item}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left flex items-center gap-4 py-1"
                  >
                    <motion.span
                      initial={false}
                      animate={{ scale: checked[i] ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`text-lg transition-colors duration-300 ${checked[i] ? "text-accent" : "text-muted"}`}
                    >
                      {checked[i] ? "●" : "○"}
                    </motion.span>
                    <span className={`transition-all duration-300 ${checked[i] ? "text-muted line-through opacity-50" : "text-foreground"}`}>
                      {routineItem}
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-16"
            >
              <div className="h-px bg-muted/30 w-full relative overflow-hidden">
                <motion.div
                  className="h-px bg-foreground absolute left-0 top-0"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
              <div className="text-xs tracking-widest text-muted mt-3 text-right font-mono">
                {completedCount}/{ROUTINE_ITEMS.length}
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
