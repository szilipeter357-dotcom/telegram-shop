"use client";

import { useState } from "react";

const banners = [
  {
    date: "Update: 05.10",
    location: "Tatabánya",
  },
  {
    date: "Update: 06.10",
    location: "Budapest",
  },
  {
    date: "Update: 07.10",
    location: "Szeged",
  },
  {
    date: "Update: 08.10",
    location: "Pécs",
  },
];

export default function Home() {
  const [banner, setBanner] = useState(0);
  const [page, setPage] = useState("home");

  const nextBanner = () => {
    setBanner((banner + 1) % banners.length);
  };

  const previousBanner = () => {
    setBanner(
      (banner - 1 + banners.length) % banners.length
    );
  };

  return (
    <main className="telegram-app">

      <div className="app-shell">

        {/* FELSŐ FEJLÉC */}

        <header className="telegram-header">

          <button className="close-button">
            Bezárás
          </button>

          <div className="telegram-brand">
            <div className="brand-title">
              CALIBUDA
            </div>

            <div className="brand-subtitle">
              mini app
            </div>
          </div>

          <button className="telegram-more">
            •••
          </button>

        </header>

        {/* EGYENLEG */}

        <section className="balance-panel">

          <div>
            <div className="balance-label">
              Balance
            </div>

            <div className="balance-number">
              75
              <span>HUF</span>
            </div>
          </div>

          <div className="brand-logo">
            ✦
          </div>

        </section>

        {/* FŐOLDAL */}

        {page === "home" && (
          <div className="home-content">

            {/* BANNER */}

            <section className="hero-wrapper">

              <button
                className="hero-arrow hero-left"
                onClick={previousBanner}
              >
                ‹
              </button>

              <div className="hero-banner">

                <div className="hero-text">

                  <div>
                    {banners[banner].date}
                  </div>

                  <div className="hero-location">
                    {banners[banner].location}
                  </div>

                </div>

              </div>

              <button
                className="hero-arrow hero-right"
                onClick={nextBanner}
              >
                ›
              </button>

            </section>

            {/* PONTOK */}

            <div className="slider-dots">

              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setBanner(index)}
                  className={
                    index === banner
                      ? "slider-dot slider-dot-active"
                      : "slider-dot"
                  }
                />
              ))}

            </div>

            {/* MENÜ */}

            <button
              className="main-menu-button"
              onClick={() => setPage("menu")}
            >
              <span className="menu-symbol">
                ▤
              </span>

              <span>MENU</span>
            </button>

            {/* WHEEL */}

            <section className="wheel-panel">

              <div className="wheel-heading">
                CALIWHEEL
              </div>

              <div className="wheel-row">

                <div className="wheel-icons">

                  <div className="wheel-icon">
                    🍋
                  </div>

                  <div className="wheel-icon">
                    ⭐
                  </div>

                  <div className="wheel-icon">
                    ⭐
                  </div>

                </div>

                <button
                  className="wheel-open"
                  onClick={() =>
                    alert("Demó kerék")
                  }
                >
                  OPEN SLOT
                </button>

              </div>

            </section>

            {/* INFORMÁCIÓ */}

            <section className="information-panel">

              <div className="information-text">

                <div className="information-title">
                  Csatlakozz a csapatunkhoz 💪
                </div>

                <div className="information-needed">
                  Szükségünk van:
                </div>

                <div className="information-role">
                  ✉️ Kézbesítők
                </div>

                <div className="information-bottom">
                  További információért
                </div>

                <button className="support-link">
                  ÍRJ A TÁMOGATÁSNAK
                </button>

              </div>

            </section>

            {/* KIEMELT */}

            <section className="offer">

              <h2>
                ⭐ Hot Offer (pre-order)
              </h2>

              <div className="offer-message">
                <div>
                  No available prem product.
                </div>

                <div>
                  Open menu to see what we have now
                </div>
              </div>

            </section>

          </div>
        )}

        {/* MENÜ */}

        {page === "menu" && (
          <section className="inner-page">

            <button
              className="back-button"
              onClick={() => setPage("home")}
            >
              ← Vissza
            </button>

            <h1>MENU</h1>

            <div className="menu-search">
              🔎
              <input
                placeholder="Keresés..."
              />
            </div>

            <h2>Területek</h2>

            <div className="region-grid">

              {[
                "Budapest",
                "Tatabánya",
                "Szeged",
                "Pécs",
                "Győr",
                "Debrecen",
              ].map((region) => (

                <button
                  key={region}
                  className="region-button"
                >
                  {region}
                </button>

              ))}

            </div>

          </section>
        )}

        {/* ALSÓ NAVIGÁCIÓ */}

        <nav className="bottom-nav">

          <button
            className={
              page === "home"
                ? "bottom-nav-item active"
                : "bottom-nav-item"
            }
            onClick={() => setPage("home")}
          >
            <span>⌂</span>
            <small>Home</small>
          </button>

          <button
            className="bottom-nav-item"
            onClick={() =>
              alert("Promo")
            }
          >
            <span>♢</span>
            <small>Promo</small>
          </button>

          <button
            className={
              page === "menu"
                ? "bottom-nav-item active"
                : "bottom-nav-item"
            }
            onClick={() => setPage("menu")}
          >
            <span>▤</span>
            <small>Menu</small>
          </button>

          <button
            className="bottom-nav-item"
            onClick={() =>
              alert("Profile")
            }
          >
            <span>▱</span>
            <small>Profile</small>
          </button>

          <button
            className="bottom-nav-item"
            onClick={() =>
              alert("Cart")
            }
          >
            <span>♧</span>
            <small>Cart</small>
          </button>

        </nav>

      </div>

    </main>
  );
}