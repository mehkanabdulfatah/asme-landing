import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FeaturedVideoSectionProps {
  onExploreMore?: () => void;
}

export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({
  onExploreMore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden aspect-video w-full bg-neutral-950 border border-white/5 shadow-2xl"
        >
          {/* Background Video */}
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
            className="w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Bottom Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-10">
            {/* Left Liquid Glass Card */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md backdrop-blur-md">
              <span className="text-white/50 text-xs tracking-widest uppercase mb-3 block font-medium">
                Our Approach
              </span>
              <p className="text-white text-sm md:text-base leading-relaxed font-light">
                We believe in the power of curiosity-driven exploration. Every
                project starts with a question, and every answer opens a new
                door to innovation.
              </p>
            </div>

            {/* Right Action Button */}
            <motion.button
              type="button"
              onClick={onExploreMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 shadow-lg"
            >
              Explore more
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVideoSection;
