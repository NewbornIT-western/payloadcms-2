<div align="center">

# 🗺️ Payload CMS with Mapbox Integration

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-3.0-blue?style=flat-square)](https://payloadcms.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Mapbox](https://img.shields.io/badge/Mapbox-GL_JS-green?style=flat-square&logo=mapbox)](https://www.mapbox.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**A modern Content Management System featuring advanced Mapbox GL JS integration for interactive 3D mapping capabilities.**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-using-the-map-block) • [Deployment](#-deployment)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Core Features

- ⚡ **Payload CMS 3.0** - Headless CMS with MongoDB
- 🚀 **Next.js 15** - React framework with App Router
- 💎 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **Shadcn/ui** - Beautiful UI components

</td>
<td width="50%">

### 🗺️ Mapbox Features

- 🎨 **Multiple Styles** - 7 presets + custom URLs
- 🏢 **3D Buildings** - Height-based gradient colors
- ⛰️ **3D Terrain** - Realistic elevation display
- 🖱️ **Interactive** - Click to query building/terrain data
- 📍 **Custom Markers** - Configurable with popups
- ⚙️ **Admin Control** - Enable/disable all features in CMS

</td>
</tr>
</table>

### 🎨 3D Buildings Color Gradient

Buildings are colored based on their height for better visualization:

```
🔴 200m+ → Red      (#ef4444)
🟡 100m  → Yellow   (#eab308)
🟢 50m   → Green    (#22c55e)
🔵 20m   → Blue     (#3b82f6)
⚫ 0m    → Gray     (#4b5563)
```

---

## 🚀 Quick Start

### Prerequisites

- 📦 Node.js 18+ and pnpm
- 🗄️ MongoDB database
- 🔑 [Mapbox access token](https://account.mapbox.com/) (free tier available)

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/NewbornIT-western/payloadcms-2.git
cd payloadcms-2/plcms

# 2️⃣ Install dependencies
pnpm install

# 3️⃣ Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4️⃣ Start development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file:

```env
# 🗄️ Database
MONGODB_URI=mongodb://localhost:27017/payloadcms

# 🔐 Payload
PAYLOAD_SECRET=your-secret-key-here

# 🗺️ Mapbox (Required for map features)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token_here
```

> 💡 **Tip:** Get your free Mapbox token at [mapbox.com/signup](https://account.mapbox.com/)

---

## 📦 Project Structure

```
plcms/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 (frontend)/           # 🌐 Public-facing pages
│   │   │   ├── 📁 components/       # 🧩 Frontend components
│   │   │   │   ├── 🗺️ MapBlock.tsx  # Main Mapbox component
│   │   │   │   ├── HeroBlock.tsx
│   │   │   │   └── ...
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── 📁 (payload)/            # ⚙️ Admin panel
│   ├── 📁 Blocks/                   # 📋 CMS Block definitions
│   │   └── MapBlock.tsx             # Map block schema
│   ├── 📁 collections/              # 🗂️ Payload collections
│   │   ├── Users.ts
│   │   ├── Layers.ts
│   │   └── Media.ts
│   ├── 📁 components/               # 🎨 Shared components
│   │   └── 📁 ui/                   # Shadcn/ui components
│   └── payload.config.ts            # ⚙️ Payload configuration
├── 📁 public/
├── .env.local
└── package.json
```

---

## 🗺️ Using the Map Block

### Admin Panel Configuration

<table>
<tr>
<td width="33%">

#### 📍 Basic Settings

- **Heading** - Map title
- **Lat/Lng** - Center coordinates
- **Zoom** - Level (1-20)
- **Height** - Size in pixels

</td>
<td width="33%">

#### 🎨 Style Settings

- **Map Style** - 7 presets:
  - 🌙 Dark
  - ☀️ Light
  - 🛣️ Streets
  - 🏞️ Outdoors
  - 🛰️ Satellite
  - 🧭 Navigation (Day/Night)
- **Custom URL** - Your own style

</td>
<td width="33%">

#### ⚙️ Advanced Features

- ☑️ **3D Buildings**
  - Height-based colors
  - Click for info
  - Hover effects
- ☑️ **3D Terrain**
  - Elevation display
  - Adjustable exaggeration

</td>
</tr>
</table>

### Getting Map Data

Open browser console (F12) and click on the map:

```javascript
// 🏢 Click on a 3D building
{
  height: 45.5,
  minHeight: 0,
  type: "building",
  name: "Office Building",
  coordinates: {...}
}

// ⛰️ Click anywhere for terrain elevation
{
  elevation: 12.34,
  lat: 10.036728,
  lng: 105.774305
}
```

---

## 🎨 Customization

### Map Styles

**Option 1: Use Presets**
Select from 7 built-in styles in the admin panel.

**Option 2: Custom Style**

1. Create a style in [Mapbox Studio](https://studio.mapbox.com/)
2. Copy the style URL: `mapbox://styles/username/style-id`
3. Paste into **Custom Map Style URL** field
4. Save and refresh!

### Building Colors

Edit `src/app/(frontend)/components/MapBlock.tsx`:

```typescript
'fill-extrusion-color': [
  'interpolate',
  ['linear'],
  ['get', 'height'],
  0,   '#4b5563',  // 🌫️ 0m: Dark gray
  20,  '#3b82f6',  // 🔵 20m: Blue
  50,  '#22c55e',  // 🟢 50m: Green
  100, '#eab308',  // 🟡 100m: Yellow
  200, '#ef4444'   // 🔴 200m+: Red
]
```

### Terrain Exaggeration

```typescript
map.current.setTerrain({
  source: 'mapbox-dem',
  exaggeration: 3, // 📈 Adjust 1-5 for more/less dramatic effect
})
```

---

## 🐳 Docker Support

Use Docker for local MongoDB:

```bash
# Start MongoDB container
docker-compose up -d

# Update .env.local
MONGODB_URI=mongodb://127.0.0.1:27017/payloadcms
```

---

## 📝 Available Scripts

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `pnpm dev`            | 🚀 Start development server      |
| `pnpm build`          | 📦 Build for production          |
| `pnpm start`          | ▶️ Start production server       |
| `pnpm lint`           | 🔍 Run ESLint                    |
| `pnpm generate:types` | 📝 Generate TypeScript types     |
| `pnpm test`           | 🧪 Run tests (integration + e2e) |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Payload Cloud

1. Push to GitHub
2. Connect repo in [Payload Cloud](https://payloadcms.com/cloud)
3. Configure environment variables
4. Deploy! 🎉

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
PAYLOAD_SECRET=your-secure-secret-key
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token
NODE_ENV=production
```

---

## 📚 Documentation & Resources

| Resource             | Link                                                                  |
| -------------------- | --------------------------------------------------------------------- |
| 📖 Payload CMS Docs  | [payloadcms.com/docs](https://payloadcms.com/docs)                    |
| 🗺️ Mapbox GL JS Docs | [docs.mapbox.com/mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js/) |
| ⚡ Next.js Docs      | [nextjs.org/docs](https://nextjs.org/docs)                            |
| 🎨 Tailwind CSS Docs | [tailwindcss.com/docs](https://tailwindcss.com/docs)                  |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch: `git checkout -b feature/amazing-feature`
3. 💬 Commit your changes: `git commit -m 'Add amazing feature'`
4. 📤 Push to the branch: `git push origin feature/amazing-feature`
5. 🎉 Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - feel free to use for personal or commercial purposes.

---

## 🙋 Support & Community

Need help? Here are your options:

- 💬 [Create an issue](https://github.com/NewbornIT-western/payloadcms-2/issues) on GitHub
- 💬 Join [Payload CMS Discord](https://discord.gg/payload)
- 📧 Contact [Mapbox Support](https://support.mapbox.com/)

---

## 🎉 Acknowledgments

This project wouldn't be possible without these amazing tools:

- [Payload CMS](https://payloadcms.com/) - 🚀 Amazing headless CMS
- [Mapbox](https://www.mapbox.com/) - 🗺️ Powerful mapping platform
- [Next.js](https://nextjs.org/) - ⚡ The React Framework
- [Vercel](https://vercel.com/) - 📦 Deployment platform
- [Shadcn/ui](https://ui.shadcn.com/) - 🎨 Beautiful UI components

---

<div align="center">

**Built with ❤️ by [NewbornIT-western](https://github.com/NewbornIT-western)**

⭐ Star this repo if you find it helpful!

</div>
