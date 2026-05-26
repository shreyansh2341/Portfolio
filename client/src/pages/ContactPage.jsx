import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: null, error: null });

  // Contact form submission handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: null, error: null });
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitStatus({ loading: false, success: data.message, error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setSubmitStatus({ loading: false, success: null, error: err.message });
    }
  };

  // Auto-dismiss success toast
  useEffect(() => {
    if (submitStatus.success) {
      const timer = setTimeout(() => {
        setSubmitStatus(prev => ({ ...prev, success: null }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.success]);

  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
            Say Hello
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-shimmer">Contact</h1>
          <p className="text-sm md:text-base mt-4 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Have a project, job opening, or internship opportunity in mind? Feel free to reach out using the form or direct coordinates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 flex flex-col justify-between glass-card p-8 rounded-2xl border"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Let's Collaborate
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I'm currently seeking software developer opportunities and internships. Let's build something efficient, beautiful, and meaningful together.
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#00d9ff]/10 border border-[#00d9ff]/25 text-[#00d9ff]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>Email</div>
                    <a href="mailto:shreyanshrai940@gmail.com" className="text-sm font-medium hover:text-[#00d9ff] transition-colors" style={{ color: 'var(--text-primary)' }}>
                      shreyanshrai940@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-[#f59e0b]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>Call / Message</div>
                    <a href="tel:+917408940724" className="text-sm font-medium hover:text-[#f59e0b] transition-colors" style={{ color: 'var(--text-primary)' }}>
                      +91 7408940724
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#a78bfa]/10 border border-[#a78bfa]/25 text-[#a78bfa]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>Location</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Kalyan, Maharashtra, India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="border-t pt-6 mt-8 md:mt-0" style={{ borderColor: 'var(--border)' }}>
              <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
                "Code is like humor. When you have to explain it, it’s bad."
              </p>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-7"
          >
            <form onSubmit={handleContactSubmit} className="glass-card p-8 rounded-2xl border space-y-6 h-full flex flex-col justify-between" style={{ borderColor: 'var(--border)' }}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d9ff] transition-colors"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d9ff] transition-colors"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>Message</label>
                  <textarea 
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d9ff] transition-colors resize-none"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    placeholder="Describe your project, role details, or opportunity..."
                  ></textarea>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={submitStatus.loading}
                className="w-full bg-gradient-to-r from-[#f59e0b] to-[#00d9ff] hover:scale-[1.02] text-[#0a0a0a] font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6 shadow-md"
              >
                {submitStatus.loading ? (
                  'Sending Message...'
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Success/Error Toasts */}
        <AnimatePresence>
          {submitStatus.success && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-[#0a0a0a] px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 text-sm font-semibold"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{submitStatus.success}</span>
            </motion.div>
          )}
          {submitStatus.error && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 z-50 bg-rose-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 text-sm font-semibold"
            >
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <span>{submitStatus.error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
