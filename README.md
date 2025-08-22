# Woody's Removal Service Website

A professional, responsive website for Woody's Removal Service - specializing in mattress and junk removal services. Built with React and inspired by LoadUp's clean, trustworthy design.

![Woody's Removal Service](https://images.unsplash.com/photo-1729628371767-7a833756b8b5)

## 🚀 Features

- **Professional Design**: Clean, trustworthy layout inspired by LoadUp
- **Responsive**: Mobile-first design that works on all devices
- **Three Main Pages**: 
  - Home (hero, services, testimonials, CTA)
  - Order (service selection with LoadUp iframe placeholder)
  - Contact (contact form with company information)
- **Animated Elements**: Smooth animations and hover effects
- **Trust Indicators**: Customer reviews, ratings, and guarantees
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18+ with modern hooks
- **Styling**: Tailwind CSS with custom animations
- **Components**: Shadcn/UI component library
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form with validation
- **Notifications**: Sonner for toast messages

## 📁 Project Structure

```
/app/
├── frontend/
│   ├── public/
│   │   ├── index.html          # Main HTML template
│   │   └── favicon.svg         # Custom Woody's favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Shadcn/UI components
│   │   │   ├── Header.jsx      # Navigation header
│   │   │   └── Footer.jsx      # Site footer
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Homepage
│   │   │   ├── Order.jsx       # Order page with iframe placeholder
│   │   │   └── Contact.jsx     # Contact page with form
│   │   ├── data/
│   │   │   └── mock.js         # Sample data for services, testimonials
│   │   ├── App.js              # Main app component
│   │   ├── App.css             # Custom styles and animations
│   │   └── index.css           # Tailwind and base styles
│   └── package.json            # Dependencies and scripts
└── backend/                    # FastAPI backend (optional/future use)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd woodys-removal-service
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`

## 🌐 GitHub Pages Deployment

### Method 1: Using gh-pages package

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://yourusername.github.io/repo-name"
   }
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

### Method 2: Using GitHub Actions

1. **Create `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'
             
         - name: Install dependencies
           run: |
             cd frontend
             npm install
             
         - name: Build
           run: |
             cd frontend
             npm run build
             
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/build
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch

## 🔧 LoadUp Iframe Integration

To add the real LoadUp iframe to the Order page:

1. **Locate the placeholder in `/src/pages/Order.jsx`**
   ```jsx
   {/* IFRAME PLACEHOLDER - This is where you'll add the LoadUp iframe */}
   <div className="iframe-placeholder">
     <!-- Replace this entire div -->
   </div>
   {/* END IFRAME PLACEHOLDER */}
   ```

2. **Replace with LoadUp iframe**
   ```jsx
   <iframe 
     src="YOUR_LOADUP_URL_HERE"
     width="100%"
     height="800px"
     frameBorder="0"
     title="LoadUp Order System"
     className="rounded-lg shadow-lg"
   >
   </iframe>
   ```

3. **Adjust styling as needed**
   - Modify height based on LoadUp's requirements
   - Add responsive breakpoints if necessary

## 🎨 Customization

### Colors
The site uses an emerald green color scheme. To change:

1. **Update Tailwind colors in `tailwind.config.js`**
2. **Modify CSS custom properties in `index.css`**
3. **Update theme color in `public/index.html`**

### Content
1. **Services**: Edit `/src/data/mock.js`
2. **Contact Info**: Update phone numbers and email in components
3. **Company Name**: Search and replace "Woody's" throughout the codebase

### Images
Replace image URLs in:
- Homepage hero section (`/src/pages/Home.jsx`)
- Service cards
- Favicon (`/public/favicon.svg`)

## 📱 Mobile Responsiveness

The site is fully responsive with:
- Mobile-first design approach
- Collapsible navigation menu
- Optimized image sizing
- Touch-friendly buttons and forms

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on desktop and mobile
- [ ] Forms submit successfully
- [ ] Images load and display properly
- [ ] Animations and hover effects work
- [ ] Site is responsive across device sizes

### Browser Compatibility
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security & Privacy

- No sensitive data stored in frontend
- Form submissions use proper validation
- HTTPS recommended for production
- Contact form data should be processed securely

## 📈 SEO Features

- Semantic HTML structure
- Meta tags for description, keywords
- Proper heading hierarchy
- Alt text for images
- Fast loading times
- Mobile-friendly design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or questions:

- **Website**: Your deployed site URL
- **Email**: info@woodysremoval.com
- **Phone**: (555) 123-JUNK

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from LoadUp.com
- Images from Unsplash
- Icons from Lucide React
- UI components from Shadcn/UI

---

**Built with ❤️ for Woody's Removal Service**
