# Leonardo.AI Web Development Challenge

A Next.js application built for the Leonardo.AI interview process, showcasing anime data from the AniList GraphQL API.

🚀 **Live Demo**: [https://leo-web-team-challenge-2025.vercel.app](https://leo-web-team-challenge-2025.vercel.app)

## Features

- ✨ Next.js 14 with App Router and TypeScript
- 🎨 Chakra UI v2 with custom theme system and gradient variants
- 📡 Apollo Client for GraphQL data fetching
- 🎭 AniList API integration with anime data and cover images
- 👤 User profile management with localStorage persistence
- 📄 URL-based pagination (`/page/2`, `/page/3`, etc.)
- 🔍 Modal-based anime details
- � Modern error handling with Next.js error boundaries
- �📱 Responsive design for mobile and desktop
- 🧪 Comprehensive testing with Vitest + React Testing Library
- 🔧 ESLint configured for code quality

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. **Clone and install**:
```bash
git clone https://github.com/NickProdromou/leo-web-team-challenge-2025.git
cd leo-web-team-challenge-2025
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open your browser**: [http://localhost:3000](http://localhost:3000)

### Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests in single-run mode (no watch)
npm test --run

# Run tests with coverage
npm test -- --coverage
```

**Test Coverage**:
- 📦 **localStorage utilities** - Data persistence & retrieval (5 tests)
- 🧩 **Component rendering** - All UI components with interactions (48 tests)
- 🚨 **Error handling** - Error page and not-found page testing (8 tests)  
- 🎯 **User interactions** - Button clicks, form submissions, modal interactions
- 🔧 **Edge cases** - Missing data, error states, empty results, validation
- 📱 **Responsive behavior** - Image fallbacks, genre truncation, pagination
- 🚀 **Next.js integration** - Router mocking, navigation hooks, GraphQL queries

**Total: 56 passing tests** across 11 test files with comprehensive coverage of all components and utilities.

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page/[pageNumber]/  # Dynamic pagination routes
│   ├── error.tsx          # Error boundary page
│   ├── not-found.tsx      # 404 page
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AnimeCard.tsx     # Individual anime cards
│   ├── AnimeGrid.tsx     # Anime grid with pagination
│   ├── AnimeDetailModal.tsx # Anime details modal
│   ├── UserInfoModal.tsx # User authentication modal
│   ├── UserInfoForm.tsx  # User profile form
│   ├── UserProfile.tsx   # User profile display
│   ├── Header.tsx        # App header with navigation
│   ├── Footer.tsx        # Challenge info
│   ├── HomePage.tsx      # Main page component
│   └── LoadingSpinner.tsx # Loading state component
├── contexts/              # React Context
│   └── UserContext.tsx   # User state management
├── lib/                  # Configuration
│   └── apollo-client.ts  # Apollo Client setup
├── theme/                # Chakra UI theme
│   └── constants.ts      # Theme colors and gradients
├── types/                # TypeScript definitions
│   ├── anime.ts          # AniList API types
│   └── user.ts           # User data types
├── utils/                # Utilities
│   └── localStorage.ts   # Browser storage helpers
├── test/                 # Test configuration
│   └── test-utils.tsx    # Testing utilities
├── components/*.test.tsx  # Component tests (48 tests)
├── app/*.test.tsx        # App router tests (8 tests)
├── utils/*.test.ts       # Utility tests (5 tests)
├── vitest.config.ts      # Vitest configuration
└── vercel.json           # Vercel deployment config
```

## Challenge Requirements ✅

| Requirement | Status | Implementation |
|-------------|---------|----------------|
| Next.js + App Router + TypeScript | ✅ | Next.js 14 with TypeScript |
| Git Repository | ✅ | GitHub repository |
| Chakra UI | ✅ | Chakra UI v2 |
| Responsive Design | ✅ | Mobile & desktop optimized |
| Footer with Version | ✅ | Challenge version v3.5 |
| Blocking User Form | ✅ | Modal for username/job title |
| Data Persistence | ✅ | localStorage implementation |
| View/Edit User Info | ✅ | Profile management |
| Apollo + GraphQL | ✅ | AniList API integration |
| Paginated List | ✅ | Anime grid with pagination |
| Direct URL Linking | ✅ | `/page/[pageNumber]` routes |
| Item Detail Modal | ✅ | Anime details popup |
| Vercel Deployment | ✅ | Live application |

## Live Application

🌐 **URL**: [https://leo-web-team-challenge-2025.vercel.app](https://leo-web-team-challenge-2025.vercel.app)

Test these features:
- Complete user setup form on first visit
- Browse anime grid and pagination
- Click anime cards for details
- Use "Profile" button to view/edit user info
- Navigate directly to `/page/2` or `/page/5`

## Future Features

The following features could enhance the application's functionality and user experience:

### 🎨 **Theme & UI**
- **Dark Mode Toggle** - Theme switching with system preference detection

### 🔍 **Search & Filtering**
- **Anime Search** - Search by title or description
- **Genre Filtering** - Filter anime by genres (Action, Romance, Comedy, etc.)
- **Additional Filters** - Filter by year, rating, episode count, status

### 📊 **Data & Display**
- **Multiple Sort Options** - Sort by popularity, rating, release date, episode count
- **Results Per Page** - Configurable page sizes (10, 20, 50 items)

### 💾 **Personalization**
- **Favorites System** - Save and manage favorite anime

---

**Challenge Version v3.5** • Built for Leonardo.AI • [Repository](https://github.com/NickProdromou/leo-web-team-challenge-2025)
