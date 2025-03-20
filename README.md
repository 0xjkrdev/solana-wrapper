# SOL Wrapper

![SOL Wrapper](Demo_sol_wrapper.mp4) <!-- Replace with your project screenshot -->

A modern, user-friendly application for wrapping and unwrapping SOL tokens on the Solana blockchain. SOL Wrapper allows users to easily convert between native SOL and wrapped SOL (wSOL), enabling seamless interaction with Solana's DeFi ecosystem.

## 🌟 Features

- **Simple Conversion**: Easily wrap SOL to wSOL and unwrap wSOL back to SOL
- **Real-time Balances**: View your SOL and wSOL balances with automatic updates
- **Live Blockchain Data**: Display of the latest Solana block height with real-time updates
- **Transaction Notifications**: Beautiful toast notifications for transaction status
- **Balance Validation**: Prevents transactions with insufficient funds
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **User Feedback System**: Integrated Sentry for bug reports and feature requests
- **Comprehensive Documentation**: Detailed docs explaining the purpose and usage

## 🛠️ Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling
- **Solana Web3.js**: For blockchain interactions
- **Solana SPL Token**: For token operations
- **Solana Wallet Adapter**: For wallet connections
- **Sentry**: For error tracking and user feedback
- **Lucide React**: For icons

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- A Solana wallet (Phantom, Solflare, etc.)
- Basic understanding of Solana and SPL tokens

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/0xjkrdev/sol-wrapper.git
cd sol-wrapper
 ```

2. Install dependencies:

```shellscript
npm install
# or
yarn
```


3. Set up environment variables:
Create a `.env.local` file in the root directory with the following:

```plaintext
NEXT_PUBLIC_SOLANA_RPC_URL=https://solana-rpc.publicnode.com
SENTRY_DSN=your_sentry_dsn_here
```


4. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


5. Open [http://localhost:3000](http://localhost:3000) in your browser.


### Building for Production

1. Build the application:

```shellscript
npm run build
# or
yarn build
```


2. Start the production server:

```shellscript
npm run start
# or
yarn start
```


### Deployment

#### Deploying to Vercel

The easiest way to deploy your SOL Wrapper application is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a GitHub repository
2. Import your project into Vercel
3. Add the required environment variables in the Vercel dashboard
4. Deploy!


## 💻 Usage

### Wrapping SOL to wSOL

1. Connect your Solana wallet using the "Connect Wallet" button
2. Ensure you have SOL in your wallet
3. Enter the amount of SOL you want to wrap
4. Click the "Wrap SOL" button
5. Approve the transaction in your wallet
6. Wait for the transaction confirmation


### Unwrapping wSOL to SOL

1. Connect your Solana wallet
2. Click "Switch to Unwrap" to change to unwrap mode
3. Enter the amount of wSOL you want to unwrap
4. Click the "Unwrap wSOL" button
5. Approve the transaction in your wallet
6. Wait for the transaction confirmation


## 🧩 Project Structure

```plaintext
sol-wrapper/
├── app/                  # Next.js App Router
│   ├── components/       # React components
│   │   ├── block-height.tsx     # Block height display component
│   │   ├── footer.tsx           # Footer component
│   │   ├── hero.tsx             # Hero section component
│   │   ├── navbar.tsx           # Navigation bar component
│   │   ├── sentry-feedback.tsx  # Sentry feedback component
│   │   ├── swap.tsx             # Main swap component
│   │   ├── toast-provider.tsx   # Toast notification system
│   │   └── wallet-provider.tsx  # Solana wallet provider
│   ├── docs/             # Documentation pages
│   ├── swap/             # Swap page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
├── .env.local            # Environment variables (create this)
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── sentry.client.config.ts  # Sentry client configuration
├── sentry.server.config.ts  # Sentry server configuration
├── sentry.edge.config.ts    # Sentry edge configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_SOLANA_RPC_URL`: The Solana RPC endpoint to use for blockchain interactions
- `SENTRY_DSN`: Your Sentry DSN for error tracking and user feedback


### Solana RPC Endpoints

You can use various Solana RPC endpoints:

- Public endpoints (free but rate-limited):

- `https://solana-rpc.publicnode.com`



- 3rd party RPC endpoints :

- [QuickNode](https://www.quicknode.com/)
- [Alchemy](https://www.alchemy.com/)
- [Helius](https://helius.xyz/)





### Customization

You can customize the application by modifying:

- `tailwind.config.js`: Change the color scheme and other design elements
- `app/components/swap.tsx`: Modify the swap functionality
- `app/components/toast-provider.tsx`: Customize toast notifications
- `app/globals.css`: Update global styles


## 🧪 Testing

TO DO ! 
Run the test suite:

```shellscript
npm test
# or
yarn test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📝 License

This project is licensed under the MIT License

## 🙏 Acknowledgements

- [Solana](https://solana.com/) - For the blockchain platform
- [Next.js](https://nextjs.org/) - For the React framework
- [Tailwind CSS](https://tailwindcss.com/) - For the styling framework
- [Vercel](https://vercel.com/) - For hosting
- [Sentry](https://sentry.io/) - For error tracking
- All contributors who have helped this project grow


## 📧 Contact

0xjkrdev - [GitHub](https://github.com/0xjkrdev)

Project Link: [https://github.com/0xjkrdev/sol-wrapper](https://github.com/0xjkrdev/sol-wrapper)