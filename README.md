# APSRTC Velocity 🚌 — Modern Web Portal Redesign

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-059669)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An end-to-end UI/UX and architectural modernization of the **Andhra Pradesh State Road Transport Corporation (APSRTC)** passenger booking portal (`apsrtconline.in`). Built from the ground up as a fast, accessible, mobile-first GovTech experience with bilingual vernacular support, real-time GPS bus tracking, and UPI-first instant payments.

---

## 🌟 The Problem & The Transformation

The Andhra Pradesh State Road Transport Corporation transports over **10 million passengers daily** across South and Central India. However, its official online booking portal suffered from significant legacy bottlenecks:

| Legacy Portal (`apsrtconline.in`) | APSRTC Velocity (Redesign) |
| :--- | :--- |
| **Monolithic 280KB static array** hardcoded in HTML (`var jsondata = [...]`), freezing mobile inputs | **Sub-5ms indexed fuzzy search** decoupling hubs from pickup points with zero initial payload bloat |
| **Browser back button trapped** via `window.history.forward(); noBack()` | **Native browser history** with deep-linkable booking URLs |
| **Fixed 960px desktop table layout** requiring pinch-to-zoom on phones | **100% mobile-first responsive grid** built for rural 3G/4G and low-end devices |
| **Deprecated `<marquee>` tickers** & banner graphics displacing the search card | **High-elevation hero card** with 180° animated route swap and quick-date chips |
| **Exclusively English forms** despite serving Telugu-speaking citizens | **Native bilingual toggle (English ↔ తెలుగు)** with authentic `Noto Sans Telugu` typography |
| **Cryptic seat maps** without sleeper deck ergonomics or quota clarity | **Interactive 2-deck seating canvas** with Lower/Upper berths, Ladies Quota (Pink), and a 6-seat cap |
| **High payment failure friction** | **10-minute seat lock timer** with dynamic UPI QR code generator (PhonePe, GPay, Paytm) |
| **Isolated tracking links** requiring internal service numbers | **APSRTC LiveTrack** with GPS speed gauges, route milestone steppers, and delay calculations |

---

## 🚀 Key Feature Highlights

### 1. Bilingual Vernacular Support (తెలుగు / English)
* Instant switch in the global header updates all station names, bus categories, form labels, and instructions without page reloads.

### 2. Elevated Search Widget
* **Station Autocomplete:** Fast typeahead separating **Major Transit Hubs** (PNBS, MGBS, CMBT, KBS) from local boarding stops.
* **180° Route Swap:** Smooth rotational animation to flip origin and destination in one tap.
* **Quick-Date Chips:** 1-tap selectors for **Today**, **Tomorrow**, and **This Weekend**.
* **Round-Trip Discount Toggle:** Automatically calculates a 10% discount on return fares.

### 3. Faceted Filter Sidebar & Live Scarcity
* Multi-criteria filters: **AC vs. Non-AC**, **Sleeper vs. Seater**, **Time Slots (Early Morning, Morning, Afternoon, Night)**, and sorting by Price, Departure, or Available Seats.
* Live scarcity indicators (e.g., *Only 2 seats left!*) alerting passengers to holiday rush.

### 4. Interactive 2-Deck Seating Canvas
* Visual bus deck with driver cabin steering wheel orientation.
* Lower Deck and Upper Deck tab switchers for multi-axle sleeper buses (Amaravathi, Garuda Plus).
* Visual differentiation for **Available**, **Selected**, **Booked**, and **Ladies Quota** (soft pink with female icon).

### 5. Passenger Details with Senior Citizen Concessions
* Dynamic passenger input blocks generated per selected seat.
* Automatic **25% Senior Citizen Concession** applied for passengers age 60+.
* **WhatsApp Ticket Opt-in:** Dispatches digital m-Ticket and live GPS tracking links directly to WhatsApp.

### 6. UPI-First Payment Screen
* **10:00 Seat Lock Countdown Timer:** Prevents double-booking race conditions.
* **Dynamic UPI QR Code Generator:** Scan to pay directly using any Indian UPI app.
* Comprehensive fare breakdown: Base Fare + Senior Concession + Round-Trip Discount + GST + Toll Cess.

### 7. Digital m-Ticket with Conductor QR Barcode
* Conductor boarding QR code for contactless paperless boarding.
* Dedicated print stylesheet (`Ctrl + P`) omitting extraneous headers and navigation.

### 8. APSRTC LiveTrack (Real-Time GPS Bus Telemetry)
* Search by PNR or Service Number.
* Real-time vehicle speed gauge (`78 km/h`), vehicle registration (`AP 28 Z 9844`), and masked conductor helpline.
* Route milestone stepper showing passed checkpoints, current live GPS position, and upcoming stations with delay calculations.

### 9. Ticket Management & Cancellation Simulator
* PNR status lookup with an interactive hours-before-departure slider simulating official APSRTC cancellation refund tiers (>24 hrs: 10%, 12–24 hrs: 25%, 2–12 hrs: 50%, <2 hrs: no refund).

---

## 🏗️ Architecture & Codebase Structure

Built following the principles of **Deep Modules** (*A Philosophy of Software Design*):

```
├── src/
│   ├── types/
│   │   └── index.ts                 # Strongly-typed domain models
│   ├── core/                        # Deep business logic & calculation engines
│   │   ├── i18n.ts                  # Bilingual Telugu & English dictionary
│   │   ├── stationIndex.ts          # Indexed transit hubs & debounced fuzzy search (<5ms)
│   │   ├── busScheduleEngine.ts     # Schedule generator for Amaravathi, Garuda, Indra, etc.
│   │   ├── fareEngine.ts            # Base fare, GST, senior concessions, and refund slabs
│   │   └── trackingService.ts       # Real-time GPS bus telemetry with waypoint progress
│   ├── components/
│   │   ├── common/                  # GlobalHeader, GovFooter
│   │   ├── search/                  # HeroSearchCard, StationAutocomplete, PopularCorridors, PromotionalTicker
│   │   ├── results/                 # SearchSummaryBar, FilterSidebar, BusCard
│   │   ├── seatmap/                 # InteractiveBusDeck, SeatLegend
│   │   ├── checkout/                # BoardingDroppingPicker, PassengerForm, PaymentModal
│   │   ├── ticket/                  # DigitalTicketCard (QR Barcode & Print Stylesheet)
│   │   ├── tracking/                # LiveTrackPortal (GPS Telemetry & Milestone Stepper)
│   │   └── manage/                  # ManageBookingModal (Cancellation Refund Simulator)
│   ├── App.tsx                      # Main booking state machine
│   ├── index.css                    # Tailwind directives & print media rules
│   └── main.tsx                     # Vite entrypoint
```

---

## 🛠️ Getting Started

### Prerequisites
* **Node.js** v18.0.0 or higher
* **npm** or **yarn** or **pnpm**

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/santhoshh005/APSRTC-Velocity.git
cd APSRTC-Velocity

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

Visit [**`http://localhost:3000`**](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎨 Design Tokens & Palette

* **Heritage Red (Primary):** `#991B1B`
* **Dark Burgundy (Authoritative Header):** `#7F1D1D`
* **Telugu Golden Ochre (Accent):** `#D97706` / `#F59E0B`
* **Navy Slate (Text & Structure):** `#0F172A`
* **Alabaster Canvas (Background):** `#F8FAFC`
* **Ladies Quota (Rose):** `#DB2777`
* **Available Status (Emerald):** `#059669`

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

**Disclaimer:** This project is an independent UI/UX engineering overhaul and modernization concept designed for educational, accessibility, and portfolio demonstration purposes. All trademarks, logos, and brand names belong to the Andhra Pradesh State Road Transport Corporation (APSRTC).
