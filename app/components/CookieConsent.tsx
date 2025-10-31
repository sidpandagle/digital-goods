'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    functionality: false,
    advertising: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functionality: true,
      advertising: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      functionality: false,
      advertising: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl sm:w-full bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl shadow-2xl z-[9999] border border-white/10 max-h-[90vh] overflow-y-auto">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Cookie Preferences</h2>
                  <p className="text-gray-400 text-sm">Customize your cookie settings</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Essential Cookies</h3>
                    <p className="text-sm text-gray-400">
                      Required for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-purple-600 rounded-full flex items-center px-1 cursor-not-allowed">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Analytics Cookies</h3>
                    <p className="text-sm text-gray-400">
                      Help us understand how visitors interact with our website to improve performance.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() =>
                        setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                      }
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.analytics ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                      aria-label="Toggle analytics cookies"
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Functionality Cookies */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Functionality Cookies</h3>
                    <p className="text-sm text-gray-400">
                      Remember your preferences and provide enhanced, personalized features.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() =>
                        setPreferences((prev) => ({ ...prev, functionality: !prev.functionality }))
                      }
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.functionality ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                      aria-label="Toggle functionality cookies"
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.functionality ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Advertising Cookies */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Advertising Cookies</h3>
                    <p className="text-sm text-gray-400">
                      Deliver relevant advertisements and measure campaign effectiveness.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() =>
                        setPreferences((prev) => ({ ...prev, advertising: !prev.advertising }))
                      }
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.advertising ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                      aria-label="Toggle advertising cookies"
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.advertising ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptSelected}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all text-white"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-6 py-3 bg-white/10 rounded-lg font-semibold hover:bg-white/20 transition-all text-white border border-white/20"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9997] p-4 sm:p-6 animate-slide-up">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-purple-400" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">We Value Your Privacy</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We use cookies to enhance your browsing experience, provide personalized content, and analyze our
                  traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
                  <Link href="/cookie-policy" className="text-purple-400 hover:text-purple-300 underline">
                    Learn more
                  </Link>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-3 bg-white/10 rounded-lg font-semibold hover:bg-white/20 transition-all text-white border border-white/20 whitespace-nowrap"
                >
                  Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-6 py-3 bg-white/10 rounded-lg font-semibold hover:bg-white/20 transition-all text-white border border-white/20 whitespace-nowrap"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all text-white whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
