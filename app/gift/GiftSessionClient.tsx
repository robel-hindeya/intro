'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function GiftSessionClient({ featuredExperts = [], allExperts = [] }) {
  // Preset Amounts in Birr
  const presetAmounts = [
    { value: 1500, label: 'Birr 1,500', desc: '15-min call', tag: null },
    { value: 2500, label: 'Birr 2,500', desc: '30-min call', tag: 'Most Popular' },
    { value: 5000, label: 'Birr 5,000', desc: '45-min deep dive', tag: 'Popular' },
    { value: 10000, label: 'Birr 10,000', desc: 'Executive session', tag: 'VIP' },
  ];

  const [selectedAmount, setSelectedAmount] = useState(2500);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customAmountValue, setCustomAmountValue] = useState('3500');

  // Themes
  const themes = [
    {
      id: 'midnight',
      name: 'Midnight Gold',
      bgClass: 'theme-midnight-gold',
      accentColor: '#fbbf24',
      badge: 'Gold Foil',
    },
    {
      id: 'rose',
      name: 'Obsidian Rose',
      bgClass: 'theme-obsidian-rose',
      accentColor: '#f472b6',
      badge: 'Rose Gold',
    },
    {
      id: 'sapphire',
      name: 'Royal Sapphire',
      bgClass: 'theme-royal-sapphire',
      accentColor: '#60a5fa',
      badge: 'Sapphire',
    },
    {
      id: 'emerald',
      name: 'Emerald Prestige',
      bgClass: 'theme-emerald-prestige',
      accentColor: '#34d399',
      badge: 'Emerald',
    },
  ];

  const [cardTheme, setCardTheme] = useState('midnight');
  const [isFlipped, setIsFlipped] = useState(false);

  // Form Details
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState(
    "Happy Birthday! Pick any founder, designer, or mentor on Intro you've always wanted to learn from!"
  );
  const [deliveryOption, setDeliveryOption] = useState('instant');
  const [scheduledDate, setScheduledDate] = useState('2026-10-15');

  // Checkout & Modal State
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Computed Current Amount
  const currentAmount = isCustomAmount
    ? parseInt(customAmountValue, 10) || 1000
    : selectedAmount;

  const currentThemeObj = themes.find((t) => t.id === cardTheme) || themes[0];

  // Quick message presets
  const messageSuggestions = [
    'Happy Birthday! Pick any founder on Intro you want to learn from!',
    'Congrats on launching your startup! Get direct advice from a top founder.',
    'A little inspiration for your next big venture. Enjoy the session!',
    'Best of luck with your career growth. Learn from the world’s best!',
  ];

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    setIsOrderComplete(true);
  };

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText('INTRO-GIFT-8942-2026');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText('https://intro.co/redeem?code=INTRO-GIFT-8942-2026');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const faqItems = [
    {
      q: 'Do Intro gift cards expire?',
      a: 'Never. Intro gift cards have no expiration date and have zero hidden maintenance fees. Your recipient can redeem whenever they are ready.',
    },
    {
      q: 'Can the recipient choose any expert on the platform?',
      a: 'Yes! Intro gift cards are universal credits that can be applied to any of our 400+ vetted founders, CEOs, designers, and creators.',
    },
    {
      q: 'What if an expert session costs more or less than the gift amount?',
      a: 'If a session costs less, the remaining Birr balance stays safely in their Intro wallet for future bookings. If it costs more, they simply cover the remaining difference at checkout.',
    },
    {
      q: 'How does digital delivery work?',
      a: 'We send a luxury animated digital gift card directly to your recipient’s email address with your personalized message and redemption instructions, either immediately or on the scheduled date you choose.',
    },
    {
      q: 'Can I print the gift card to give in person?',
      a: 'Absolutely! After ordering, you will immediately receive a printable high-resolution PDF voucher you can slip into an envelope or greeting card.',
    },
  ];

  return (
    <div className="gift-page-wrapper">
      {/* Top Header / Navigation */}
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
              <Link href="/gift" className="nav-link active font-semibold text-white">
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
              <span>Explore Directory</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="gift-main-content">
        {/* Hero Section */}
        <section className="gift-hero-banner">
          <div className="gift-hero-pill">
            <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
            </svg>
            <span>THE MOST IMPACTFUL GIFT</span>
          </div>
          <h1 className="gift-hero-h1">
            Gift a 1-on-1 Video Session with World Leaders
          </h1>
          <p className="gift-hero-p">
            Give direct, private access to legendary founders, top venture capitalists, and iconic creators.
            Delivered instantly via email or scheduled for any celebration.
          </p>
        </section>

        {/* 2-Column Experience: Live 3D Card Preview (Left) & Customizer Form (Right) */}
        <div className="gift-builder-layout">
          {/* LEFT: Live Interactive Card Preview */}
          <div className="gift-preview-col">
            <div className="gift-sticky-card-box">
              <div className="gift-preview-header">
                <span className="gift-preview-label">LIVE CARD PREVIEW</span>
                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="gift-flip-btn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                  </svg>
                  <span>{isFlipped ? 'Show Front' : 'Flip to Back'}</span>
                </button>
              </div>

              {/* 3D Flip Card Container */}
              <div className={`gift-card-3d-wrap ${isFlipped ? 'flipped' : ''}`}>
                {/* Front of Card */}
                <div className={`gift-card-face gift-card-front ${currentThemeObj.bgClass}`}>
                  <div className="card-shine-effect"></div>

                  <div className="card-front-top">
                    <div className="card-brand-mark">
                      <span className="card-logo-text">intro</span>
                      <span className="card-pass-tag">GIFT PASS</span>
                    </div>
                    <div className="card-chip-badge">
                      <svg width="28" height="22" viewBox="0 0 32 24" fill="none">
                        <rect x="1" y="1" width="30" height="22" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                        <line x1="1" y1="12" x2="31" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                        <line x1="12" y1="1" x2="12" y2="23" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                        <line x1="20" y1="1" x2="20" y2="23" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>

                  <div className="card-front-middle">
                    <div className="card-amount-label">VALUE AMOUNT</div>
                    <div className="card-amount-value">
                      Birr {currentAmount.toLocaleString()}
                    </div>
                    <div className="card-consult-tag">
                      1-ON-1 PRIVATE VIDEO CONSULTATION
                    </div>
                  </div>

                  <div className="card-front-bottom">
                    <div className="card-meta-block">
                      <span className="card-meta-title">FOR</span>
                      <span className="card-meta-name">
                        {recipientName.trim() || 'Lucky Recipient'}
                      </span>
                    </div>

                    <div className="card-meta-block text-right">
                      <span className="card-meta-title">FROM</span>
                      <span className="card-meta-name">
                        {senderName.trim() || 'Your Name'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className={`gift-card-face gift-card-back ${currentThemeObj.bgClass}`}>
                  <div className="card-magnetic-stripe"></div>

                  <div className="card-back-body">
                    <div className="card-signature-bar">
                      <span className="card-code-text">INTRO-GIFT-8942-2026</span>
                      <span className="card-security-badge">VERIFIED PASS</span>
                    </div>

                    <div className="card-personal-note-box">
                      <span className="card-note-label">PERSONAL MESSAGE</span>
                      <p className="card-note-text">
                        &ldquo;{giftMessage.trim() || 'Enjoy your 1-on-1 session with an industry pioneer on Intro!'}&rdquo;
                      </p>
                    </div>

                    <div className="card-back-footer">
                      <span>Redeemable across 400+ verified experts</span>
                      <span>Never Expires • intro.co</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Picker Under Preview */}
              <div className="gift-theme-selector-box">
                <span className="gift-theme-title">SELECT CARD DESIGN THEME</span>
                <div className="gift-theme-buttons">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCardTheme(t.id)}
                      className={`gift-theme-btn ${cardTheme === t.id ? 'active' : ''}`}
                    >
                      <span
                        className="theme-btn-swatch"
                        style={{ backgroundColor: t.accentColor }}
                      ></span>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Callouts */}
              <div className="gift-trust-list">
                <div className="gift-trust-item">
                  <span className="trust-check">✓</span>
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <div className="gift-trust-item">
                  <span className="trust-check">✓</span>
                  <span>Valid for all 400+ verified mentors</span>
                </div>
                <div className="gift-trust-item">
                  <span className="trust-check">✓</span>
                  <span>No expiration date &amp; instant delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Customizer & Purchase Form */}
          <div className="gift-form-col">
            <form onSubmit={handlePurchaseSubmit} className="gift-card-form">
              {/* Step 1: Select Amount */}
              <div className="gift-form-step">
                <div className="gift-step-header">
                  <span className="gift-step-num">1</span>
                  <div>
                    <h2 className="gift-step-title">Select Gift Amount (Birr)</h2>
                    <p className="gift-step-sub">Choose a session tier or enter a custom amount</p>
                  </div>
                </div>

                <div className="gift-amounts-grid">
                  {presetAmounts.map((opt) => {
                    const isSelected = !isCustomAmount && selectedAmount === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(opt.value);
                          setIsCustomAmount(false);
                        }}
                        className={`gift-amount-card ${isSelected ? 'active' : ''}`}
                      >
                        {opt.tag && (
                          <span className="gift-amount-badge">{opt.tag}</span>
                        )}
                        <span className="gift-amount-main">{opt.label}</span>
                        <span className="gift-amount-desc">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Toggle */}
                <div className="gift-custom-amount-row">
                  <button
                    type="button"
                    onClick={() => setIsCustomAmount(!isCustomAmount)}
                    className={`gift-custom-toggle-btn ${isCustomAmount ? 'active' : ''}`}
                  >
                    Custom Amount
                  </button>

                  {isCustomAmount && (
                    <div className="gift-custom-input-wrap">
                      <span className="gift-custom-prefix">Birr</span>
                      <input
                        type="number"
                        min="500"
                        step="100"
                        value={customAmountValue}
                        onChange={(e) => setCustomAmountValue(e.target.value)}
                        placeholder="e.g. 3500"
                        className="gift-custom-input"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Recipient Details */}
              <div className="gift-form-step">
                <div className="gift-step-header">
                  <span className="gift-step-num">2</span>
                  <div>
                    <h2 className="gift-step-title">Recipient Information</h2>
                    <p className="gift-step-sub">Who are you surprising with this session?</p>
                  </div>
                </div>

                <div className="gift-fields-2col">
                  <div>
                    <label className="gift-field-label">Recipient Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="gift-text-input"
                    />
                  </div>

                  <div>
                    <label className="gift-field-label">Recipient Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="gift-text-input"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Personalized Gift Message */}
              <div className="gift-form-step">
                <div className="gift-step-header">
                  <span className="gift-step-num">3</span>
                  <div>
                    <h2 className="gift-step-title">Personal Note</h2>
                    <p className="gift-step-sub">This will appear on their digital gift pass</p>
                  </div>
                </div>

                <div className="gift-message-suggestions">
                  <span className="suggestion-label">Suggested notes:</span>
                  <div className="suggestion-pills">
                    {messageSuggestions.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGiftMessage(s)}
                        className="suggestion-chip"
                      >
                        {s.slice(0, 32)}...
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  required
                  rows={3}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="gift-textarea"
                  placeholder="Write something heartfelt or motivational..."
                ></textarea>
                <div className="gift-char-counter">{giftMessage.length}/250 characters</div>
              </div>

              {/* Step 4: Sender Info & Delivery */}
              <div className="gift-form-step">
                <div className="gift-step-header">
                  <span className="gift-step-num">4</span>
                  <div>
                    <h2 className="gift-step-title">Sender &amp; Delivery Option</h2>
                    <p className="gift-step-sub">Tell them who this thoughtful gift came from</p>
                  </div>
                </div>

                <div className="gift-fields-2col mb-4">
                  <div>
                    <label className="gift-field-label">Your Name (Sender)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="gift-text-input"
                    />
                  </div>

                  <div>
                    <label className="gift-field-label">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="gift-text-input"
                    />
                  </div>
                </div>

                <div className="gift-delivery-options">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('instant')}
                    className={`delivery-option-btn ${deliveryOption === 'instant' ? 'active' : ''}`}
                  >
                    <span className="delivery-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </span>
                    <div className="text-left">
                      <div className="font-bold text-sm">Deliver Instantly</div>
                      <div className="text-xs text-gray-500">Sent immediately upon checkout</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryOption('scheduled')}
                    className={`delivery-option-btn ${deliveryOption === 'scheduled' ? 'active' : ''}`}
                  >
                    <span className="delivery-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </span>
                    <div className="text-left">
                      <div className="font-bold text-sm">Schedule for Later</div>
                      <div className="text-xs text-gray-500">Pick a specific date/holiday</div>
                    </div>
                  </button>
                </div>

                {deliveryOption === 'scheduled' && (
                  <div className="mt-3">
                    <label className="gift-field-label">Delivery Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="gift-text-input"
                    />
                  </div>
                )}
              </div>

              {/* Checkout Action Button */}
              <div className="gift-checkout-action-box">
                <div className="gift-price-summary">
                  <div>
                    <span className="gift-summary-label">Total Payment</span>
                    <span className="gift-summary-sub">No taxes or platform fees</span>
                  </div>
                  <div className="gift-summary-amount">
                    Birr {currentAmount.toLocaleString()}
                  </div>
                </div>

                <button type="submit" className="gift-purchase-cta">
                  Purchase Gift Card • Birr {currentAmount.toLocaleString()} →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* How Gifting Works Section */}
        <section className="gift-how-section">
          <div className="gift-how-header">
            <span className="gift-how-pill">SIMPLE 3-STEP PROCESS</span>
            <h2 className="gift-how-h2">How Intro Gifting Works</h2>
          </div>

          <div className="gift-steps-grid">
            <div className="gift-step-card">
              <div className="gift-step-badge">01</div>
              <h3 className="gift-step-card-title">You Send the Pass</h3>
              <p className="gift-step-card-desc">
                Choose any Birr amount and customize with a personal message. Delivered via email or printed as a luxury voucher.
              </p>
            </div>

            <div className="gift-step-card">
              <div className="gift-step-badge">02</div>
              <h3 className="gift-step-card-title">They Choose Any Leader</h3>
              <p className="gift-step-card-desc">
                Your recipient explores 400+ top founders, executives, interior designers, and coaches to find their dream mentor.
              </p>
            </div>

            <div className="gift-step-card">
              <div className="gift-step-badge">03</div>
              <h3 className="gift-step-card-title">Transformative 1-on-1 Call</h3>
              <p className="gift-step-card-desc">
                They book a date, hop on an HD video consultation, and get tailored advice that accelerates their venture or life.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Experts Preview */}
        <section className="gift-experts-showcase">
          <div className="gift-showcase-header">
            <div>
              <h2 className="gift-showcase-title">Experts They Can Book With This Gift</h2>
              <p className="gift-showcase-sub">
                Over 400+ verified world-class leaders are ready for 1-on-1 consultations
              </p>
            </div>
            <Link href="/experts" className="gift-browse-all-btn">
              Browse All 400+ Experts →
            </Link>
          </div>

          <div className="gift-experts-grid">
            {featuredExperts.map((exp) => (
              <Link
                key={exp.id || exp.name}
                href={`/expert/${exp.slug || exp.id}`}
                className="gift-expert-card"
              >
                <div className="gift-expert-avatar-wrap">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    className="gift-expert-avatar"
                  />
                  <div className="gift-expert-rating">★ {exp.rating || '5.0'}</div>
                </div>
                <div className="gift-expert-info">
                  <div className="gift-expert-name">{exp.name}</div>
                  <div className="gift-expert-headline">{exp.headline || exp.bio}</div>
                  <div className="gift-expert-rate">{exp.price} • Session</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="gift-faq-section">
          <div className="gift-faq-header">
            <span className="gift-how-pill">QUESTIONS &amp; ANSWERS</span>
            <h2 className="gift-faq-h2">Frequently Asked Gifting Questions</h2>
          </div>

          <div className="gift-faq-accordion">
            {faqItems.map((item, idx) => (
              <div key={idx} className="gift-faq-item">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                  className="gift-faq-trigger"
                >
                  <span>{item.q}</span>
                  <span className="gift-faq-icon">{openFaqIndex === idx ? '−' : '+'}</span>
                </button>
                {openFaqIndex === idx && (
                  <div className="gift-faq-answer">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* SUCCESS MODAL: Order Complete / Voucher Code */}
      {isOrderComplete && (
        <div className="modal-overlay" onClick={() => setIsOrderComplete(false)}>
          <div className="modal-content gift-success-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsOrderComplete(false)}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="gift-success-body">
              <div className="gift-success-badge inline-flex items-center justify-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
                <span>GIFT CARD ISSUED</span>
              </div>
              <h2 className="gift-success-title">Your Gift Is Ready!</h2>
              <p className="gift-success-sub">
                A digital pass of <strong>Birr {currentAmount.toLocaleString()}</strong> has been generated for <strong>{recipientName || 'your recipient'}</strong>.
              </p>

              {/* Code Box */}
              <div className="gift-voucher-box">
                <div className="voucher-code-label">OFFICIAL REDEMPTION CODE</div>
                <div className="voucher-code-string">INTRO-GIFT-8942-2026</div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="voucher-copy-btn"
                >
                  {copiedCode ? '✓ Copied to Clipboard!' : 'Copy Code'}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="gift-success-actions">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="gift-modal-action-btn secondary"
                >
                  {copiedLink ? '✓ Share Link Copied!' : 'Copy Shareable Link'}
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="gift-modal-action-btn outline"
                >
                  Print PDF Voucher
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4 text-center">
                <Link
                  href="/experts"
                  className="gift-modal-primary-btn"
                  onClick={() => setIsOrderComplete(false)}
                >
                  Browse Experts to Redeem →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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

        <Link href="/experts" className="mobile-nav-tab">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span className="mobile-nav-label">Experts</span>
        </Link>

        <Link href="/gift" className="mobile-nav-tab active">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
          <span className="mobile-nav-label">Gift</span>
        </Link>

        <Link href="/#categories" className="mobile-nav-tab">
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span className="mobile-nav-label">Topics</span>
        </Link>
      </nav>
    </div>
  );
}
