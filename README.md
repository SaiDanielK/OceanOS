# OceanOS 🌊
### Update: OceanOS 1.0 Ready!
### Update: OceanOS 2.0 Beta Deployed on Vercel and ready to Commit on Github!
### Update: OceanOS 2.0 has been published!
### Update: OceanOS 3.0 Beta: New info coming soon. Stay tuned for more updates!
Welcome to OceanOS, a beautifully crafted, ocean-themed desktop simulation built with Next.js and TypeScript. This project offers a feature-rich user experience that mimics a modern operating system, complete with a boot screen, draggable windows, a functional dock, and a suite of applications—all running within your web browser.

The primary goal of OceanOS is to showcase a polished and interactive user interface, demonstrating the power of modern web technologies to create complex, desktop-like applications.

## Features

OceanOS is packed with features that create a comprehensive and immersive desktop experience:

*   **Boot Sequence**: A realistic startup screen with a progress bar and system logs that plays a startup sound before loading the desktop.
*   **Desktop Environment**: A dynamic and customizable desktop with selectable wallpapers and themes.
*   **Window Management**:
    *   Powered by `react-rnd`, windows for all applications can be dragged, resized, and focused.
    *   Standard window controls for closing, maximizing, and minimizing.
    *   A smooth, custom animation for minimizing windows directly to their corresponding dock icon.
*   **Dock**: An interactive dock at the bottom of the screen with a macOS-style magnification effect on hover. It shows which apps are running and allows users to launch or restore them.
*   **Top Bar**: A persistent top menu bar displaying the current time and date, system status icons (Wi-Fi, Sound, Battery), and a "Shutdown" button.
*   **Widgets**:
    *   **Clock Widget**: A draggable analog and digital clock.
    *   **Weather Widget**: A draggable widget that fetches and displays live weather data based on the user's geolocation.
*   **Application Launcher**: A central search bar to quickly find and launch any of the installed applications.
*   **Context Menu**: A right-clickable context menu on the desktop for quick actions like opening system apps or closing all windows.

### Included Applications

OceanOS comes with a variety of built-in applications to explore:

*   **Files**: A basic file explorer interface.
*   **Web Browser**: An embedded Wikipedia browser.
*   **App Store**: A simulated store for viewing and managing applications.
*   **Ocean Shell**: A terminal/command-line interface.
*   **Settings**: An application to personalize the desktop wallpaper and theme.
*   **Music & Gallery**: Media applications for a complete OS feel.
*   **Utilities**: Essential apps like Notes, Calculator, Calendar, and Weather.
*   **And more**: Including a Camera app and even a "TikTok" app (a fun integration).

# Important Information about OceanOS:

## Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
