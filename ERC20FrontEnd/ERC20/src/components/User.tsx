import {
  FiClock,
  FiDroplet,
  FiGlobe,
  FiSettings,
} from "react-icons/fi";

// const navItems = ["Faucet", "Assets", "History"];

const User = () => {
  return (
    <div className="user-dashboard">
      <header className="user-topbar">
        <p className="brand-title">The RAJ</p>

        {/* <nav className="user-nav" aria-label="User navigation">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={`user-nav-link ${index === 0 ? "is-active" : ""}`}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav> */}

        <div className="topbar-actions">
          <button className="icon-button" type="button" aria-label="Settings">
            <FiSettings />
          </button>

          <button className="wallet-button" type="button">
            Connect Wallet
          </button>
        </div>
      </header>

      <main className="user-content">
        <section className="user-hero">
          <h1>Token Faucet</h1>
          <p className="hero-copy user-hero-copy">
            Claim your daily allowance of RAJ Tokens. Ensure your wallet is
            connected to the Ethereum Sepolia network to proceed.
          </p>
        </section>

        <section className="user-stats-grid">
          <article className="asset-card user-glass-card">
            <p className="card-eyebrow">Active Asset</p>
            <div className="asset-title-row">
              <h2>RAJ Token</h2>
              {/* <span>(ETHRL)</span> */}
            </div>

            <div className="asset-details">
              <div>
                <p className="mini-label">Total Supply</p>
                <strong>100,000,000</strong>
              </div>

              <div>
                <p className="mini-label">Contract Status</p>
                <strong className="verified-text">Verified</strong>
              </div>
            </div>
          </article>

          <article className="faucet-amount-card user-glass-card">
            <div className="stat-icon">
              <FiDroplet />
            </div>
            <p className="mini-label">Faucet Amount</p>
            <p className="faucet-caption">Amount per request</p>
            <strong>500 RAJ</strong>
          </article>

          <article className="small-stat-card user-glass-card">
            <div className="stat-icon purple">
              <FiClock />
            </div>
            <p className="small-stat-title">Cooldown</p>
            <p className="small-stat-subtitle">Between requests</p>
            <strong>24 Hours</strong>
          </article>

          <article className="small-stat-card user-glass-card">
            <div className="stat-icon green">
              <FiGlobe />
            </div>
            <p className="small-stat-title">Network</p>
            <p className="small-stat-subtitle">Deployment chain</p>
            <strong>Sepolia Testnet</strong>
          </article>
        </section>

        <section className="request-card user-glass-card">
          <div className="request-card-inner">
            <div className="request-skeleton request-skeleton-lg" />
            <div className="request-skeleton request-skeleton-sm" />

            <button className="request-button" type="button">
              Request Tokens
            </button>

            <p className="request-note">
              Requests are limited to one per unique wallet address per day.
            </p>
          </div>
        </section>

        <section className="wallet-preview">
          <p className="card-eyebrow">Connected Item Preview</p>

          <article className="wallet-preview-card">
            <div className="wallet-preview-main">
              <div className="wallet-check">✓</div>

              <div>
                <p className="wallet-preview-label">Wallet Connected</p>
                <strong>0x71C...392A</strong>
              </div>
            </div>

            <button className="retry-chip" type="button">
              Retry in 11h 12m 15s
            </button>
          </article>
        </section>
      </main>
    </div>
  );
};

export default User;
