<p align="center">
  <h1 align="center">a11yscore</h1>
  <p align="center">
    <strong>Rating the accessibility of the physical world — one city at a time.</strong>
  </p>
  <p align="center">
    <a href="https://a11yscore.org">Website</a> · <a href="./docs/index.md">Documentation</a> · <a href="https://sozialhelden.de">Sozialhelden e.V.</a>
  </p>
</p>

---

The **a11y-Score** measures and evaluates real-world accessibility in cities, districts, and regions across Germany. It turns open data into a meaningful, actionable score — empowering municipalities, planners, and citizens to understand where things stand, track progress over time, and make targeted improvements.

For the full project background, algorithm documentation, and backend API, see the [main repository →](https://github.com/sozialhelden/a11yscore)

---

## Why it matters

Millions of people encounter barriers in the built environment every day. German municipalities are legally required to work towards accessibility and inclusion, yet until now there has been no unified, data-driven way to measure or compare how accessible a region actually is.

The a11y-Score changes that:

- **Measures** accessibility based on [OpenStreetMap](https://www.openstreetmap.org) data and a defined set of criteria (wheelchair access, tactile paving, real-time departure boards, and more)
- **Scores** regions on a 0–100 scale, broken down into top-level categories → sub-categories → individual criteria
- **Compares** cities and districts across Germany (federal states, administrative districts, and urban districts)
- **Motivates** better data collection — the score improves as more OSM data is added, even if it reveals poor accessibility

This project is funded by the **Federal Ministry for Digital and Transport (BMDV)** as part of the [mFUND initiative](https://www.bmv.de/SharedDocs/DE/Artikel/DG/mfund-projekte/a11y.html), developed by [Sozialhelden e.V.](https://sozialhelden.de).

---

## Getting started

### Prerequisites

- Node.js ≥ 22
- A running instance of the [a11yscore backend](https://github.com/sozialhelden/a11yscore) (or a valid `API_BASE_URL` pointing to one)

### Setup

**1. Clone the repository**
```bash
git clone https://github.com/sozialhelden/a11yscore-frontend.git
cd a11yscore-frontend
```

**2. Install dependencies**
```bash
npm ci
```

**3. Configure environment**
```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

| Variable | Description |
|---|---|
| `API_BASE_URL` | Base URL of the a11yscore backend API |
| `TRANSIFEX_TOKEN` | Transifex token for loading translations at runtime |
| `TRANSIFEX_SECRET` | Transifex secret for pushing source strings |

**4. Start the development server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---



## Contributing

We welcome feedback and meaningful contributions to the project! Please get in touch via GitHub issues or email (see [contact info](https://www.sozialhelden.de/kontakt/)).

## License

[MIT](LICENSE)
