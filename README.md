# React Crypto Market UI

A modern, responsive React application that showcases animated headlines and a dynamic cryptocurrency market list. Features include live-simulated price updates, animated scroll-based UI, and responsive sliders. Built with **Framer Motion**, **Swiper.js**, and **Tailwind CSS** for a sleek and performant user experience.

---

## Features

- **Animated Header** with hover-triggered glow and scroll-in transitions.
- **Live Market Ticker** with fake price simulations every 4 seconds.
- **Custom Swiper Carousel** for displaying market data in categorized sections.
- **Smart Rank and Sorting** based on simulated live data.
- **Responsive Design** that works on mobile, tablet, and desktop.
- **Smooth Transitions** using Framer Motion and Intersection Observer.

---

## Technologies Used

| Tech                  | Purpose                        |
|-----------------------|--------------------------------|
| React                 | Frontend library               |
| Tailwind CSS          | Styling and utility classes    |
| Framer Motion         | Animation and motion handling  |
| Swiper.js             | Carousel/Slider component      |
| React Icons           | Icon library                   |
| Axios                 | Fetching market data (local)   |
| React Intersection Observer | Scroll-based animation triggers |
| Local JSON (`/constants/data.json`) | Mock coin data |

---

## Project Structure

```bash
.
├── public/
│   ├── images/
│   │   └── exchange.png       # Hover icon for market items
│   └── constants/
│       └── data.json          # Mock coin data (name, symbol, image, etc.)
├── src/
│   ├── components/
│   │   ├── AnimateText.jsx    # Animated header section
│   │   └── MarketList.jsx     # Market card slider
│   ├── helpers/
│   │   └── useMarket.js       # Custom hook for market data with live-like updates
│   ├── index.css              # Tailwind base styles
│   └── App.jsx                # Main application entry
└── README.md
```
## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/react-crypto-market.git
cd react-crypto-market
```
