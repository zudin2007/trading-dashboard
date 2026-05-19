# ⚡ QUICK START GUIDE

## 🚀 **1 MENIT SETUP**

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm start

# 3. Open browser
# Dashboard terbuka di http://localhost:3000
```

---

## 📤 **DEPLOY KE ONLINE (5 MENIT)**

### **Langkah 1: Push ke GitHub**
```bash
git add .
git commit -m "Initial commit"
git push
```

### **Langkah 2: Deploy ke Vercel**
1. Kunjungi https://vercel.com
2. Login dengan GitHub
3. Import repository: `trading-dashboard`
4. Klik "Deploy"
5. ✅ Selesai!

Dapatkan URL seperti: `https://trading-dashboard-xxx.vercel.app`

---

## 📋 **PROJECT FILES**

```
trading-dashboard/
├── src/
│   ├── TradingDashboard.jsx  ← Main component (edit di sini)
│   ├── App.jsx
│   └── index.jsx
├── public/
│   └── index.html
├── package.json             ← Dependencies
├── README.md               ← Full documentation
└── DEPLOYMENT_GUIDE.md    ← Detailed deployment steps
```

---

## 🎨 **CUSTOMIZE DASHBOARD**

### Edit Portfolio Names
File: `src/TradingDashboard.jsx` → Line 9
```jsx
global: { name: 'GLOBAL', ... },
ihsg: { name: 'IHSG', ... },
crypto: { name: 'KRIPTO', ... }
```

### Edit Colors
Line: ~140 (Gold color)
```jsx
background: 'linear-gradient(135deg, #d4af37, #f0d070)'
```

Alternative colors:
- **Blue**: `#3b82f6` → `#1e40af`
- **Green**: `#10b981` → `#047857`
- **Purple**: `#a855f7` → `#7c3aed`

---

## 🔄 **UPDATE AFTER DEPLOY**

```bash
# Edit code
npm start  # Test locally

# Push to GitHub
git add .
git commit -m "Update description"
git push

# Vercel otomatis redeploy! ✅
```

---

## 💾 **BACKUP & RESTORE**

**Backup** (automatic di GitHub):
- Semua code tersimpan di GitHub
- Kalau computer rusak, code aman

**Restore**:
```bash
git clone https://github.com/USERNAME/trading-dashboard.git
cd trading-dashboard
npm install
npm start
```

---

## 📱 **TEST RESPONSIVE**

Browser DevTools: `F12` → Klik device icon → Pilih mobile

Cek di:
- iPhone
- Android
- iPad
- Desktop

---

## 🆘 **HELP & SUPPORT**

- **Local error?** → Run `npm install` again
- **Deploy error?** → Check `vercel.json`
- **Design issue?** → Edit `TradingDashboard.jsx`

Read full docs: `README.md`

---

## 📊 **DASHBOARD STRUCTURE**

```
Top Section: 3 Portfolio Cards
├── GLOBAL ($27,586 USD)
├── IHSG (Rp100,000,000 IDR)
└── KRIPTO ($50,000 USD)

Bottom Section: Trading Positions Table
├── Add Position Button
├── Positions Table with calculations
│   ├── Emiten, Buy Price, SL
│   ├── Range %, Risk Nominal
│   ├── Lot Buy (PENTING!), Nominal Buy
│   └── Delete Button
└── Info Panel
```

---

## ⭐ **KEY FEATURES**

✅ Real-time calculations  
✅ Multi-currency support (IDR, USD)  
✅ Crypto trading support  
✅ Fee calculations included  
✅ Privacy toggle (hide sensitive data)  
✅ Responsive design  
✅ Add/edit/delete positions  

---

**Ready to deploy? Start with Step 1 above! 🚀**

