'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

export default function ExpertsClient({ allExperts = [] }) {
  // Filters & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Experts');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Modals state
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [modalCategory, setModalCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [kbdShortcut, setKbdShortcut] = useState('⌘K');

  // Booking Form state inside Modal
  const [bookingDuration, setBookingDuration] = useState(30);
  const [bookingDate, setBookingDate] = useState('Tomorrow');
  const [bookingTime, setBookingTime] = useState('2:00 PM');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Application Modal state
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

  const renderCategoryIcon = (id, isActive) => {
    switch (id) {
      case 'All Experts':
        return (
          <svg className="cat-pill-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
          </svg>
        );
      case 'Top Rated':
        return (
          <svg className="cat-pill-svg" width="15" height="15" viewBox="0 0 24 24" fill={isActive ? '#fde047' : '#f59e0b'} stroke={isActive ? '#fde047' : '#d97706'} strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case 'Startups & VC':
        return (
          <svg className="cat-pill-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
        );
      case 'Career & Business':
        return (
          <svg className="cat-pill-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case 'Home Decor':
        return (
          <svg className="cat-pill-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>
            <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/>
            <path d="M4 18v2"/>
            <path d="M20 18v2"/>
            <path d="M12 4v9"/>
          </svg>
        );
      case 'Style & Beauty':
        return (
          <svg className="cat-pill-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/>
            <path d="M19 4v4"/>
            <path d="M17 6h4"/>
          </svg>
        );
      case 'Wellness & Health':
      case 'Wellness':
        return (
          <svg className="cat-pill-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="4" r="2"/>
            <path d="M12 8v5"/>
            <path d="m7 12 5-2 5 2"/>
            <path d="M5 20l4-4 3 2 3-2 4 4"/>
          </svg>
        );
      case 'Marketing & Growth':
        return (
          <svg className="cat-pill-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        );
      default:
        return null;
    }
  };

  const categories = [
    { id: 'All Experts', label: 'All Experts' },
    { id: 'Top Rated', label: 'Top Rated (5.0 ★)' },
    { id: 'Startups & VC', label: 'Startups & VC' },
    { id: 'Career & Business', label: 'Career & Business' },
    { id: 'Home Decor', label: 'Home Decor' },
    { id: 'Style & Beauty', label: 'Style & Beauty' },
    { id: 'Wellness & Health', label: 'Wellness & Health' },
    { id: 'Marketing & Growth', label: 'Marketing & Growth' },
  ];

  // Helper to extract numeric Birr value from price string
  const parsePrice = (priceStr) => {
    return parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10) || 2500;
  };

  // Filtered & Sorted Experts
  const filteredExperts = useMemo(() => {
    let list = allExperts.filter((exp) => {
      // 1. Category Matching
      let matchesCat = false;
      if (selectedCategory === 'All Experts') {
        matchesCat = true;
      } else if (selectedCategory === 'Top Rated') {
        matchesCat = exp.rating === '5.0' || (exp.id && exp.id <= 15);
      } else if (selectedCategory === 'Startups & VC') {
        matchesCat =
          (exp.headline && /startup|vc|investor|founder/i.test(exp.headline)) ||
          (exp.bio && /startup|vc|investor|founder/i.test(exp.bio)) ||
          exp.categories.some((c) => /startup|fundraising/i.test(c));
      } else if (selectedCategory === 'Career & Business') {
        matchesCat =
          (exp.headline && /career|business|executive|leadership|management|product|engineering/i.test(exp.headline)) ||
          (exp.bio && /career|business|executive|leadership|management|product|engineering/i.test(exp.bio)) ||
          exp.categories.some((c) => /career|business|leadership/i.test(c));
      } else if (selectedCategory === 'Home Decor') {
        matchesCat =
          (exp.headline && /home|decor|interior|design|architecture/i.test(exp.headline)) ||
          (exp.bio && /home|decor|interior|design|architecture/i.test(exp.bio)) ||
          exp.categories.some((c) => /home|decor|interior/i.test(c));
      } else if (selectedCategory === 'Style & Beauty') {
        matchesCat =
          (exp.headline && /style|beauty|fashion|skincare|cosmetics/i.test(exp.headline)) ||
          (exp.bio && /style|beauty|fashion|skincare|cosmetics/i.test(exp.bio)) ||
          exp.categories.some((c) => /style|beauty|fashion/i.test(c));
      } else if (selectedCategory === 'Wellness & Health' || selectedCategory === 'Wellness') {
        matchesCat =
          (exp.headline && /wellness|health|fitness|nutrition|mindfulness/i.test(exp.headline)) ||
          (exp.bio && /wellness|health|fitness|nutrition|mindfulness/i.test(exp.bio)) ||
          exp.categories.some((c) => /wellness|health/i.test(c));
      } else if (selectedCategory === 'Marketing & Growth') {
        matchesCat =
          (exp.headline && /marketing|growth|brand|dtc/i.test(exp.headline)) ||
          (exp.bio && /marketing|growth|brand|dtc/i.test(exp.bio)) ||
          exp.categories.some((c) => /marketing|growth/i.test(c));
      } else {
        matchesCat = exp.categories.some((c) =>
          c.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      // 2. Search Query Matching
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        exp.name.toLowerCase().includes(q) ||
        exp.bio.toLowerCase().includes(q) ||
        (exp.headline && exp.headline.toLowerCase().includes(q)) ||
        exp.categories.some((c) => c.toLowerCase().includes(q));

      // 3. Price Filter Matching
      const priceNum = parsePrice(exp.price);
      let matchesPrice = true;
      if (priceFilter === 'under-2500') {
        matchesPrice = priceNum <= 2500;
      } else if (priceFilter === '2500-4000') {
        matchesPrice = priceNum >= 2500 && priceNum <= 4000;
      } else if (priceFilter === 'over-4000') {
        matchesPrice = priceNum > 4000;
      }

      return matchesCat && matchesSearch && matchesPrice;
    });

    // 4. Sorting
    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
    } else if (sortBy === 'name-az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [allExperts, selectedCategory, searchQuery, priceFilter, sortBy]);

  // Command Palette global filtered experts
  const modalFilteredExperts = useMemo(() => {
    const q = modalSearchQuery.toLowerCase().trim();
    return allExperts.filter((exp) => {
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
  }, [allExperts, modalSearchQuery, modalCategory]);

  const handleOpenBooking = (expert) => {
    setSelectedExpert(expert);
    setBookingSuccess(false);
    setBookingDuration(30);
    setBookingDate('Tomorrow');
    setBookingTime('2:00 PM');
  };

  const getCalculatedPrice = (basePriceStr, minutes) => {
    const base = parsePrice(basePriceStr);
    if (minutes === 15) return `Birr ${Math.round(base * 0.6).toLocaleString()}`;
    if (minutes === 30) return `Birr ${base.toLocaleString()}`;
    if (minutes === 45) return `Birr ${Math.round(base * 1.4).toLocaleString()}`;
    return `Birr ${Math.round(base * 1.8).toLocaleString()}`;
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Experts');
    setPriceFilter('all');
    setSortBy('featured');
  };

  const isFilteringActive =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All Experts' ||
    priceFilter !== 'all' ||
    sortBy !== 'featured';

  return (
    <div className="experts-page-wrapper">
      {/* Top Header / Site Navigation */}
      <header className="site-nav">
        <div className="nav-container">
          <div className="nav-left">
            <Link href="/" className="nav-logo-link" aria-label="Intro Home">
              <img
                src="https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/61947b3902848eff1d7e6926_intro-white-logo.png"
                alt="Intro Logo"
                className="nav-logo-img"
              />
            </Link>
            <nav className="nav-links">
              <Link href="/experts" className="nav-link active text-white font-semibold">
                Browse Experts
              </Link>
              <Link href="/#how-it-works" className="nav-link">
                How It Works
              </Link>
              <Link href="/gift" className="nav-link">
                Gift a Session
              </Link>
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
              onClick={() => setIsExpertModalOpen(true)}
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

        {/* Mobile dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1e1d24] border-t border-white/10 px-6 py-4 flex flex-col gap-3">
            <Link
              href="/experts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white font-semibold py-2"
            >
              Browse Experts
            </Link>
            <Link
              href="/gift"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#cfccd6] py-2"
            >
              Gift a Session
            </Link>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="experts-directory-main">
        {/* Directory Header Banner */}
        <section className="experts-page-hero">
          <div className="experts-hero-inner">
            <div className="experts-hero-tag">
              <span>✦</span> OVER 400+ VERIFIED INDUSTRY PIONEERS
            </div>
            <h1 className="experts-hero-title">
              Browse &amp; Book World-Class Experts
            </h1>
            <p className="experts-hero-subtitle">
              Book private 1-on-1 video consultations with unicorn founders, design icons, top VCs, and executive coaches.
            </p>

            {/* Prominent In-Page Search Box */}
            <div className="experts-search-bar-wrap">
              <svg className="search-bar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search by name, company (Drybar, Casper, Nextdoor, Wag), topic, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="experts-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="experts-search-clear"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Category Pills Strip - Non-scrolling, wraps downward */}
        <div className="experts-categories-strip">
          <div className="experts-categories-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`experts-cat-pill ${isSelected ? 'active' : ''}`}
                >
                  <span className="cat-pill-icon">
                    {renderCategoryIcon(cat.id, isSelected)}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="experts-toolbar-bar">
          <div className="experts-count-meta">
            <span className="experts-count-number">{filteredExperts.length}</span>
            <span className="experts-count-label">Experts available to book</span>
            {isFilteringActive && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="reset-filters-pill-btn"
              >
                Reset Filters ✕
              </button>
            )}
          </div>

          <div className="experts-toolbar-controls">
            {/* Price Filter */}
            <div className="filter-select-wrap">
              <label htmlFor="price-filter" className="filter-select-label">Price:</label>
              <select
                id="price-filter"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="toolbar-select-dropdown"
              >
                <option value="all">All Rates</option>
                <option value="under-2500">Under Birr 2,500</option>
                <option value="2500-4000">Birr 2,500 – 4,000</option>
                <option value="over-4000">Birr 4,000+</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="filter-select-wrap">
              <label htmlFor="sort-filter" className="filter-select-label">Sort:</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="toolbar-select-dropdown"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated (★ 5.0)</option>
                <option value="name-az">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                aria-label="Grid view"
                title="Grid view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                aria-label="List view"
                title="List view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Directory Results Container */}
        {filteredExperts.length > 0 ? (
          viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="experts-grid-layout">
              {filteredExperts.map((expert) => (
                <div key={expert.id || expert.name} className="expert-dir-card">
                  <Link href={`/expert/${expert.slug || expert.id}`} className="expert-card-top-link">
                    <div className="expert-dir-img-wrap">
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="expert-dir-img"
                        loading="lazy"
                      />
                      <span className="expert-dir-rating-pill">
                        ★ {expert.rating || '5.0'}
                      </span>
                    </div>

                    <div className="expert-dir-body">
                      <div className="expert-dir-name-row">
                        <h3 className="expert-dir-name">{expert.name}</h3>
                        <svg className="expert-dir-check" viewBox="0 0 24 24" fill="#2563eb">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>

                      <p className="expert-dir-headline">
                        {expert.headline || expert.bio}
                      </p>

                      <div className="expert-dir-tags">
                        {(expert.categories || []).slice(0, 2).map((cat, idx) => (
                          <span key={idx} className="dir-tag-chip">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>

                  <div className="expert-dir-footer">
                    <div className="expert-dir-price-stack">
                      <span className="expert-dir-price">{expert.price}</span>
                      <span className="expert-dir-session">/ session</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenBooking(expert)}
                      className="expert-dir-book-btn"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="experts-list-layout">
              {filteredExperts.map((expert) => (
                <div key={expert.id || expert.name} className="expert-list-row">
                  <Link href={`/expert/${expert.slug || expert.id}`} className="expert-list-left-link">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="expert-list-avatar"
                      loading="lazy"
                    />
                    <div className="expert-list-details">
                      <div className="expert-list-title-row">
                        <span className="expert-list-name">{expert.name}</span>
                        <svg className="expert-dir-check" viewBox="0 0 24 24" fill="#2563eb">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span className="expert-list-rating-badge">★ {expert.rating || '5.0'}</span>
                      </div>
                      <p className="expert-list-bio">{expert.headline || expert.bio}</p>
                      <div className="expert-list-chips">
                        {(expert.categories || []).slice(0, 3).map((c, i) => (
                          <span key={i} className="dir-tag-chip">{c}</span>
                        ))}
                      </div>
                    </div>
                  </Link>

                  <div className="expert-list-right">
                    <div className="expert-list-price-wrap">
                      <span className="expert-list-price">{expert.price}</span>
                      <span className="expert-list-unit">per session</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(expert)}
                      className="expert-dir-book-btn"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="experts-empty-state">
            <div className="empty-icon flex items-center justify-center">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3 className="empty-title">No experts match your filters</h3>
            <p className="empty-sub">
              Try adjusting your search query, selecting &ldquo;All Experts&rdquo;, or resetting your filters.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="empty-reset-cta"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* QUICK BOOKING MODAL */}
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
                        <svg className="w-5 h-5 ml-1 inline" viewBox="0 0 24 24" fill="#2563eb">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </h3>
                      <p>{selectedExpert.headline || selectedExpert.bio}</p>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingSuccess(true);
                    }}
                  >
                    {/* Duration Selection */}
                    <label className="booking-section-label">1. Select Duration</label>
                    <div className="duration-selector">
                      {[15, 30, 45, 60].map((mins) => (
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
                    <label className="booking-section-label">2. Select Day</label>
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
                    <label className="booking-section-label">3. Available Times (EST)</label>
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
                <div className="booking-success-box text-center py-6">
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

      {/* COMMAND PALETTE / SEARCH MODAL */}
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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

      {/* BECOME AN EXPERT MODAL */}
      {isExpertModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsExpertModalOpen(false)}
        >
          <div
            className="modal-content expert-apply-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsExpertModalOpen(false)}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {!expertFormSubmitted ? (
              <div className="expert-modal-inner">
                {/* Header */}
                <div className="expert-modal-header">
                  <div className="expert-modal-pill">
                    <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>JOIN THE ROSTER</span>
                  </div>
                  <h2 className="expert-modal-title">
                    Become an Intro Expert
                  </h2>
                  <p className="expert-modal-desc">
                    Share your experience, monetize your free time, and give 1-on-1 advice to high-intent entrepreneurs, designers, and builders worldwide.
                  </p>

                  {/* Trust / Perks */}
                  <div className="expert-modal-perks">
                    <div className="expert-perk-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>100% Free to Apply</span>
                    </div>
                    <div className="expert-perk-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Set Your Own Rates</span>
                    </div>
                    <div className="expert-perk-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Keep Full Control of Calendar</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form
                  className="expert-modal-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setExpertFormSubmitted(true);
                  }}
                >
                  <div className="expert-form-grid">
                    {/* Full Name */}
                    <div className="expert-form-group">
                      <label className="expert-field-label">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="expert-input-wrap">
                        <svg className="expert-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input
                          type="text"
                          required
                          placeholder="Jane Doe"
                          className="expert-input-field"
                        />
                      </div>
                    </div>

                    {/* Work Email */}
                    <div className="expert-form-group">
                      <label className="expert-field-label">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <div className="expert-input-wrap">
                        <svg className="expert-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <input
                          type="email"
                          required
                          placeholder="jane@company.com"
                          className="expert-input-field"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="expert-form-grid">
                    {/* Role & Company */}
                    <div className="expert-form-group">
                      <label className="expert-field-label">
                        Current Role &amp; Company <span className="text-red-500">*</span>
                      </label>
                      <div className="expert-input-wrap">
                        <svg className="expert-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Co-founder @ Acme Corp, VP Design"
                          className="expert-input-field"
                        />
                      </div>
                    </div>

                    {/* LinkedIn / Website URL */}
                    <div className="expert-form-group">
                      <label className="expert-field-label">
                        LinkedIn / Portfolio URL <span className="text-red-500">*</span>
                      </label>
                      <div className="expert-input-wrap">
                        <svg className="expert-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        <input
                          type="url"
                          required
                          placeholder="https://linkedin.com/in/janedoe"
                          className="expert-input-field"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="expert-form-grid">
                    {/* Primary Topic / Category */}
                    <div className="expert-form-group">
                      <label className="expert-field-label">
                        Primary Topic / Category <span className="text-red-500">*</span>
                      </label>
                      <div className="expert-input-wrap">
                        <svg className="expert-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                          <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                        <select className="expert-select-field" defaultValue="Career & Business">
                          <option value="Career & Business">Career &amp; Business</option>
                          <option value="Startups & Fundraising">Startups &amp; Fundraising</option>
                          <option value="Home Decor & Interior Design">Home Decor &amp; Interior Design</option>
                          <option value="Style & Beauty">Style &amp; Beauty</option>
                          <option value="Engineering & AI">Engineering &amp; AI</option>
                          <option value="Wellness & Health">Wellness &amp; Health</option>
                        </select>
                        <svg className="expert-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>

                    {/* Target Rate */}
                    <div className="expert-form-group">
                      <label className="expert-field-label">
                        Target Rate per Session (Birr)
                      </label>
                      <div className="expert-input-wrap">
                        <svg className="expert-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6v12M15 9.5c0-1.38-1.34-2.5-3-2.5s-3 1.12-3 2.5 1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5-3-1.12-3-2.5"></path>
                        </svg>
                        <input
                          type="text"
                          placeholder="Birr 2,500 / 30 mins"
                          className="expert-input-field"
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="expert-submit-btn">
                    <span>Submit Expert Application</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>

                  <p className="expert-trust-note">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Applications reviewed weekly by curation committee. No commitment.</span>
                  </p>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="expert-modal-success">
                <div className="expert-success-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="expert-success-badge">APPLICATION RECEIVED</div>
                <h3 className="expert-success-title">
                  Thank You for Applying!
                </h3>
                <p className="expert-success-desc">
                  Our curation committee reviews applications on a rolling weekly basis. If your profile matches our community standards, you will receive an invitation link via email to complete your verified onboarding.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsExpertModalOpen(false);
                    setExpertFormSubmitted(false);
                  }}
                  className="expert-success-btn"
                >
                  Return to Intro
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Site Footer */}
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
                Book Africa’s most in-demand experts &amp; get advice over a video call.
              </p>
            </div>
            <div className="footer-links-grid">
              <div>
                <h4 className="footer-col-title">Navigation</h4>
                <ul className="footer-col-links">
                  <li className="footer-link-item"><Link href="/">Home</Link></li>
                  <li className="footer-link-item"><Link href="/experts">Browse Experts</Link></li>
                  <li className="footer-link-item"><Link href="/gift">Gift a Session</Link></li>
                  <li className="footer-link-item"><Link href="/#how-it-works">How Intro Works</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-col-title">Legal &amp; Support</h4>
                <ul className="footer-col-links">
                  <li className="footer-link-item"><a href="mailto:hi@intro.co">Contact hi@intro.co</a></li>
                  <li className="footer-link-item"><a href="#privacy">Privacy Policy</a></li>
                  <li className="footer-link-item"><a href="#terms">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">INTRO 2026. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {/* Mobile App Bottom Navbar */}
      <nav className="mobile-app-bottom-nav" aria-label="Mobile Navigation">
        <Link href="/" className="mobile-nav-tab">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="mobile-nav-label">Explore</span>
        </Link>

        <Link href="/experts" className="mobile-nav-tab active">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="mobile-nav-label">Search</span>
        </button>

        <Link href="/gift" className="mobile-nav-tab">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
          <span className="mobile-nav-label">Gift</span>
        </Link>
      </nav>
    </div>
  );
}
