# Court Click – CTC Admin Panel

A frontend admin panel for managing **Certified True Copy (CTC)** orders in a court services platform. Built as a take-home assessment, pixel-matched to the provided Figma design.

🔗 **Live demo:** _add your Vercel URL here after deploying_

---

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Ant Design** (antd v5) – UI component library
- **React 19**

## Features

- **Orders table** – paginated list of CTC orders with full per-row detail (user info, court complex, products, order date, status, tags, clerk, e-copy upload).
- **Order Details modal** – four tabs (Case & Customer Details, Address, Products, Digio eSign Documents) opened from the *View* button.
- **Filter Users drawer** – filter orders by District, Court Establishment, and Product. Functional filtering applied to the table.
- **Tag management** – *Choose Tag* and *Create New Tag* popups with a live preview and colour picker.
- **Quick filters** – column-header filters for Tags and Products that filter the table in place.
- **Assign Clerk** flow – assign authorised personnel, with a nested *Add Clerk* form (name, phone with country code, clerk ID).
- **Share popup** – shareable order summary with a *Copy Details* action.
- **Copy Address** – inline address card popover from each row.
- **Dark mode** – toggle in the header; uses Ant Design's `darkAlgorithm` so the entire UI (table, modals, drawers, popups) recolours consistently.
- **States handled** – loading, empty (`No orders found`), and disabled controls.
- **Reusable components** – each modal/drawer/popup is its own component in `components/`.

## Project Structure

```
court-click-test/
├── app/
│   ├── layout.tsx          # Root layout (antd registry + React 19 patch)
│   ├── page.tsx            # Main dashboard: table + all wiring
│   └── globals.css         # Tailwind utilities import
├── components/
│   ├── OrderDetailsModal.tsx
│   ├── FilterDrawer.tsx
│   ├── TagPopovers.tsx     # ChooseTag, CreateTag, TagsQuickFilter, ProductFilter
│   ├── AssignClerkModal.tsx
│   ├── AddClerkModal.tsx
│   └── ShareModal.tsx
├── data/
│   └── mockData.ts         # Sample orders, tabs, order details
└── types/
    └── order.ts            # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/nithinn6034/Court-Click-.git
cd Court-Click-

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Notes

- The data is **mocked** (`data/mockData.ts`) – there is no backend. Filters, search, and the dashboard operate on this sample data.
- Pagination shows a representative total; only the sample rows are rendered.
- Designed and tested against the Figma reference for layout, spacing, and colour accuracy.

## Author

Built by **Nithin Babu** as a frontend developer assessment for Court Click.