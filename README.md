# OwaisTask

A small Expo (React Native + TypeScript) app demonstrating a wallet and basic investing flow. It focuses on clean structure, predictable state, and clear UI.

## Screens

- **Home**: Balance summary and a list of investment opportunities.
- **Wallet**: Balance summary and a transactions list (newest first).
- **Opportunity Details**: Opportunity information and an action to invest 1,000 SAR.

## Data & State Management

- **Context**: A single `WalletProvider` exposes balances, transactions, opportunities, loading flags, a `refreshAll` method, and `investInOpportunity`.
- **Initialization**: On mount, the provider fetches balances, transactions, and opportunities using mocked API functions with small artificial delays.
- **Transactions**: Stored in context; sorted by descending date. New actions (successful invests) prepend a transaction to the list.
- **Refresh**: Pull-to-refresh on Home and Wallet calls `refreshAll`.

## Money Handling

- **Currency**: `formatCurrencySAR` renders values as `#,###.## SAR` (e.g., `8,500.00 SAR`).
- **Totals**: The balance summary shows Available, Invested, and Total. Total is derived as $\text{Total} = \text{Available} + \text{Invested}$.

## Investment Flow

- **Validation**: `investInOpportunity(id, amount)` checks:
  - Wallet is loaded
  - Available balance ≥ amount
  - Opportunity exists
  - Amount ≥ minimum investment
- **Success**: Deducts from available, adds to invested, and appends a new `INVEST` transaction.
- **Failure**: Returns a clear error; the screen shows an alert and no state changes are made.
- **UX**: The "Invest 1,000 SAR" button remains enabled; it only disables while submitting.

## Navigation

- **Tabs**: Two bottom tabs (Home, Wallet) with black outlined icons and no labels. Active tab uses the filled icon.
- **Stack**: A native stack sits above tabs and presents Opportunity Details. The details screen uses a lightweight custom header (back arrow + centered title).

## UI Conventions

- **Safe Areas**: `SafeAreaProvider` at the root and `SafeAreaView` per screen.
- **Design Tokens**: Colors, spacing, radii, typography, and shadows live in `src/theme/tokens.ts`. Components reference these tokens for consistency.
- **Cards**: Lists render items as elevated surfaces for clarity.
- **Styles**: Inline style objects were removed in favor of `StyleSheet.create` with shared tokens.

## Project Structure

```
src/
  api/            # mocked API functions
  components/     # reusable UI pieces (BalanceSummary, Section, etc.)
  context/        # WalletProvider and hook
  navigation/     # bottom tabs + root stack
  screens/        # Home, Wallet, OpportunityDetails
  theme/          # design tokens
  types/          # TypeScript types
  utils/          # formatting helpers
```

## Running

```sh
npm install
npm run start -- --clear
```

Use iOS Simulator or Expo Go to open the app.

## Notes

- **Expo**: Babel is configured with the Expo preset and Reanimated plugin.
- **Mock Data**: No backend is required; the mocked API simulates small delays.

## What I’d Improve With More Time

- **Persistence**: Store wallet state locally (e.g., AsyncStorage) and hydrate on launch.
- **Theming**: Add dark mode and a simple theme switcher.
- **Accessibility**: Larger touch targets, improved contrast, and full VoiceOver labels.
- **Error Handling**: Centralize alerts and error surfaces; add inline error banners.
- **Animations**: Subtle transitions on card presses and list updates.
- **Testing**: Unit tests for formatting helpers and provider logic; integration tests for the invest flow.# OwaisTask
