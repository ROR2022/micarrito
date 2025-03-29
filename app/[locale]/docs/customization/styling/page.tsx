import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function StylingPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.styling' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex provides a flexible styling system built on TailwindCSS and CSS variables.
          This approach allows for comprehensive customization of the visual appearance without
          modifying the core components. You can create a unique look for your marketplace
          while maintaining the functionality and structure of MarketFlex.
        </p>
        <p className="leading-7">
          The styling system is built around:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Tailwind CSS:</strong> For utility-based styling</li>
          <li><strong>CSS Variables:</strong> For global color schemes and design tokens</li>
          <li><strong>shadcn/ui:</strong> For customizable UI components</li>
          <li><strong>next-themes:</strong> For theme switching and dark mode support</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('tailwindConfig')}</h2>
        <p className="leading-7">
          The core of MarketFlex&apos;s styling system is the TailwindCSS configuration.
          You can customize this to reflect your brand&apos;s colors, typography, and other design elements.
        </p>

        <h3 className="text-xl font-semibold">Modifying the Tailwind Configuration</h3>
        <p className="leading-7">
          The main configuration file is located at <code>tailwind.config.ts</code>:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // ... keyframes definitions
      },
      animation: {
        // ... animation definitions
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-4">Custom Colors</h3>
        <p className="leading-7">
          To customize the colors for your marketplace, you can modify the color definitions in the 
          theme section. For example, to change the primary color:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Example of customizing primary color
extend: {
  colors: {
    primary: {
      DEFAULT: "#E94560",  // Your custom primary color
      foreground: "#FFFFFF",
    },
    // ... other colors
  }
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('themes')}</h2>
        <p className="leading-7">
          MarketFlex uses CSS variables for theme definition. These are defined in the <code>app/globals.css</code> file:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;  /* Blue */
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;  /* Lighter blue for dark mode */
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-4">Creating Custom Themes</h3>
        <p className="leading-7">
          You can create additional themes by defining new CSS classes with different variable values:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`/* Custom theme example */
.theme-marketplace {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 340 82% 52%;  /* Pink primary color */
  --primary-foreground: 0 0% 100%;
  /* ... other variables */
}

.dark.theme-marketplace {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 100%;
  --primary: 346 77% 49.8%;  /* Darker pink for dark mode */
  --primary-foreground: 0 0% 100%;
  /* ... other variables */
}`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-4">Theme Switching</h3>
        <p className="leading-7">
          MarketFlex uses <code>next-themes</code> for theme switching. You can customize the available themes:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={['light', 'dark', 'marketplace']}  // Add your custom theme
    >
      {children}
    </ThemeProvider>
  )
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('components')}</h2>
        <p className="leading-7">
          MarketFlex uses shadcn/ui components, which are built with Radix UI and styled with Tailwind CSS.
          You can customize these components by modifying their source files.
        </p>

        <h3 className="text-xl font-semibold">Component Customization</h3>
        <p className="leading-7">
          The components are located in the <code>components/ui</code> directory. To customize a component:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Find the component in the <code>components/ui</code> directory</li>
          <li>Make a copy of the component with your desired modifications</li>
          <li>Use your customized component instead of the original</li>
        </ol>

        <p className="leading-7 mt-4">
          For example, to customize the Button component:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Original: components/ui/button.tsx
// Customized version:

import { cva } from "class-variance-authority"
 
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Add your custom variant
        marketplace: "bg-emerald-600 text-white hover:bg-emerald-700", 
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        // Add your custom size
        xl: "h-12 rounded-md px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('layout')}</h2>
        <p className="leading-7">
          To customize the layout of your marketplace, you can modify the layout components in the <code>components/layout</code> directory.
        </p>

        <h3 className="text-xl font-semibold">Header Customization</h3>
        <p className="leading-7">
          The header is one of the most visible elements of your marketplace. You can customize it by:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Replacing the logo with your own</li>
          <li>Modifying the navigation links</li>
          <li>Adjusting the styling to match your brand</li>
        </ol>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Example of customizing the header logo
// components/layout/header.tsx

// Replace this:
<Link href="/" className="flex items-center space-x-2">
  <MarketplaceIcon className="h-6 w-6" />
  <span className="font-bold">MarketFlex</span>
</Link>

// With your custom logo:
<Link href="/" className="flex items-center space-x-2">
  <Image 
    src="/your-logo.svg" 
    alt="Your Marketplace" 
    width={32} 
    height={32} 
  />
  <span className="font-bold">Your Marketplace</span>
</Link>`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('typography')}</h2>
        <p className="leading-7">
          You can customize the typography of your marketplace by:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Changing the font family</li>
          <li>Adjusting font sizes, weights, and line heights</li>
          <li>Modifying text colors</li>
        </ol>

        <h3 className="text-xl font-semibold">Custom Fonts</h3>
        <p className="leading-7">
          MarketFlex uses Next.js font optimization. You can add custom fonts in the <code>app/layout.tsx</code> file:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// app/layout.tsx
import { Inter, Roboto, Playfair_Display } from 'next/font/google'

// Define your fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto' 
})
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair' 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${inter.variable} \${roboto.variable} \${playfair.variable}\`}>
        {children}
      </body>
    </html>
  )
}`}</code>
        </pre>

        <p className="leading-7 mt-4">
          Then update your Tailwind configuration to use these fonts:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-playfair)"],
        body: ["var(--font-roboto)"],
      },
    },
  },
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('images')}</h2>
        <p className="leading-7">
          Images play a crucial role in your marketplace&apos;s visual identity. You can customize:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Logo:</strong> Replace the default MarketFlex logo with your own</li>
          <li><strong>Icons:</strong> Use custom icons that match your brand style</li>
          <li><strong>Hero images:</strong> Replace the default hero images on landing pages</li>
          <li><strong>Background patterns:</strong> Add custom background patterns or textures</li>
        </ul>

        <h3 className="text-xl font-semibold">Image Optimization</h3>
        <p className="leading-7">
          MarketFlex uses Next.js Image component for optimization. When adding your own images, make sure to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the <code>Image</code> component from Next.js for automatic optimization</li>
          <li>Provide appropriate <code>width</code> and <code>height</code> attributes</li>
          <li>Use responsive images with appropriate sizes for different viewports</li>
          <li>Consider using WebP or AVIF formats for better performance</li>
        </ul>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Example of optimized image usage
import Image from 'next/image'

// In your component
<Image
  src="/hero-image.jpg"
  alt="Marketplace Hero"
  width={1200}
  height={600}
  priority
  className="rounded-lg object-cover"
  sizes="(max-width: 768px) 100vw, 1200px"
/>`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('bestPractices')}</h2>
        <p className="leading-7">
          When customizing the styling of your MarketFlex instance, follow these best practices:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Use design tokens:</strong> Leverage the CSS variables system instead of hardcoding colors and values.
          </li>
          <li>
            <strong>Maintain consistency:</strong> Ensure your customizations are consistent across all parts of the application.
          </li>
          <li>
            <strong>Test responsiveness:</strong> Verify that your customizations work well on all screen sizes.
          </li>
          <li>
            <strong>Preserve accessibility:</strong> Maintain good contrast ratios and ensure interactive elements remain accessible.
          </li>
          <li>
            <strong>Performance considerations:</strong> Optimize images and minimize CSS size to maintain good performance.
          </li>
          <li>
            <strong>Version your changes:</strong> Track your customizations in your version control system for easier updates.
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/customization/dynamic-fields`} className="text-primary hover:underline">
          ← {t('dynamicFields')}
        </Link>
        <Link href={`/${locale}/docs/development`} className="text-primary hover:underline">
          {t('development')} →
        </Link>
      </div>
    </div>
  );
} 