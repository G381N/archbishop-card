# Archbishop Digital Business Card

A fully responsive, animated, single-page business card website for **MAR ILIOS YOHANAN KURIAKOSE**, Metropolitan Archbishop & Apostolic Nuncio of Asia.

## 🎯 Overview

This elegant digital business card is designed to be the landing page users see when they scan a QR code from a printed business card. The site features a religious, formal, and respectful theme with symbolic design elements.

## ✨ Features

### 🎨 Design
- **Religious Theme**: Soft golden accents, subtle crosses (††), stained-glass-inspired visuals
- **Typography**: Serif fonts (Merriweather, Playfair Display) for names and titles, clean sans-serif for content
- **Responsive**: Mobile-first design, fully optimized for all screen sizes
- **Animations**: Framer Motion for fade-ins, button hovers, and smooth transitions

### 📱 Functionality
- **Add to Contacts**: One-click vCard (.vcf) download with all contact details
- **QR Code**: Display and download QR code linking to the page
- **Share Features**:
  - WhatsApp sharing with prefilled message
  - SMS sharing with link
  - Instagram link copying
  - Direct link copying with toast notifications
- **Mobile Number Input**: Optional field for targeted sharing to specific contacts

### 🏢 Contact Information
- **India Office**: Saint Francis of Assisi Cathedral, Calicut, Kerala
- **USA Office**: Cathedral & Abbey of St. Anthony, Detroit, Michigan
- Complete contact details with clickable phone numbers and email

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom religious theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **QR Code**: qrcode.react
- **Notifications**: React Hot Toast
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd archbishop-card
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy automatically with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Configure custom domain if needed

### Other Platforms
The project generates static files and can be deployed to any static hosting service.

## 📋 Customization

### Updating Contact Information
Edit the contact details in `/src/components/BusinessCard.tsx`:
- Names and titles
- Office addresses
- Phone numbers
- Email addresses

### Modifying Colors and Theme
Update the color palette in `/tailwind.config.ts`:
- `parchment`: Background colors
- `gold`: Accent colors
- `sacred`: Text and border colors

### Adding New Features
The component structure is modular and can be easily extended:
- `/src/components/BusinessCard.tsx`: Main component
- `/src/components/utils.ts`: Utility functions
- `/src/app/globals.css`: Global styles

## 🎨 Design Elements

### Color Palette
- **Parchment**: Light ivory backgrounds (#fdf9f0)
- **Gold**: Sacred golden accents (#f6af09)
- **Sacred**: Formal text colors (#2c1810)

### Fonts
- **Merriweather**: Primary serif font for names and titles
- **Playfair Display**: Alternative serif for emphasis
- **Inter**: Clean sans-serif for body text

### Animations
- Fade-in effects on page load
- Hover animations on interactive elements
- Smooth transitions between states
- Subtle glow effects on key elements

## 📱 Mobile Optimization

- Touch-friendly button sizes
- Optimized layouts for small screens
- Fast loading with optimized images
- Native mobile sharing integration

## 🔧 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## 📄 License

This project is created for ECCLESIA CATHOLICA ECUMENICA CHRISTI (ECCC) – INDIA.

## 🤝 Support

For technical support or customization requests, please contact the development team.

---

**ECCLESIA CATHOLICA ECUMENICA CHRISTI (ECCC) – INDIA**  
*Digital presence for religious leadership*
