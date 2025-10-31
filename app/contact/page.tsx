'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, Mail, Send, CheckCircle, AlertCircle, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 gradient-mesh-bg opacity-40 pointer-events-none" />
      <div className="fixed inset-0 bg-[hsl(var(--background))] opacity-90 pointer-events-none" />

      {/* Animated gradient orbs for depth */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-96 h-96 bg-[hsl(var(--secondary))]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        <Header />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))] text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(var(--foreground))]">
              Contact Us
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-lg">
              Have a question or need help? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="card-elevated p-8 animate-slide-up">
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                  Send us a message
                </h2>

                {status === 'success' && (
                  <div className="mb-6 p-4 rounded-[var(--radius-lg)] bg-[hsl(var(--success))]/10 border border-[hsl(var(--success))]/20 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--success))] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--success))] mb-1">Message sent successfully!</h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mb-6 p-4 rounded-[var(--radius-lg)] bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/20 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[hsl(var(--destructive))] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--destructive))] mb-1">Failed to send message</h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {errorMessage || 'Please try again or email us directly.'}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Purchase Issue">Purchase Issue</option>
                      <option value="Download Problem">Download Problem</option>
                      <option value="Payment Question">Payment Question</option>
                      <option value="Licensing Question">Licensing Question</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Refund Request">Refund Request</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" strokeWidth={2} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary-light))] flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[hsl(var(--primary))]" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                  Email Support
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                  Reach out to our support team directly
                </p>
                <a
                  href="mailto:support@pixelforgestudio.in"
                  className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] transition-colors font-medium text-sm break-all"
                >
                  support@pixelforgestudio.in
                </a>
              </div>

              {/* Response Time Card */}
              <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--secondary-light))] flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[hsl(var(--secondary))]" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                  Response Time
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  We typically respond within 24 hours during business days
                </p>
              </div>

              {/* FAQ Link Card */}
              <div className="card-elevated p-6 bg-[hsl(var(--primary-light))] border-[hsl(var(--primary))]/20 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                  Need Quick Answers?
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                  Check out our FAQ page for instant answers to common questions
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-hover))] transition-colors font-medium text-sm"
                >
                  Visit FAQ
                  <ChevronLeft className="w-4 h-4 rotate-180" strokeWidth={2} />
                </Link>
              </div>

              {/* Social Media Card */}
              <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                  Connect With Us
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                  Follow us on social media for updates and inspiration
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[hsl(var(--primary-light))] hover:bg-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--primary))] hover:text-white transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" strokeWidth={2} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[hsl(var(--primary-light))] hover:bg-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--primary))] hover:text-white transition-all duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" strokeWidth={2} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[hsl(var(--primary-light))] hover:bg-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--primary))] hover:text-white transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" strokeWidth={2} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[hsl(var(--primary-light))] hover:bg-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--primary))] hover:text-white transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
