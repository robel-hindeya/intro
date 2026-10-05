'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ExpertDetailClient({ expert, allExperts }) {
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedDateId, setSelectedDateId] = useState('oct-3');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Oct 3');
  const [selectedTime, setSelectedTime] = useState('2:00 PM');
  const [weekOffset, setWeekOffset] = useState(0);
  const [bookingNotes, setBookingNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Dynamic price calculation
  const getCalculatedPrice = (basePriceStr, minutes) => {
    const base = parseInt(String(basePriceStr).replace(/[^0-9]/g, '')) || 2500;
    if (minutes === 15) return `Birr ${Math.round(base * 0.6).toLocaleString()}`;
    if (minutes === 30) return `Birr ${base.toLocaleString()}`;
    if (minutes === 45) return `Birr ${Math.round(base * 1.4).toLocaleString()}`;
    if (minutes === 60) return `Birr ${Math.round(base * 1.8).toLocaleString()}`;
    return `Birr ${base.toLocaleString()}`;
  };

  // Filter similar experts
  const categoryMatches = allExperts.filter(
    (e) => e.name !== expert.name && e.categories?.some((c) => c !== 'All Experts' && expert.categories?.includes(c))
  );
  const fallbackMatches = allExperts.filter((e) => e.name !== expert.name);
  const similarExperts = (categoryMatches.length >= 3 ? categoryMatches : [...categoryMatches, ...fallbackMatches])
    .filter((v, i, a) => a.findIndex((t) => t.name === v.name) === 0)
    .slice(0, 3);

  const week1Dates = [
    { id: 'oct-3', weekday: 'FRI', label: 'Tomorrow', dayNum: '3', month: 'Oct', slots: 4, available: true },
    { id: 'oct-4', weekday: 'SAT', label: 'Saturday', dayNum: '4', month: 'Oct', slots: 3, available: true },
    { id: 'oct-6', weekday: 'MON', label: 'Monday', dayNum: '6', month: 'Oct', slots: 6, available: true },
    { id: 'oct-7', weekday: 'TUE', label: 'Tuesday', dayNum: '7', month: 'Oct', slots: 5, available: true },
    { id: 'oct-8', weekday: 'WED', label: 'Wednesday', dayNum: '8', month: 'Oct', slots: 4, available: true },
  ];

  const week2Dates = [
    { id: 'oct-9', weekday: 'THU', label: 'Thursday', dayNum: '9', month: 'Oct', slots: 4, available: true },
    { id: 'oct-10', weekday: 'FRI', label: 'Friday', dayNum: '10', month: 'Oct', slots: 3, available: true },
    { id: 'oct-11', weekday: 'SAT', label: 'Saturday', dayNum: '11', month: 'Oct', slots: 2, available: true },
    { id: 'oct-13', weekday: 'MON', label: 'Monday', dayNum: '13', month: 'Oct', slots: 5, available: true },
    { id: 'oct-14', weekday: 'TUE', label: 'Tuesday', dayNum: '14', month: 'Oct', slots: 4, available: true },
  ];

  const currentDates = weekOffset === 0 ? week1Dates : week2Dates;

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '2:00 PM',
    '3:30 PM',
    '5:00 PM',
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="expert-detail-page">
      {/* Header / Nav */}
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
              <Link href="/experts" className="nav-link">
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
            <Link href="/" className="back-link-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Directory</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb Bar */}
      <div className="detail-top-bar">
        <div className="detail-top-container">
          <Link href="/" className="back-link-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>All Experts</span>
            <span className="text-gray-400">/</span>
            <span className="text-[#6a6871]">{expert.categories[0] || 'Expert'}</span>
            <span className="text-gray-400">/</span>
            <span className="font-bold text-[#1a1921]">{expert.name}</span>
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <div className="widget-trust-badge">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Booking Active
            </div>
            <span className="text-sm font-semibold text-[#1a1921]">
              From {getCalculatedPrice(expert.price, 15)} / 15m
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <main className="detail-main-layout">
        {/* Left Column: Comprehensive Profile & Info */}
        <div className="detail-left-col">
          {/* Hero Profile Card */}
          <div className="detail-hero-card">
            <div className="detail-hero-top">
              <div className="detail-avatar-container">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="detail-avatar"
                />
                <div className="detail-online-pulse" title="Online & accepting bookings">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
              </div>

              <div className="detail-hero-info">
                <div className="detail-name-row">
                  <h1 className="detail-expert-name">{expert.name}</h1>
                  {/* Verified checkmark */}
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <div className="detail-rating-pill">
                    ★ {expert.rating}
                    <span className="text-xs text-[#8c591a] font-normal">
                      ({expert.reviewCount || 48} reviews)
                    </span>
                  </div>
                </div>

                <p className="detail-headline">{expert.headline || expert.bio}</p>

                <div className="detail-category-tags">
                  {expert.categories.map((c) => (
                    <span key={c} className="detail-tag-chip">
                      {c}
                    </span>
                  ))}
                  <span className="detail-tag-chip bg-emerald-50 text-emerald-800 border-emerald-200 inline-flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    Fast Responder
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Perks Bar */}
            <div className="detail-perks-bar">
              <div className="detail-perk-item">
                <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                <span>1:1 HD Video Call</span>
              </div>
              <div className="detail-perk-item">
                <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Private &amp; NDA Safe</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="detail-section-card">
            <h2 className="detail-card-title">
              <span>About {expert.name}</span>
            </h2>
            <div className="detail-bio-text">
              {expert.fullBio || expert.bio}
            </div>
          </div>

          {/* Topics & What I Can Help With (Clickable to Add to Agenda) */}
          {expert.topics && expert.topics.length > 0 && (
            <div className="detail-section-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="detail-card-title mb-0">
                  <span>Topics I can help you with</span>
                </h2>
                <span className="text-xs font-semibold text-[#8c8894]">Click to add to agenda</span>
              </div>
              <div className="topics-cloud">
                {expert.topics.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setBookingNotes((prev) => (prev ? `${prev}\n• ${t}` : `• ${t}`));
                      const el = document.getElementById('booking-notes-input');
                      if (el) el.focus();
                    }}
                    title="Click to add topic to booking agenda"
                    className="topic-bubble"
                  >
                    + {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* What to Expect */}
          {expert.whatToExpect && (
            <div className="detail-section-card">
              <h2 className="detail-card-title">
                <span>What to expect in your session</span>
              </h2>
              <div className="expect-list">
                {expert.whatToExpect.map((item, idx) => (
                  <div key={idx} className="expect-item">
                    <div className="expect-bullet">✓</div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          )}



          {/* Client Reviews for this expert */}
          <div className="detail-section-card">
            <div className="client-reviews-header">
              <h2 className="detail-card-title m-0">Client Reviews</h2>
              <div className="client-reviews-rating-pill">
                <span className="client-reviews-star-icon">★</span>
                <span className="client-reviews-score">5.0</span>
                <span className="client-reviews-label">Average Rating</span>
              </div>
            </div>

            {/* Individual Reviews Stack */}
            <div className="client-reviews-list">
              {/* Review 1 */}
              <div className="client-review-card">
                <div className="client-review-top-bar">
                  <div className="client-review-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <div className="client-review-badge">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified Consultation</span>
                  </div>
                </div>

                <p className="client-review-text">
                  &ldquo;This call was a turning point for our startup. {expert.name || 'Neil Parikh'} got straight to the meat of our bottlenecks within the first 10 minutes and provided a roadmap we are executing on today.&rdquo;
                </p>

                <div className="client-review-author">
                  <div className="client-review-avatar avatar-mc">MC</div>
                  <div className="client-review-author-info">
                    <div className="client-review-author-name">Marcus Chen</div>
                    <div className="client-review-author-role">Founder &amp; CEO</div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="client-review-card">
                <div className="client-review-top-bar">
                  <div className="client-review-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <div className="client-review-badge">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified Consultation</span>
                  </div>
                </div>

                <p className="client-review-text">
                  &ldquo;100% worth every dollar. Having an hour of uninterrupted direct feedback from an industry leader at this caliber saved us months of trial and error.&rdquo;
                </p>

                <div className="client-review-author">
                  <div className="client-review-avatar avatar-sj">SJ</div>
                  <div className="client-review-author-info">
                    <div className="client-review-author-name">Sarah Jenkins</div>
                    <div className="client-review-author-role">VP of Growth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          {expert.faq && expert.faq.length > 0 && (
            <div className="detail-section-card">
              <h2 className="detail-card-title">
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="faq-accordion">
                {expert.faq.map((item, idx) => (
                  <div key={idx} className="faq-item">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                      className="faq-trigger"
                    >
                      <span>{item.q}</span>
                      <span className="text-lg font-bold">
                        {openFaqIndex === idx ? '−' : '+'}
                      </span>
                    </button>
                    {openFaqIndex === idx && (
                      <div className="faq-answer">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}


        </div>

        {/* Right Column: Sticky Booking Widget */}
        <aside className="detail-right-col">
          <div className="booking-widget-card" id="booking-card">
            {!bookingSuccess ? (
              <>
                <div className="booking-widget-price-row">
                  <div>
                    <span className="booking-widget-price">
                      {getCalculatedPrice(expert.price, selectedDuration)}
                    </span>
                    <span className="booking-widget-price-tag">
                      {' '}/ {selectedDuration} min
                    </span>
                  </div>
                  <div className="widget-trust-badge">
                    <span>✓</span> Instant Book
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit}>
                  {/* Select Duration */}
                  <div className="booking-step-header">
                    <label className="booking-section-label m-0">1. Select Duration</label>
                    <span className="booking-duration-hint">1-on-1 HD Video</span>
                  </div>

                  <div className="duration-selector">
                    {[
                      { mins: 15, label: '15 min', tag: null },
                      { mins: 30, label: '30 min', tag: 'Popular' },
                      { mins: 45, label: '45 min', tag: null },
                      { mins: 60, label: '60 min', tag: 'Deep Dive' },
                    ].map((opt) => {
                      const isSelected = selectedDuration === opt.mins;
                      return (
                        <button
                          key={opt.mins}
                          type="button"
                          onClick={() => setSelectedDuration(opt.mins)}
                          className={`duration-option ${isSelected ? 'active' : ''}`}
                        >
                          {opt.tag && (
                            <span className={`duration-badge ${opt.tag === 'Popular' ? 'badge-popular' : 'badge-deep'}`}>
                              {opt.tag}
                            </span>
                          )}
                          <span className="duration-time">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Select Date */}
                  <div className="booking-step-header">
                    <label className="booking-section-label m-0">2. Select Date</label>
                    <div className="date-selector-month-tag">
                      <span className="date-month-text">
                        {weekOffset === 0 ? 'Oct 3 – Oct 8' : 'Oct 9 – Oct 14'}
                      </span>
                      <div className="date-nav-arrows">
                        <button
                          type="button"
                          className="date-nav-btn"
                          onClick={() => setWeekOffset(0)}
                          disabled={weekOffset === 0}
                          aria-label="Previous week"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="date-nav-btn"
                          onClick={() => setWeekOffset(1)}
                          disabled={weekOffset === 1}
                          aria-label="Next week"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="date-cards-strip">
                    {currentDates.map((d) => {
                      const isSelected = selectedDateId === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setSelectedDateId(d.id);
                            setSelectedDate(`${d.label}, ${d.month} ${d.dayNum}`);
                          }}
                          className={`date-card-item ${isSelected ? 'active' : ''}`}
                        >
                          <span className="date-card-weekday">{d.weekday}</span>
                          <span className="date-card-num">{d.dayNum}</span>
                          <span className="date-card-month">{d.month}</span>
                          <span className="date-card-indicator" title={`${d.slots} slots available`}></span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="date-selection-status-bar">
                    <div className="date-selected-preview">
                      <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{selectedDate}</span>
                    </div>
                    <span className="date-tz-pill">EDT (UTC-4)</span>
                  </div>

                  {/* Select Time */}
                  <label className="booking-section-label">3. Select Time</label>
                  <div className="time-slots-grid">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`time-slot-btn ${selectedTime === t ? 'active' : ''}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Client Name */}
                  <label className="booking-section-label">4. Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="form-input-field"
                  />

                  {/* Client Email */}
                  <label className="booking-section-label">5. Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="form-input-field"
                  />

                  {/* Agenda / Questions */}
                  <label className="booking-section-label">6. Topic / Questions for {expert.name}</label>
                  <textarea
                    id="booking-notes-input"
                    required
                    placeholder="Describe what you'd like advice on, or click any topic or question above to fill..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="form-input-field form-textarea min-h-[90px]"
                  />

                  <button type="submit" className="btn-confirm-booking">
                    Book Now
                  </button>
                </form>

                <div className="widget-guarantees-footer">
                  <div className="widget-guarantee-line">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <polyline points="9 12 11 14 15 10"></polyline>
                    </svg>
                    <span><strong>Intro Money Back Guarantee:</strong> Full refund if not satisfied.</span>
                  </div>
                  <div className="widget-guarantee-line">
                    <svg className="w-4 h-4 text-[#6a6871] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <polyline points="1 20 1 14 7 14"></polyline>
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                    </svg>
                    <span>Free rescheduling up to 48 hours before call.</span>
                  </div>
                  <div className="widget-guarantee-line">
                    <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                    <span>Private 1:1 HD link with automatic calendar sync.</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="booking-success-box">
                <div className="success-check-circle">✓</div>
                <h3 className="text-2xl font-bold text-[#1a1921] mb-2">
                  Session Confirmed!
                </h3>
                <p className="text-[#6a6871] text-sm mb-4">
                  You are scheduled with <strong>{expert.name}</strong> for a {selectedDuration}-minute video session.
                </p>

                <div className="p-4 bg-[#f8f5ee] rounded-xl text-xs text-left text-[#4b4852] space-y-2 mb-6">
                  <div><strong>Date:</strong> {selectedDate}</div>
                  <div><strong>Time:</strong> {selectedTime} (EST)</div>
                  <div><strong>Attendee:</strong> {clientName || 'Guest'} ({clientEmail})</div>
                  <div><strong>Price Paid:</strong> {getCalculatedPrice(expert.price, selectedDuration)}</div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=1:1+Consultation+with+${encodeURIComponent(expert.name)}&details=Private+video+session+via+Intro.co`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#1a1921] text-white py-3 rounded-xl text-sm font-semibold hover:bg-neutral-800 transition"
                  >
                    Add to Google Calendar
                  </a>
                  <button
                    type="button"
                    onClick={() => setBookingSuccess(false)}
                    className="block w-full text-center bg-gray-100 text-[#1a1921] py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>

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
                Book Africa’s most in-demand experts &amp; get advice over a video call.
              </p>
            </div>
            <div className="footer-links-grid">
              <div>
                <h4 className="footer-col-title">Navigation</h4>
                <ul className="footer-col-links">
                  <li className="footer-link-item"><Link href="/">Home Directory</Link></li>
                  <li className="footer-link-item"><Link href="/experts">Browse Experts</Link></li>
                  <li className="footer-link-item"><Link href="/#how-it-works">How Intro Works</Link></li>
                  <li className="footer-link-item"><Link href="/gift">Gift a Session</Link></li>
                  <li className="footer-link-item"><Link href="/#investors">Investors</Link></li>
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

      {/* App-like Mobile Bottom Booking Action Bar */}
      <aside className="mobile-detail-bottom-bar" aria-label="Mobile Booking Actions">
        <div className="mobile-detail-bar-left">
          <Link href="/" className="mobile-detail-home-btn" aria-label="Back to Directory">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="mobile-detail-price-stack">
            <span className="mobile-detail-price">
              {getCalculatedPrice(expert.price, selectedDuration)}
            </span>
            <span className="mobile-detail-meta">
              {selectedDuration} min • ★ {expert.rating || '5.0'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToBooking}
          className="mobile-detail-book-cta"
        >
          Book Now →
        </button>
      </aside>
    </div>
  );
}
