# Production Deployment Guide

## Pre-Deployment Checklist

✅ Production build completed successfully
✅ All dependencies installed
✅ Static assets optimized
✅ TypeScript compilation passed

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub/GitLab/Bitbucket
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js and configure settings
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts. For production:
   ```bash
   vercel --prod
   ```

#### Environment Variables (if needed):
- Add any required environment variables in Vercel Dashboard → Project Settings → Environment Variables

#### Build Settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

---

### Option 2: Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Click "Deploy site"

3. **Deploy via CLI**:
   ```bash
   netlify deploy --prod
   ```

---

### Option 3: AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
5. Deploy

---

### Option 4: Self-Hosted (VPS/Server)

#### Prerequisites:
- Node.js 18+ installed
- PM2 (process manager) recommended

#### Steps:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Install PM2**:
   ```bash
   npm install -g pm2
   ```

3. **Start the application**:
   ```bash
   npm start
   ```
   Or with PM2:
   ```bash
   pm2 start npm --name "kscmmc" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx** (reverse proxy):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Set up SSL** (Let's Encrypt):
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

---

## Build Output

The production build creates:
- `.next/` - Optimized production build
- Static pages pre-rendered
- Dynamic routes configured
- Image optimization enabled

## Important Notes

1. **Port Configuration**: 
   - Default Next.js production port is `3000`
   - Change in `package.json` if needed: `"start": "next start -p 3000"`

2. **Environment Variables**:
   - Create `.env.production` for production-specific variables
   - Never commit `.env` files to Git

3. **Image Optimization**:
   - Next.js Image component is configured
   - Remote images from placehold.co, unsplash.com, picsum.photos are allowed

4. **Static Assets**:
   - All assets in `/public` folder are served automatically
   - Banner images: `/public/banner/`
   - Product images: `/public/products/` and `/public/Machinery/`
   - Company images: `/public/company/`
   - Team images: `/public/team/`

## Post-Deployment

1. **Verify deployment**:
   - Check all pages load correctly
   - Test navigation
   - Verify images load
   - Test forms and interactive elements

2. **Performance**:
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Optimize images if needed

3. **Monitoring**:
   - Set up error tracking (Sentry, etc.)
   - Monitor uptime
   - Track analytics

## Troubleshooting

### Build Errors:
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild
- Check for TypeScript errors: `npm run typecheck`

### Runtime Errors:
- Check server logs
- Verify environment variables
- Check database/API connections

### Image Loading Issues:
- Verify image paths in `/public` folder
- Check `next.config.ts` remote patterns
- Ensure images are optimized

## Support

For deployment issues, check:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

