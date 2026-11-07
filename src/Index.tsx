import React, { useRef, useEffect, useState } from 'react';
import {
  Globe,
  ArrowRight,
  Instagram,
  Twitter,
  ChevronUp,
  Check,
} from 'lucide-react';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import AuthModal from './components/AuthModal';
import ManifestoModal from './components/ManifestoModal';

export const Index: React.FC = () => {
  // Video ref and animation state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadeAnimRef = useRef<number | null>(null);
  const isFadingOutRef = useRef<boolean>(false);

  // UI state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [manifestoOpen, setManifestoOpen] = useState(false);

  // Video fade logic via requestAnimationFrame
  const animateOpacity = (
    from: number,
    to: number,
    duration: number,
    onComplete?: () => void
  ) => {
    if (fadeAnimRef.current !== null) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }

    const video = videoRef.current;
    if (!video) return;

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = from + (to - from) * progress;
      if (video) {
        video.style.opacity = currentVal.toString();
      }
      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(tick);
      } else {
        fadeAnimRef.current = null;
        if (onComplete) onComplete();
      }
    };
    fadeAnimRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start with opacity 0 and no CSS transition interference
    video.style.opacity = '0';
    video.style.transition = 'none';

    const handleCanPlay = () => {
      video.play().catch(() => {});
      animateOpacity(0, 1, 500);
    };

    const handleTimeUpdate = () => {
      if (
        !isFadingOutRef.current &&
        video.duration &&
        !isNaN(video.duration) &&
        video.duration > 0
      ) {
        const remaining = video.duration - video.currentTime;
        if (remaining <= 0.55 && remaining > 0) {
          isFadingOutRef.current = true;
          const current = parseFloat(video.style.opacity || '1');
          animateOpacity(current, 0, 500);
        }
      }
    };

    const handleEnded = () => {
      if (fadeAnimRef.current !== null) {
        cancelAnimationFrame(fadeAnimRef.current);
        fadeAnimRef.current = null;
      }
      video.style.opacity = '0';
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video
          .play()
          .then(() => {
            isFadingOutRef.current = false;
            animateOpacity(0, 1, 500);
          })
          .catch(() => {});
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If video is already cached/playable
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      if (fadeAnimRef.current !== null) {
        cancelAnimationFrame(fadeAnimRef.current);
      }
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white/20 selection:text-white font-sans">
      {/* ========================================================
          SECTION 1 -- HERO (full-viewport)
         ======================================================== */}
      <section className="min-h-screen overflow-hidden relative flex flex-col justify-between">
        {/* Background Video */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
        />

        {/* Ambient Dark Gradient for Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"
          aria-hidden="true"
        />

        {/* Navbar (relative z-20, px-6 py-6) */}
        <header className="relative z-20 px-6 py-6 w-full">
          <nav className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between shadow-2xl">
            {/* Left Zone: Brand + Nav Links */}
            <div className="flex items-center">
              <a
                href="#"
                className="flex items-center gap-2.5 text-white group cursor-pointer"
              >
                <Globe className="w-6 h-6 text-white transition-transform duration-500 group-hover:rotate-45" />
                <span className="text-white font-semibold text-lg tracking-tight">
                  Asme
                </span>
              </a>

              {/* Navigation Links (Hidden on mobile) */}
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a
                  href="#services"
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Features
                </a>
                <a
                  href="#philosophy"
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  About
                </a>
              </div>
            </div>

            {/* Right Zone: Sign Up & Login */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => openAuth('signup')}
                className="text-white text-sm font-medium hover:text-white/70 transition-colors cursor-pointer px-2 py-1"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => openAuth('login')}
                className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer shadow-md"
              >
                Login
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Content (relative z-10, flex-1 flex flex-col items-center justify-center, px-6 py-12 text-center, -translate-y-[20%]) */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
          {/* Main Heading */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap font-['Instrument_Serif',serif] mb-8 select-none">
            Know it then{' '}
            <em className="italic font-normal">
              all
            </em>
            .
          </h1>

          {/* Email Subscription Input */}
          <form
            onSubmit={handleSubscribe}
            className="max-w-xl w-full mb-6 relative"
          >
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 shadow-2xl transition-all focus-within:ring-1 focus-within:ring-white/30">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm font-normal"
                aria-label="Email subscription input"
                required
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="bg-white rounded-full p-3 text-black hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer shrink-0 shadow-lg flex items-center justify-center"
              >
                {subscribed ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-black" />
                )}
              </button>
            </div>
            {subscribed && (
              <p className="absolute -bottom-6 left-0 right-0 text-xs text-emerald-400 font-medium">
                Thank you for subscribing to Asme updates.
              </p>
            )}
          </form>

          {/* Subtitle */}
          <p className="text-white text-sm leading-relaxed px-4 max-w-xl mb-8 font-light">
            Stay updated with the latest news and insights. Subscribe to our
            newsletter today and never miss out on exciting updates.
          </p>

          {/* Manifesto Button */}
          <button
            type="button"
            onClick={() => setManifestoOpen(true)}
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer shadow-lg active:scale-95"
          >
            Manifesto
          </button>
        </div>

        {/* Social Icons Footer (relative z-10, flex justify-center gap-4 pb-12) */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#about"
            aria-label="Global Network"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 -- ABOUT SECTION
         ======================================================== */}
      <AboutSection />

      {/* ========================================================
          SECTION 3 -- FEATURED VIDEO
         ======================================================== */}
      <FeaturedVideoSection onExploreMore={() => setManifestoOpen(true)} />

      {/* ========================================================
          SECTION 4 -- PHILOSOPHY / INNOVATION x VISION
         ======================================================== */}
      <PhilosophySection />

      {/* ========================================================
          SECTION 5 -- SERVICES / WHAT WE DO
         ======================================================== */}
      <ServicesSection onSelectService={() => setManifestoOpen(true)} />

      {/* ========================================================
          FOOTER
         ======================================================== */}
      <footer className="bg-black border-t border-white/10 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-white/70" />
            <span className="text-white font-medium text-base tracking-tight">
              Asme
            </span>
            <span className="text-white/40 text-xs ml-4">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs text-white/60">
            <button
              onClick={() => setManifestoOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Manifesto
            </button>
            <button
              onClick={() => openAuth('login')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Member Portal
            </button>
            <a
              href="#about"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Studio
            </a>
            <button
              onClick={scrollToTop}
              className="liquid-glass rounded-full p-2.5 text-white/70 hover:text-white transition-all cursor-pointer hover:bg-white/10"
              aria-label="Back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Manifesto Modal */}
      <ManifestoModal
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />
    </div>
  );
};

export default Index;
