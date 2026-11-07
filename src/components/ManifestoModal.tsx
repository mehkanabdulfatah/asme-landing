import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass rounded-3xl p-8 md:p-12 max-w-2xl w-full relative border border-white/10 shadow-2xl bg-neutral-950/95 text-white max-h-[85vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white liquid-glass rounded-full p-2.5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-4 text-white/40 text-xs uppercase tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-white/70" />
            <span>The Asme Manifesto</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] tracking-tight mb-8 font-normal leading-[1.1]">
            Know it then{' '}
            <em className="italic text-white/70 font-normal">all</em>.
          </h2>

          <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed font-light">
            <p>
              We live in a world saturated with noise yet starving for clarity.
              At Asme, we believe true mastery does not arrive by collecting
              disparate facts, but by synthesizing intuition, rigorous strategy,
              and fearless imagination.
            </p>
            <p>
              Our collective is built for architects of change — those who
              refuse the comfort of standard answers. When technology and
              human-centered design align without compromise, the impossible
              becomes baseline.
            </p>
            <blockquote className="border-l border-white/20 pl-6 py-2 my-6 font-['Instrument_Serif'] italic text-xl md:text-2xl text-white/90">
              "Curiosity is not a fleeting spark; it is a disciplined practice
              of seeing what others overlook and crafting what has never
              existed."
            </blockquote>
            <p>
              From insight to physical reality, we honor the craft of making.
              We construct artifacts and systems that stand the test of time,
              moving culture forward with intention and elegance.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/40 tracking-wider uppercase font-medium">
              Established 2026 · Worldwide
            </span>
            <button
              type="button"
              onClick={onClose}
              className="liquid-glass rounded-full px-6 py-2 text-xs uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ManifestoModal;
