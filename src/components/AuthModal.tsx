import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync mode if changed from prop
  React.useEffect(() => {
    setMode(initialMode);
    setIsSubmitted(false);
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto close after brief success
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setEmail('');
        setPassword('');
        setName('');
      }, 1500);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass rounded-3xl p-8 max-w-md w-full relative border border-white/10 shadow-2xl bg-neutral-950/90 text-white"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white liquid-glass rounded-full p-2 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {isSubmitted ? (
            <div className="py-10 text-center flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-4 animate-bounce" />
              <h3 className="text-2xl font-['Instrument_Serif'] tracking-wide mb-2">
                {mode === 'signup' ? 'Welcome to Asme' : 'Welcome back'}
              </h3>
              <p className="text-white/60 text-sm">
                {mode === 'signup'
                  ? 'Your account has been created successfully.'
                  : 'You have signed in successfully.'}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="text-white/40 text-xs uppercase tracking-widest block mb-2 font-medium">
                  {mode === 'login' ? 'Authentication' : 'Join Asme'}
                </span>
                <h3 className="text-3xl font-['Instrument_Serif'] tracking-tight">
                  {mode === 'login' ? 'Sign in to your space' : 'Begin your journey'}
                </h3>
              </div>

              {/* Mode switch tabs */}
              <div className="flex p-1 mb-6 liquid-glass rounded-full bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-white text-black shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-white text-black shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="text-xs text-white/60 block mb-1.5 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full liquid-glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 border border-white/10 focus:border-white/40 outline-none bg-white/[0.02]"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs text-white/60 block mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full liquid-glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 border border-white/10 focus:border-white/40 outline-none bg-white/[0.02]"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/60 block mb-1.5 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full liquid-glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 border border-white/10 focus:border-white/40 outline-none bg-white/[0.02]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-6 bg-white hover:bg-neutral-200 text-black rounded-full font-medium text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-white/40">
                By continuing, you agree to Asme's Terms & Privacy Policy.
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
