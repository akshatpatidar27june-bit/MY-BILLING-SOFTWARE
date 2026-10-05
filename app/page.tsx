"use client";

import { useEffect, useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "₹10,000",
    tone: "starter",
    description: "Everything a growing single-outlet restaurant needs to run smarter.",
    features: ["Billing & POS", "Products & categories", "Basic inventory", "Customers", "Sales reports"],
  },
  {
    name: "Business",
    price: "₹20,000",
    tone: "business",
    popular: true,
    description: "More control for serious restaurants and teams with growing operations.",
    features: ["Everything in Starter", "Multi-outlet management", "Advanced inventory", "Purchases & suppliers", "Staff & permissions", "Advanced reports"],
  },
  {
    name: "Professional",
    price: "₹30,000",
    tone: "pro",
    description: "Built for restaurant businesses that want the complete operating system.",
    features: ["Everything in Business", "Powerful analytics", "Outlet-wise controls", "Priority support", "Advanced business tools", "Designed to scale"],
  },
  {
    name: "Super",
    price: "₹50,000",
    tone: "super",
    description: "The complete package for ambitious restaurant groups and growing brands.",
    features: ["Everything in Professional", "Maximum feature access", "Enterprise-ready controls", "Premium support", "Future advanced features", "Priority product access"],
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <div className="site-noise" />
      <header className={scrolled ? "nav scrolled" : "nav"}>
        <a className="brand" href="#home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>MY<span className="brand-accent">BILLING</span></span>
        </a>
        <nav className="desktop-nav">
          <a href="#product">Product</a>
          <a href="#plans">Plans</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-cta" href="#plans">View Plans <span>↗</span></a>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-copy">
          <div className="hero-kicker"><span className="live-dot" /> BUILT FOR INDIA’S RESTAURANTS</div>
          <h1>
            <span>Run your restaurant.</span>
            <strong>Run it smarter.</strong>
          </h1>
          <p>
            One powerful system for billing, inventory, staff, customers and business growth — built to feel simple from the first bill.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#plans">Explore the plans <span>→</span></a>
            <a className="ghost-btn" href="#product">See the product <span>↓</span></a>
          </div>
          <div className="hero-proof">
            <span>01</span><i /> Fast billing <i /> Multi-outlet ready <i /> Built for growth
          </div>
        </div>

        <div className="device-stage" aria-label="Restaurant billing software preview">
          <div className="stage-floor" />
          <div className="device-shadow" />
          <div className="device-photo-wrap">
            <img
              className="device-photo"
              src="data:image/jpeg;base64,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"
              alt="MY BILLING restaurant POS workstation"
            />
          </div>
          <div className="floating-card sales-card"><small>SALES TODAY</small><strong>₹48,650</strong><em>+18.4%</em></div>
          <div className="floating-card outlet-card"><span className="mini-check">✓</span><div><small>OUTLET STATUS</small><strong>All systems ready</strong></div></div>
        </div>
        <div className="scroll-cue"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section id="product" className="product-section">
        <div className="section-label">01 — THE PRODUCT</div>
        <div className="section-heading">
          <div><h2>Everything your<br /><em>restaurant needs.</em></h2></div>
          <p>We are building more than a billing screen. My Billing is designed as the operating layer between your restaurant, your team and your numbers.</p>
        </div>
        <div className="feature-grid">
          {[
            ["01","BILLING","Fast POS billing built around the way restaurants actually work.","₹","accent"],
            ["02","INVENTORY","Know what is moving, what is low and where your stock stands.","▦","dark"],
            ["03","MULTI-OUTLET","Switch between outlets and understand the whole business in one place.","◉","light"],
            ["04","REPORTS","Turn everyday transactions into decisions you can actually use.","↗","accent"],
          ].map(([n,t,d,icon,tone]) => (
            <article key={n} className={"feature-card "+tone}>
              <div className="feature-top"><span>{n}</span><b>{icon}</b></div>
              <h3>{t}</h3><p>{d}</p><a href="#plans">Explore <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-section">
        <div className="statement-orb" />
        <div className="statement-label">MADE FOR THE REAL WORLD</div>
        <h2>Less time managing<br /><span>more time serving.</span></h2>
        <p>From the first order of the day to the final report at night, every part of the experience should feel connected.</p>
      </section>

      <section id="plans" className="plans-section">
        <div className="section-label">02 — PLANS</div>
        <div className="section-heading plans-heading">
          <div><h2>Choose your<br /><em>level of control.</em></h2></div>
          <p>Simple annual plans. No confusing pricing maze. Start with what you need and move up as your restaurant grows.</p>
        </div>
        <div className="plans-grid">
          {plans.map((plan) => (
            <article key={plan.name} className={"plan-card "+plan.tone+(plan.popular ? " popular" : "")}>
              {plan.popular && <div className="popular-tag">MOST POPULAR</div>}
              <div className="plan-top"><span>{plan.name}</span><span>01 YEAR</span></div>
              <div className="price">{plan.price}<small>/ year</small></div>
              <p>{plan.description}</p>
              <div className="plan-divider" />
              <ul>{plan.features.map((f) => <li key={f}><span>✓</span>{f}</li>)}</ul>
              <a href="#about" className="plan-btn">Talk to us <span>↗</span></a>
            </article>
          ))}
        </div>
        <div className="plan-note"><span>✦</span> Final feature limits and commercial terms will be published after the pilot program.</div>
      </section>

      <section id="about" className="about-section">
        <div className="about-visual">
          <div className="portrait-placeholder">
            <img
              className="founder-photo"
              src="data:image/jpeg;base64,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"
              alt="Akshat Patidar, founder of MY BILLING"
            />
          </div>
          <div className="about-badge"><b>01</b><span>Building from<br />India, for India.</span></div>
        </div>
        <div className="about-copy">
          <div className="section-label">03 — ABOUT US</div>
          <h2>Building MY BILLING from a<br /><em>passion for better businesses.</em></h2>
          <p>MY BILLING started with a simple idea: restaurant owners shouldn’t have to choose between expensive software and limited software.</p>
          <p>With <strong>1+ years of hands-on experience building e-commerce websites, business websites and digital platforms</strong>, I’ve seen how the right technology can make a business easier to manage and easier to grow.</p>
          <p>Now, I’m applying that experience to restaurant technology — building MY BILLING as a simple, reliable and affordable platform for Indian restaurants.</p>
          <div className="founder-line"><span className="founder-dot" /><div><b>Akshat Patidar</b><small>Founder & Product Builder, MY BILLING</small></div></div>
          <div className="founder-highlights">
            <div><b>1+ Years</b><small>Web & E-commerce Experience</small></div>
            <div><b>India First</b><small>Built for Indian Businesses</small></div>
            <div><b>Founder Led</b><small>Product & Development</small></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark"><i/><i/><i/></span> MY<span>BILLING</span></div>
        <p>Restaurant billing. Reimagined for India.</p>
        <div>© 2026 My Billing Software</div>
      </footer>
    </main>
  );
}
