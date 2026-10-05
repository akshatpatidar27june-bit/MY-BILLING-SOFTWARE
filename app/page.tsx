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
          <div className="laptop">
            <div className="laptop-screen">
              <div className="screen-top">
                <div className="mini-brand"><span /> MY BILLING</div>
                <div className="screen-outlet">Main Outlet⌄</div>
                <div className="avatar">A</div>
              </div>
              <div className="screen-body">
                <aside>
                  <b>Dashboard</b>
                  <span className="active">Billing</span>
                  <span>Products</span>
                  <span>Inventory</span>
                  <span>Customers</span>
                  <span>Reports</span>
                </aside>
                <div className="pos">
                  <div className="pos-head"><div><small>QUICK BILL</small><h3>Today’s sales</h3></div><strong>₹ 48,650</strong></div>
                  <div className="stats">
                    <span><b>126</b><small>Bills</small></span>
                    <span><b>₹386</b><small>Avg. bill</small></span>
                    <span><b>94%</b><small>Collected</small></span>
                  </div>
                  <div className="chart">
                    <div className="bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
                    <div className="chart-line" />
                  </div>
                  <div className="products-preview">
                    <span><b>Paneer Tikka</b><small>₹ 280</small></span>
                    <span><b>Masala Dosa</b><small>₹ 180</small></span>
                    <span><b>Cold Coffee</b><small>₹ 140</small></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="laptop-base"><span /><span /><span /></div>
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
            <div className="portrait-glow" />
            <div className="portrait-head" />
            <div className="portrait-body" />
            <span>FOUNDER<br />PHOTO</span>
          </div>
          <div className="about-badge"><b>01</b><span>Building from<br />India, for India.</span></div>
        </div>
        <div className="about-copy">
          <div className="section-label">03 — ABOUT US</div>
          <h2>We’re building the<br /><em>simpler way.</em></h2>
          <p>My Billing is being built with one belief: restaurant technology should make the business easier, not make owners learn another complicated system.</p>
          <p>We are starting from India, working directly with real restaurants, listening to their problems and turning that feedback into a product that can grow with them.</p>
          <div className="founder-line"><span className="founder-dot" /><div><b>Founder & Product</b><small>Your introduction will be added here.</small></div></div>
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
