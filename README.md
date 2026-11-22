# LibreFind Web

LibreFind Web is the Astro frontend for discovering, submitting, and moderating free and open-source software alternatives.

## Features

- Email/password, GitHub OAuth, anonymous, and password-reset authentication through Supabase
- Submission forms for FOSS alternatives, proprietary targets, and app linking
- Community moderation queue with search, filters, sorting, pagination, and voting
- Submission detail dialog with repository links and source metadata
- Impact statistics and community moderation tools
- Responsive Tailwind CSS interface with a monochrome theme

## Development

Requirements:

- Node.js
- npm
- A Supabase project

Clone the repository:

```sh
git clone https://codeberg.org/jksalcedo/librefind-web.git
cd librefind-web
npm install
```

Configure Supabase environment variables:

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```sh
npm run dev
```

Astro typically serves the site at `http://localhost:4321`.

## Scripts

```sh
npm run dev      # Start the Astro development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm start        # Start the Astro development server
```

## Routes

- `/` - LibreFind overview
- `/submit` - Authenticate and submit alternatives or proprietary targets
- `/community` - Browse and vote on pending community submissions

## Contributing

Contributions are welcome. Create a branch, make focused changes, run `npm run build`, and open a pull request on Codeberg.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
