This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Make sure to do the Npm install in the root before running the application in the localhost.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

The application consists of two parts the Home page where all the items are shown in a css grid. It also provides a responsive design by using sass and the Image component from NextJS. Instead of the hover effect for the tiles I decided to use an onClick mechanic, because the hover effect can't be used on mobile devices and the mechanic becomes
more consistent with differen devices. 

The tech stack includes:
React
NextJS 
Sass with Scss

Beacuse of the time pressure of one day I had to miss some stuff, which I would do usually. I would create for the item list which consists of different tiles to two
templates. One part would be the tiles itself. They are holding the information for the tile to show up and to do it more type secure the tile should hold it on interface.

The second template would be the list of tiles. But since I did not use redux for this small application I decided to put everything in one template and although to repeat
the code for the favorites again.