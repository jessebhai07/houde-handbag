"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { scaleIn } from "./motionVariants";

/* Helper Functions */
function parseCounterTarget(target) {
  const raw = String(target ?? "").trim();
  const numMatch = raw.match(/-?\d+(\.\d+)?/);
  const value = numMatch ? parseFloat(numMatch[0]) : 0;
  const hasK = /k/i.test(raw);
  const hasM = /m/i.test(raw);
  const hasPlus = /\+/.test(raw);
  const suffix = `${hasK ? "k" : ""}${hasM ? "m" : ""}${hasPlus ? "+" : ""}`;
  const hasDecimal = (numMatch?.[0] ?? "").includes(".");
  return { value, suffix, hasDecimal };
}

function formatCounter(n, hasDecimal) {
  if (!Number.isFinite(n)) return "0";
  if (hasDecimal) return (Math.round(n * 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 1 });
  return Math.round(n).toLocaleString();
}

function AnimatedCounter({ target, duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const { value: targetValue, suffix, hasDecimal } = useMemo(() => parseCounterTarget(target), [target]);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setCount(targetValue);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const next = from + (targetValue - from) * (1 - Math.pow(1 - t, 3));
      setCount(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, targetValue, duration, reduceMotion]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-2 tabular-nums">
      {formatCounter(count, hasDecimal)}{suffix}
    </div>
  );
}

export default function CapabilitiesStats({ data }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.6 }}
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              variants={reduceMotion ? undefined : scaleIn}
              viewport={{ once: true, amount: 0.25 }}
              className="bg-amber-50 p-4 md:p-6 rounded-xl lg:rounded-2xl text-center border border-amber-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <div className="min-h-[56px] md:min-h-[70px] flex items-center justify-center">
                <AnimatedCounter target={item.value} duration={1.8 + index * 0.2} />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                {item.unit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}