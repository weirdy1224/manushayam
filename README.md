# 🌿 ManushyaM — Ancient Ayurvedic Hair Care

ManushyaM is a premium web application showcasing an Ayurvedic brand that offers pure, natural, and handcrafted hair therapies. Rooted in ancient wisdom and inspired by nature, ManushyaM products are curatively prepared using a **5000-year-old Kashayam Ayurvedic process** to enhance wellbeing, balance, and natural beauty.

---

## ✨ Features

- **🌸 Modern & Premium Design**: Curated, harmonious color palettes, typography, and micro-interactions representing luxury Ayurvedic care.
- **⚡ Smooth Route Transitions**: Dynamic page animations powered by `framer-motion` for a fluid and responsive browsing experience.
- **📦 Complete Product Showcase**: Comprehensive details for hair care therapy packs tailored for both men and women.
- **📝 Interactive Blogs & Reviews**: Read through community experiences, reviews, and holistic health articles.
- **🕒 Interactive Loader**: A customized entrance loader animation transitioning smoothly into the landing page.
- **📱 Fully Responsive**: Optimized layouts that look stunning across all screen sizes, from mobile devices to desktop monitors.

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Modern CSS properties, HSL color palettes, responsive flex/grid layouts)

---

## 📂 Project Structure

```text
manushayam/
├── assets/             # Images, logos, and illustration assets
├── src/
│   ├── components/     # Reusable layout components (Navbar, Footer, Loader)
│   │   ├── Navbar.jsx  # Main navigation header
│   │   ├── Footer.jsx  # Page footer with links and social icons
│   │   └── Loader.jsx  # Entrance transition loader
│   ├── pages/          # Individual route pages
│   │   ├── Home        # Main showcase and hero section
│   │   ├── About       # Company philosophy, promise, and story
│   │   ├── HowItWorks  # Educational section explaining the Ayurvedic process
│   │   ├── Solutions   # Custom remedies tailored for specific concerns
│   │   ├── ProductDetails # Product features, ingredients, and usage details
│   │   ├── BlogsReviews   # User reviews and editorial articles
│   │   └── ContactUs   # Form for user inquiries and support
│   ├── App.jsx         # App router and layout setup
│   ├── main.jsx        # App entrypoint
│   └── index.css       # Global design system & theme variables
├── index.html          # HTML template
├── vite.config.js      # Vite build configuration
└── package.json        # Dependencies and scripts
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher is recommended).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/manushayam.git
   cd manushayam
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

4. **Build for production**:
   ```bash
   npm run build
   ```
   This will output optimized static assets to the `dist` folder.

---

## 🌿 Our Philosophy

> "At ManushyaM, we don't just create therapies. We preserve a legacy of healing and share it with you."

We prioritize:
- **Ethical Sourcing**: Handpicked premium herbs and nourishing oils.
- **Mindful Formulation**: Handcrafted in small batches with respect for the environment.
- **Transparency**: Clear, honest, and chemical-free ingredient disclosures.
- **Holistic Care**: Therapies that balance strength, scalp health, and natural radiance.
