'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  experts,
  categories,
  investors,
  testimonials,
  pressLogos,
  howItWorks,
} from './data/introData';

export default function Home() {
  const [homeTab, setHomeTab] = useState('all'); // 'all' | 'experts' | 'founders' | 'seniors'
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [modalCategory, setModalCategory] = useState('All');
  const [kbdShortcut, setKbdShortcut] = useState('⌘K');
  const [sortBy, setSortBy] = useState('featured');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Booking form state
  const [bookingDuration, setBookingDuration] = useState(30);
  const [bookingDate, setBookingDate] = useState('Tomorrow');
  const [bookingTime, setBookingTime] = useState('2:00 PM');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Become expert form state
  const [expertFormSubmitted, setExpertFormSubmitted] = useState(false);

  // Detect platform keyboard shortcut (⌘K on Mac, Ctrl K on Windows/Linux)
  useEffect(() => {
    if (typeof navigator !== 'undefined' && !/Mac|iPhone|iPod|iPad/.test(navigator.userAgent)) {
      setKbdShortcut('Ctrl K');
    }

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setSelectedExpert(null);
        setIsExpertModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter experts for the global Search Modal (independent of home page category)
  const modalFilteredExperts = useMemo(() => {
    const q = modalSearchQuery.toLowerCase().trim();
    return experts.filter((exp) => {
      const matchesCat =
        modalCategory === 'All' ||
        exp.categories.some((c) => c.toLowerCase().includes(modalCategory.toLowerCase()));
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        exp.name.toLowerCase().includes(q) ||
        exp.bio.toLowerCase().includes(q) ||
        (exp.headline && exp.headline.toLowerCase().includes(q)) ||
        exp.categories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [modalSearchQuery, modalCategory]);

  // Curated 8 Experts, 8 Founders, and 8 Senior Professionals
  const EXPERT_IDS = [5, 8, 9, 12, 13, 19, 67, 73];
  const FOUNDER_IDS = [27, 1, 2, 3, 11, 14, 10, 72];
  const SENIOR_IDS = [4, 33, 98, 92, 52, 22, 23, 86];

  const sortExperts = (list, sortKey) => {
    if (sortKey === 'price-low') {
      return [...list].sort(
        (a, b) =>
          (parseInt(String(a.price).replace(/[^0-9]/g, '')) || 0) -
          (parseInt(String(b.price).replace(/[^0-9]/g, '')) || 0)
      );
    }
    if (sortKey === 'price-high') {
      return [...list].sort(
        (a, b) =>
          (parseInt(String(b.price).replace(/[^0-9]/g, '')) || 0) -
          (parseInt(String(a.price).replace(/[^0-9]/g, '')) || 0)
      );
    }
    if (sortKey === 'rating') {
      return [...list].sort(
        (a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0)
      );
    }
    return list;
  };

  const applySearch = (list) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter((exp) => {
      return (
        exp.name.toLowerCase().includes(q) ||
        exp.bio.toLowerCase().includes(q) ||
        (exp.headline && exp.headline.toLowerCase().includes(q)) ||
        (exp.categories && exp.categories.some((c) => c.toLowerCase().includes(q)))
      );
    });
  };

  const curatedExperts = useMemo(() => {
    const raw = EXPERT_IDS.map((id) => experts.find((e) => e.id === id)).filter(Boolean);
    return sortExperts(applySearch(raw), sortBy);
  }, [searchQuery, sortBy]);

  const curatedFounders = useMemo(() => {
    const raw = FOUNDER_IDS.map((id) => experts.find((e) => e.id === id)).filter(Boolean);
    return sortExperts(applySearch(raw), sortBy);
  }, [searchQuery, sortBy]);

  const curatedSeniors = useMemo(() => {
    const raw = SENIOR_IDS.map((id) => experts.find((e) => e.id === id)).filter(Boolean);
    return sortExperts(applySearch(raw), sortBy);
  }, [searchQuery, sortBy]);

  const allCuratedCombined = useMemo(() => {
    return [...curatedExperts, ...curatedFounders, ...curatedSeniors];
  }, [curatedExperts, curatedFounders, curatedSeniors]);

  // Open booking modal for an expert
  const handleOpenBooking = (expert) => {
    setSelectedExpert(expert);
    setBookingSuccess(false);
    setBookingDuration(30);
    setBookingTime('2:00 PM');
  };

  // Calculate dynamic price based on duration
  const getCalculatedPrice = (basePriceStr, minutes) => {
    const base = parseInt(String(basePriceStr).replace(/[^0-9]/g, '')) || 2500;
    if (minutes === 15) return `Birr ${Math.round(base * 0.6).toLocaleString()}`;
    if (minutes === 30) return `Birr ${base.toLocaleString()}`;
    if (minutes === 45) return `Birr ${Math.round(base * 1.4).toLocaleString()}`;
    return `Birr ${Math.round(base * 1.8).toLocaleString()}`;
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="site-nav">
        <div className="nav-container">
          <div className="nav-left">
            <a href="/" className="nav-logo-link" aria-label="Intro Home">
              <img
                src="https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/61947b3902848eff1d7e6926_intro-white-logo.png"
                alt="Intro Logo"
                className="nav-logo-img"
              />
            </a>
            <nav className="nav-links">
              <Link href="/experts" className="nav-link">
                Browse Experts
              </Link>
              <a href="#how-it-works" className="nav-link">
                Our Mission
              </a>
              <a href="#investors" className="nav-link">
                Our Story
              </a>
            </nav>
          </div>

          <div className="nav-right">
            <button
              type="button"
              onClick={() => {
                setModalSearchQuery(searchQuery || '');
                setIsSearchModalOpen(true);
              }}
              className="nav-search-btn"
              aria-label="Search experts"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Search experts...</span>
              <span className="nav-search-kbd">{kbdShortcut}</span>
            </button>

            <Link href="/gift" className="nav-btn-text">
              Gift a Session
            </Link>

            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="nav-btn-signup"
            >
              Sign up
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1e1d24] border-t border-white/10 px-6 py-4 flex flex-col gap-3">
            <Link
              href="/experts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white font-semibold py-2"
            >
              Browse Experts
            </Link>
            <a
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#cfccd6] py-2"
            >
              Our Mission
            </a>
            <Link
              href="/gift"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#cfccd6] py-2"
            >
              Gift a Session
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsSearchModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center bg-white text-[#1a1921] font-semibold py-2.5 rounded-full mt-2"
            >
              Find an Expert
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-container">
          <div className="hero-badge-pill">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Over 400+ vetted founders, designers &amp; executives ready for 1-on-1 video calls
          </div>

          <h1 className="hero-title">
            Book Africa’s most in-demand experts &amp; get advice over a video call
          </h1>

          <p className="hero-subtitle">
            Skip months of guesswork. Connect 1-on-1 with iconic entrepreneurs, Forbes 30u30 founders, celebrity designers, and top VCs.
          </p>

          {/* Quick Hero Search Input with Live Autocomplete */}
          <div className="hero-search-wrapper">
            <div className="hero-search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8c8996" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search by name, company (Drybar, Nextdoor, Casper), or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="hero-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-white text-xs px-2"
                >
                  Clear
                </button>
              )}
              <a href="#experts-directory" className="hero-search-btn-cta">
                Find an Expert
              </a>
            </div>

            {/* Live Autocomplete Suggestions Dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="hero-suggestions-dropdown luxury-shadow-lg">
                <div className="text-xs uppercase tracking-wider font-bold text-gray-400 px-3 py-2">
                  Matching Curated Leaders ({allCuratedCombined.length})
                </div>
                {allCuratedCombined.slice(0, 5).map((exp) => (
                  <Link
                    key={exp.id || exp.name}
                    href={`/expert/${exp.slug || exp.id}`}
                    className="suggestion-item"
                  >
                    <img
                      src={exp.image}
                      alt={exp.name}
                      className="suggestion-avatar"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-white flex items-center gap-1.5 truncate">
                        {exp.name}
                        <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="#2563eb">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-400 truncate">{exp.bio}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-bold text-white">{exp.price}</span>
                      <span className="text-[11px] text-gray-400 block">/ session</span>
                    </div>
                  </Link>
                ))}
                {allCuratedCombined.length > 5 ? (
                  <a
                    href="#experts-directory"
                    className="block text-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 py-2 border-t border-white/10 mt-1"
                  >
                    View all {allCuratedCombined.length} results ↓
                  </a>
                ) : (
                  <Link
                    href="/experts"
                    className="block text-center text-xs font-semibold text-gray-400 hover:text-white py-2 border-t border-white/10 mt-1"
                  >
                    Search across full 400+ directory →
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="hero-ctas">
            <a href="#experts-directory" className="btn-hero-primary">
              Browse All Experts
            </a>
          </div>
        </div>
      </section>

      {/* Press Bar */}
      <section className="press-bar">
        <div className="press-container">
          <span className="press-label">As seen in</span>
          <div className="press-logos">
            {pressLogos.map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.name}
                className="press-logo-item"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gift Card Banner */}
      <section id="gift-card" className="gift-section">
        <div className="gift-card-banner">
          <div className="gift-text-wrap">
            <span className="gift-badge">Special Gift</span>
            <h2 className="gift-title">Gift a session for any occasion</h2>
            <p className="gift-desc">
              Give a 1-on-1 video call with their favorite founder, interior designer, or career mentor. The most impactful gift they will ever receive.
            </p>
            <Link
              href="/gift"
              className="gift-btn"
            >
              Gift a session →
            </Link>
          </div>

          <div className="gift-image-wrap">
            <img
              src="https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/6390def69fa61e67d6000b74_intro-gift-card.png"
              alt="Intro Gift Card"
              className="gift-image"
            />
          </div>
        </div>
      </section>

      {/* 3 Core Guarantees */}
      <section className="guarantees-section">
        <div className="guarantees-container">
          <div className="guarantee-card">
            <div className="guarantee-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <h3 className="guarantee-title">Get access to the world’s best</h3>
            <p className="guarantee-desc">
              Choose from our curated roster of the top experts across startups, design, fashion, wellness, and business strategy.
            </p>
          </div>

          <div className="guarantee-card">
            <div className="guarantee-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 10l5 5-5 5"></path>
                <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
              </svg>
            </div>
            <h3 className="guarantee-title">Personalized advice just for you</h3>
            <p className="guarantee-desc">
              Book a 1-on-1 virtual session &amp; receive tailored answers, design critique, and strategic guidance for your exact situation.
            </p>
          </div>

          <div className="guarantee-card">
            <div className="guarantee-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="guarantee-title">Save time &amp; money, guaranteed</h3>
            <p className="guarantee-desc">
              Our satisfaction guarantee — find immense value in your very first session or request your money back, no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* Category Pills Navigation (Sticky) */}
      <section className="category-filter-section">
        <div className="category-filter-container">
          <div className="category-pills-list no-scrollbar">
            <button
              type="button"
              onClick={() => {
                setHomeTab('all');
                const el = document.getElementById('experts-directory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`category-pill ${homeTab === 'all' ? 'active' : ''}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span>All</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setHomeTab('experts');
                const el = document.getElementById('experts-directory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`category-pill ${homeTab === 'experts' ? 'active' : ''}`}
            >
              <svg className="w-4 h-4 text-amber-500 fill-amber-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Top Experts</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setHomeTab('founders');
                const el = document.getElementById('experts-directory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`category-pill ${homeTab === 'founders' ? 'active' : ''}`}
            >
              <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
              <span>Iconic Founders</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setHomeTab('seniors');
                const el = document.getElementById('experts-directory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`category-pill ${homeTab === 'seniors' ? 'active' : ''}`}
            >
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>Senior Professionals</span>
            </button>
          </div>

          <div className="category-actions-right">
            <span className="category-counter">
              {homeTab === 'all'
                ? `${allCuratedCombined.length} Experts`
                : homeTab === 'experts'
                ? `${curatedExperts.length} Experts`
                : homeTab === 'founders'
                ? `${curatedFounders.length} Founders`
                : `${curatedSeniors.length} Senior Professionals`}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
              aria-label="Sort experts"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated (5.0)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Experts Directory */}
      <section id="experts-directory" className="experts-section">
        <div className="experts-container">
          {searchQuery && (
            <div className="section-header-wrap">
              <div>
                <p className="section-subtext">
                  Showing results matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="ml-3 text-indigo-600 hover:underline font-semibold text-xs"
                  >
                    Clear search
                  </button>
                </p>
              </div>
            </div>
          )}

          {allCuratedCombined.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#e5dfd5]">
              <p className="text-xl font-bold text-[#1a1921]">No leaders found</p>
              <p className="text-[#6a6871] mt-2 mb-6">
                No matching profile found for &ldquo;{searchQuery}&rdquo; within the curated 8 experts, 8 founders, and 8 senior professionals.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="bg-[#1a1921] text-white px-6 py-2.5 rounded-full font-medium"
                >
                  Reset Search
                </button>
                <Link
                  href="/experts"
                  className="bg-[#f4efe7] text-[#1a1921] hover:bg-[#e8e1d5] px-6 py-2.5 rounded-full font-medium"
                >
                  Search Full 400+ Directory →
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* GROUP 1: 8 TOP EXPERTS */}
              {(homeTab === 'all' || homeTab === 'experts') && curatedExperts.length > 0 && (
                <div className="home-group-section">
                  <div className="home-group-header">
                    <h2 className="home-group-title">
                      Top Experts
                    </h2>
                  </div>

                  <div className="experts-grid">
                    {curatedExperts.map((exp) => (
                      <Link
                        key={exp.id || exp.name}
                        href={`/expert/${exp.slug || exp.id}`}
                        className="expert-card"
                      >
                        <div className="expert-card-image-wrap">
                          <img
                            src={exp.image}
                            alt={exp.name}
                            loading="lazy"
                            className="expert-card-img"
                          />
                          <span className="expert-card-badge badge-expert">Top Expert</span>
                          <div className="expert-card-overlay-btn">
                            Book Session • View Info
                          </div>
                        </div>

                        <div className="expert-card-body">
                          <div className="expert-card-header">
                            <div className="expert-name-wrap">
                              <span className="expert-name">{exp.name}</span>
                              <svg className="verified-icon" viewBox="0 0 24 24" fill="#2563eb">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>

                            <div className="expert-rating-wrap">
                              <svg className="star-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span>{exp.rating}</span>
                            </div>
                          </div>

                          <p className="expert-bio">{exp.bio}</p>

                          <div className="expert-footer">
                            <div>
                              <span className="expert-price">{exp.price}</span>
                              <span className="expert-price-suffix">• Session</span>
                            </div>
                            <span className="expert-action-pill">Book &amp; Info →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* GROUP 2: 8 ICONIC FOUNDERS */}
              {(homeTab === 'all' || homeTab === 'founders') && curatedFounders.length > 0 && (
                <div className="home-group-section">
                  <div className="home-group-header">
                    <h2 className="home-group-title">
                      Iconic Founders
                    </h2>
                  </div>

                  <div className="experts-grid">
                    {curatedFounders.map((exp) => (
                      <Link
                        key={exp.id || exp.name}
                        href={`/expert/${exp.slug || exp.id}`}
                        className="expert-card"
                      >
                        <div className="expert-card-image-wrap">
                          <img
                            src={exp.image}
                            alt={exp.name}
                            loading="lazy"
                            className="expert-card-img"
                          />
                          <span className="expert-card-badge badge-founder">Founder</span>
                          <div className="expert-card-overlay-btn">
                            Book Session • View Info
                          </div>
                        </div>

                        <div className="expert-card-body">
                          <div className="expert-card-header">
                            <div className="expert-name-wrap">
                              <span className="expert-name">{exp.name}</span>
                              <svg className="verified-icon" viewBox="0 0 24 24" fill="#2563eb">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>

                            <div className="expert-rating-wrap">
                              <svg className="star-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span>{exp.rating}</span>
                            </div>
                          </div>

                          <p className="expert-bio">{exp.bio}</p>

                          <div className="expert-footer">
                            <div>
                              <span className="expert-price">{exp.price}</span>
                              <span className="expert-price-suffix">• Session</span>
                            </div>
                            <span className="expert-action-pill">Book &amp; Info →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* GROUP 3: 8 SENIOR PROFESSIONALS */}
              {(homeTab === 'all' || homeTab === 'seniors') && curatedSeniors.length > 0 && (
                <div className="home-group-section">
                  <div className="home-group-header">
                    <h2 className="home-group-title">
                      Senior Professionals
                    </h2>
                  </div>

                  <div className="experts-grid">
                    {curatedSeniors.map((exp) => (
                      <Link
                        key={exp.id || exp.name}
                        href={`/expert/${exp.slug || exp.id}`}
                        className="expert-card"
                      >
                        <div className="expert-card-image-wrap">
                          <img
                            src={exp.image}
                            alt={exp.name}
                            loading="lazy"
                            className="expert-card-img"
                          />
                          <span className="expert-card-badge badge-senior">Senior Professional</span>
                          <div className="expert-card-overlay-btn">
                            Book Session • View Info
                          </div>
                        </div>

                        <div className="expert-card-body">
                          <div className="expert-card-header">
                            <div className="expert-name-wrap">
                              <span className="expert-name">{exp.name}</span>
                              <svg className="verified-icon" viewBox="0 0 24 24" fill="#2563eb">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>

                            <div className="expert-rating-wrap">
                              <svg className="star-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span>{exp.rating}</span>
                            </div>
                          </div>

                          <p className="expert-bio">{exp.bio}</p>

                          <div className="expert-footer">
                            <div>
                              <span className="expert-price">{exp.price}</span>
                              <span className="expert-price-suffix">• Session</span>
                            </div>
                            <span className="expert-action-pill">Book &amp; Info →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}


            </>
          )}
        </div>
      </section>

      {/* How Intro Works */}
      <section id="how-it-works" className="how-section">
        <div className="how-container">
          <div className="how-header">
            <span className="how-tag">Simple &amp; Seamless</span>
            <h2 className="how-title">How Intro Works</h2>
            <p className="text-[#6a6871] text-lg">
              Unlock decades of hard-won knowledge in minutes. Here is how simple it is:
            </p>
          </div>

          <div className="how-steps-grid">
            {howItWorks.map((item) => (
              <div key={item.step} className="how-step-card">
                <div className="how-step-num">{item.step}</div>
                <h3 className="how-step-title">{item.title}</h3>
                <p className="how-step-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews / Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="text-xs uppercase tracking-widest font-bold text-[#797682] block mb-2">
              Real Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1921]">
              Hear from our clients
            </h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div>
                  <div className="flex text-amber-500 mb-3 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                </div>

                <div className="testimonial-author-wrap">
                  <div>
                    <h4 className="testimonial-author-name">{t.author}</h4>
                    <p className="testimonial-author-role">{t.role}</p>
                  </div>
                  <span className="testimonial-expert-tag">w/ {t.expert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Investors */}
      <section id="investors" className="investors-section">
        <div className="investors-container">
          <h2 className="investors-heading">Backed by visionary leaders</h2>
          <div className="investors-grid">
            {investors.map((inv, idx) => (
              <div key={idx} className="investor-item">
                <img
                  src={inv.image}
                  alt={inv.name}
                  className="investor-avatar"
                />
                <h3 className="investor-name">{inv.name}</h3>
                <p className="investor-title">{inv.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <img
                src="https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/61947b3902848eff1d7e6926_intro-white-logo.png"
                alt="Intro Logo"
                className="footer-logo-img"
              />
              <p className="footer-tagline">
                Book Africa’s most in-demand experts &amp; get advice over a video call. Connect with industry pioneers in tech, design, business, and beyond.
              </p>
              <button
                type="button"
                onClick={() => setIsExpertModalOpen(true)}
                className="footer-cta-btn"
              >
                Apply as an Expert
              </button>
            </div>

            <div className="footer-links-grid">
              <div>
                <h4 className="footer-col-title">Explore</h4>
                <ul className="footer-col-links">
                  {categories.slice(0, 5).map((cat) => (
                    <li key={cat} className="footer-link-item">
                      <Link
                        href={`/experts?category=${encodeURIComponent(cat)}`}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Company</h4>
                <ul className="footer-col-links">
                  <li className="footer-link-item"><a href="#how-it-works">About &amp; Mission</a></li>
                  <li className="footer-link-item"><a href="#investors">Investors</a></li>
                  <li className="footer-link-item"><Link href="/gift">Gift a Session</Link></li>
                  <li className="footer-link-item">
                    <button type="button" onClick={() => setIsExpertModalOpen(true)}>
                      Apply as an Expert
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Support</h4>
                <ul className="footer-col-links">
                  <li className="footer-link-item"><a href="mailto:hi@intro.co">hi@intro.co</a></li>
                  <li className="footer-link-item"><a href="#how-it-works">FAQ</a></li>
                  <li className="footer-link-item"><a href="#guarantees">Money Back Guarantee</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              INTRO 2026. ALL RIGHTS RESERVED.
            </p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <span>•</span>
              <a href="#terms">Terms of Service</a>
              <span>•</span>
              <a href="#cookies">Your Privacy Choices</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL 1: Expert Booking Modal */}
      {selectedExpert && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedExpert(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedExpert(null)}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="booking-modal-body">
              {!bookingSuccess ? (
                <>
                  <div className="booking-expert-header">
                    <img
                      src={selectedExpert.image}
                      alt={selectedExpert.name}
                      className="booking-expert-avatar"
                    />
                    <div className="booking-expert-info">
                      <h3>
                        {selectedExpert.name}
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2563eb">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </h3>
                      <p>{selectedExpert.bio}</p>
                    </div>
                  </div>

                  <form onSubmit={handleConfirmBooking}>
                    {/* Duration Selection */}
                    <label className="booking-section-label">Select Session Length</label>
                    <div className="duration-selector">
                      {[15, 30, 45].map((mins) => (
                        <div
                          key={mins}
                          onClick={() => setBookingDuration(mins)}
                          className={`duration-option ${bookingDuration === mins ? 'active' : ''}`}
                        >
                          <div className="duration-time">{mins} mins</div>
                          <div className="duration-price">
                            {getCalculatedPrice(selectedExpert.price, mins)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Date Picker */}
                    <label className="booking-section-label">Select Day</label>
                    <div className="flex gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
                      {['Tomorrow', 'In 2 days', 'This Friday', 'Next Monday'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setBookingDate(d)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                            bookingDate === d
                              ? 'bg-[#1a1921] text-white border-[#1a1921]'
                              : 'bg-[#faf8f5] text-[#1a1921] border-[#e5dfd5]'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    {/* Available Time Slots */}
                    <label className="booking-section-label">Available Times (EST)</label>
                    <div className="time-slots-grid">
                      {['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBookingTime(t)}
                          className={`time-slot-btn ${bookingTime === t ? 'active' : ''}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Questions / Agenda */}
                    <label className="booking-section-label">What would you like to discuss?</label>
                    <textarea
                      required
                      placeholder="e.g. Scaling customer acquisition, feedback on my brand design, hiring operators..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="form-input-field form-textarea"
                    />

                    {/* Contact Email */}
                    <label className="booking-section-label">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="form-input-field"
                    />

                    {/* Submit */}
                    <button type="submit" className="btn-confirm-booking">
                      Book Now • {getCalculatedPrice(selectedExpert.price, bookingDuration)}
                    </button>
                  </form>
                </>
              ) : (
                <div className="booking-success-box">
                  <div className="success-check-circle">✓</div>
                  <h3 className="text-2xl font-bold text-[#1a1921] mb-2">
                    Session Confirmed!
                  </h3>
                  <p className="text-[#6a6871] max-w-md mx-auto mb-6">
                    You are scheduled with <strong>{selectedExpert.name}</strong> for a {bookingDuration}-minute video session on <strong>{bookingDate} at {bookingTime}</strong>.
                  </p>
                  <div className="p-4 bg-[#f8f5ee] rounded-xl text-sm text-[#4b4852] max-w-sm mx-auto mb-6">
                    A calendar invitation and secure video link have been sent to <strong>{bookingEmail || 'your email'}</strong>.
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedExpert(null)}
                    className="bg-[#1a1921] text-white px-8 py-3 rounded-full font-semibold"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Keyboard / Global Search Modal (⌘K / Ctrl+K) */}
      {isSearchModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className="modal-content search-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-input-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search by name, company (Drybar, Nextdoor, Casper), topic, or title..."
                value={modalSearchQuery}
                onChange={(e) => setModalSearchQuery(e.target.value)}
                className="search-modal-input"
              />
              {modalSearchQuery && (
                <button
                  type="button"
                  onClick={() => setModalSearchQuery('')}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(false)}
                className="search-esc-badge"
              >
                ESC
              </button>
            </div>

            {/* Quick Category Filters */}
            <div className="search-modal-categories">
              {['All', 'Career & Business', 'Startups & Tech', 'Home Decor', 'Style & Beauty', 'Wellness'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setModalCategory(cat)}
                  className={`search-cat-pill ${modalCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="search-results-meta">
              <span>{modalFilteredExperts.length} Experts Available</span>
              <span className="text-[11px] font-normal lowercase">Press ESC to close</span>
            </div>

            <div className="search-results-list">
              {modalFilteredExperts.length > 0 ? (
                modalFilteredExperts.slice(0, 16).map((exp) => (
                  <Link
                    key={exp.id || exp.name}
                    href={`/expert/${exp.slug || exp.id}`}
                    onClick={() => setIsSearchModalOpen(false)}
                    className="search-result-row"
                  >
                    <div className="search-result-left">
                      <img
                        src={exp.image}
                        alt={exp.name}
                        className="search-result-avatar"
                      />
                      <div className="search-result-info">
                        <div className="search-result-title-row">
                          <span className="search-result-name">{exp.name}</span>
                          <svg className="search-result-verified" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <div className="search-result-bio">
                          {exp.headline || exp.bio}
                        </div>
                      </div>
                    </div>
                    <div className="search-result-right">
                      <span className="search-result-price">{exp.price}</span>
                      <span className="search-result-cta">Book Session →</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="search-empty-state">
                  <div className="search-empty-icon flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <div className="search-empty-title">No experts found matching &ldquo;{modalSearchQuery}&rdquo;</div>
                  <div className="search-empty-hint">Try searching by topic, company, industry, or reset the category filter.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Become an Expert Application Modal */}
      {isExpertModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsExpertModalOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsExpertModalOpen(false)}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="p-8">
              {!expertFormSubmitted ? (
                <>
                  <h3 className="text-2xl font-bold text-[#1a1921] mb-2">
                    Become an Intro Expert
                  </h3>
                  <p className="text-sm text-[#6a6871] mb-6">
                    Share your experience, monetize your free time, and give advice to high-intent entrepreneurs, designers, and builders worldwide.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setExpertFormSubmitted(true);
                    }}
                  >
                    <label className="booking-section-label">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="form-input-field"
                    />

                    <label className="booking-section-label">Your Current Role &amp; Company</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Co-founder @ Acme Corp, VP Design"
                      className="form-input-field"
                    />

                    <label className="booking-section-label">LinkedIn / Website URL</label>
                    <input
                      type="url"
                      required
                      placeholder="https://linkedin.com/in/janedoe"
                      className="form-input-field"
                    />

                    <label className="booking-section-label">Primary Topic / Category</label>
                    <select className="form-input-field bg-white">
                      <option>Career &amp; Business</option>
                      <option>Home Decor &amp; Interior Design</option>
                      <option>Startups &amp; Fundraising</option>
                      <option>Style &amp; Beauty</option>
                      <option>Wellness &amp; Health</option>
                      <option>Engineering &amp; AI</option>
                    </select>

                    <label className="booking-section-label">Target Rate per Session</label>
                    <input
                      type="text"
                      placeholder="Birr 2,500 / 30 mins"
                      className="form-input-field"
                    />

                    <button type="submit" className="btn-confirm-booking mt-2">
                      Submit Expert Application
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="success-check-circle">✓</div>
                  <h3 className="text-2xl font-bold text-[#1a1921] mb-2">
                    Application Received!
                  </h3>
                  <p className="text-[#6a6871] max-w-md mx-auto mb-6">
                    Thank you for applying. Our curation committee reviews applications weekly. We will be in touch via email.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpertModalOpen(false);
                      setExpertFormSubmitted(false);
                    }}
                    className="bg-[#1a1921] text-white px-8 py-3 rounded-full font-semibold"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* App-like Mobile Bottom Navigation Bar */}
      <nav className="mobile-app-bottom-nav" aria-label="Mobile Bottom Navigation">
        <Link href="/" className="mobile-nav-tab active">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="mobile-nav-label">Explore</span>
        </Link>

        <Link href="/experts" className="mobile-nav-tab">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span className="mobile-nav-label">Experts</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            setModalSearchQuery('');
            setIsSearchModalOpen(true);
          }}
          className="mobile-nav-tab"
        >
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="mobile-nav-label">Search</span>
        </button>

        <Link href="/gift" className="mobile-nav-tab">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
          <span className="mobile-nav-label">Gift</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsExpertModalOpen(true)}
          className="mobile-nav-tab"
        >
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="mobile-nav-label">Account</span>
        </button>
      </nav>
    </div>
  );
}
