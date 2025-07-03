# Leonardo.AI Web Development Challenge

A Next.js application built for the Leonardo.AI interview process, showcasing anime data from the AniList GraphQL API.

🚀 **Live Demo**: [https://leo-web-team-challenge-2025.vercel.app](https://leo-web-team-challenge-2025.vercel.app)

## Features

- ✨ Next.js 14 with App Router and TypeScript
- 🎨 Chakra UI for responsive design
- 📡 Apollo Client for GraphQL data fetching
- 🎭 AniList API integration with anime data and cover images
- 👤 User profile management with localStorage persistence
- 📄 URL-based pagination (`/page/2`, `/page/3`, etc.)
- 🔍 Modal-based anime details
- 📱 Responsive design for mobile and desktop
- 🧪 Comprehensive testing with Vitest + React Testing Library

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
- 🧩 **Component rendering** - UserProfile, Footer, AnimeCard, AnimeGrid (19 tests)  
- 🎯 **User interactions** - Button clicks, form submissions, card interactions
- 🔧 **Edge cases** - Missing data, error states, empty results
- 📱 **Responsive behavior** - Image fallbacks, genre truncation, pagination
- 🚀 **Next.js integration** - Router mocking, navigation hooks, GraphQL queries

**Total: 24 passing tests** across 5 test files with comprehensive coverage of core functionality.

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
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Chakra UI + Apollo providers
├── components/            # React components
│   ├── AnimeCard.tsx     # Individual anime cards
│   ├── AnimeGrid.tsx     # Anime grid with pagination
│   ├── UserInfoModal.tsx # User authentication modal
│   └── Footer.tsx        # Challenge info
├── contexts/              # React Context
│   └── UserContext.tsx   # User state management
├── lib/                  # Configuration
│   └── apollo-client.ts  # Apollo Client setup
├── types/                # TypeScript definitions
│   ├── anime.ts          # AniList API types
│   └── user.ts           # User data types
├── utils/                # Utilities
│   └── localStorage.ts   # Browser storage
├── __tests__/            # Test suite
│   ├── AnimeCard.test.tsx    # Component tests (8 tests)
│   ├── AnimeGrid.test.tsx    # Grid component tests (7 tests)  
│   ├── Footer.test.tsx       # Footer component tests (2 tests)
│   ├── UserProfile.test.tsx  # User profile tests (2 tests)
│   └── localStorage.test.ts  # Utility tests (5 tests)
├── src/test/             # Test configuration
│   └── setup.ts          # Jest DOM setup
├── vitest.config.ts      # Vitest configuration
└── vercel.json           # Vercel config
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

---

**Challenge Version v3.5** • Built for Leonardo.AI • [Repository](https://github.com/NickProdromou/leo-web-team-challenge-2025)
