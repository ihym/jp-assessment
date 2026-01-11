# Financial Instruments Table

A single-page React application that displays a sortable table of financial instruments.

## Features

### Sorting

- **By Ticker**: Alphabetical order (A-Z ascending, Z-A descending)
- **By Price**: Descending order by default (highest first)
- **By Asset Class**: Equities → Macro → Credit (fixed priority order)

Click any column header to sort. Click again to toggle sort direction.

### Presentation

- **Row Color Coding by Asset Class**:
  - Macro = White background
  - Equities = Blue background
  - Credit = Green background

### Responsive Design

- **Desktop** (≥640px): Full table with sticky column headers that remain visible while scrolling
- **Mobile** (<640px): Card-based layout with compact sort controls

## Tech Stack

- **React 19** with TypeScript
- **Vite** for development and build
- **Tailwind CSS 4** for styling
- **Vitest** + **Testing Library** for testing
- **ESLint** + **Prettier** for linting and formatting
- **Lucide React** for icons
- **react-use** for responsive media queries

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage
```

### Build

```bash
pnpm build
pnpm preview
```
