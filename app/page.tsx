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
                  <b>Dashboard</b><span className="active">Billing</span><span>Products</span><span>Inventory</span><span>Customers</span><span>Reports</span>
                </aside>
                <div className="pos">
                  <div className="pos-head"><div><small>QUICK BILL</small><h3>Today’s sales</h3></div><strong>₹ 48,650</strong></div>
                  <div className="stats"><span><b>126</b><small>Bills</small></span><span><b>₹386</b><small>Avg. bill</small></span><span><b>94%</b><small>Collected</small></span></div>
                  <div className="chart"><div className="bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="chart-line" /></div>
                  <div className="products-preview"><span><b>Paneer Tikka</b><small>₹ 280</small></span><span><b>Masala Dosa</b><small>₹ 180</small></span><span><b>Cold Coffee</b><small>₹ 140</small></span></div>
                </div>
              </div>
            </div>
            <div className="laptop-base"><span /><span /><span /></div>
          </div></div>
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
