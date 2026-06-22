# 📊 Trading Money Management Dashboard

Professional **Trading Money Management Calculator** - Dashboard untuk manajemen risiko trading yang otomatis menghitung ukuran posisi (Lot Buy) yang aman berdasarkan modal dan batasan risiko.

## 🌐 Live Demo
**[Klik di sini ](https://agent-6a389d7daf6748786d5--ifbtc-moneymanagement.netlify.app/)))** *(akan diupdate setelah deploy)*

---

## ✨ Fitur Utama

✅ **3 Portfolio Management**: GLOBAL (USD), IHSG (IDR), KRIPTO (USD)  
✅ **Automatic Risk Calculation**: Hitung nominal risiko otomatis dari RPT  
✅ **Smart Lot Buy Calculator**: Ukuran posisi yang aman dengan mempertimbangkan fee  
✅ **Real-time Updates**: Semua perhitungan update secara instant  
✅ **Responsive Design**: Optimal di desktop, tablet, dan mobile  
✅ **Privacy Toggle**: Sembunyikan nominal sensitif  
✅ **Multi-currency Support**: IDR, USD, dan cryptocurrency  

---

## 📋 Struktur Project

```
trading-money-management-dashboard/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── App.jsx              # Main App component
│   ├── App.css              # App styles
│   ├── TradingDashboard.jsx # Dashboard component
│   ├── index.jsx            # React entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies
├── README.md                # Documentation
├── .gitignore               # Git ignore rules
└── vercel.json              # Vercel deployment config
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 14+ ([Download](https://nodejs.org))
- Git ([Download](https://git-scm.com))
- GitHub account

### 1️⃣ Clone Repository (atau Download)

**Option A: Clone dari GitHub**
```bash
git clone https://github.com/USERNAME/trading-money-management-dashboard.git
cd trading-money-management-dashboard
```

**Option B: Download sebagai ZIP**
1. Download semua file dari repository
2. Extract ke folder

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run Locally
```bash
npm start
```
Aplikasi akan terbuka di `http://localhost:3000`

---

## 🌐 Deployment ke Online (FREE)

### **OPTION 1: Deploy ke Vercel (Recommended - Paling Mudah)**

#### Step 1: Setup GitHub Repository
1. Buat GitHub account di [github.com](https://github.com)
2. Buat repository baru bernama `trading-dashboard`
3. Clone repository kosong ke local:
   ```bash
   git clone https://github.com/USERNAME/trading-dashboard.git
   cd trading-dashboard
   ```
4. Copy semua file project ke folder ini
5. Push ke GitHub:
   ```bash
   git add .
   git commit -m "Initial commit: Trading Dashboard"
   git push -u origin main
   ```

#### Step 2: Deploy ke Vercel
1. Kunjungi [vercel.com](https://vercel.com)
2. Sign up dengan GitHub account
3. Klik **"New Project"**
4. Pilih repository `trading-dashboard`
5. Klik **"Deploy"** → Tunggu selesai
6. ✅ Dashboard sudah live! URL akan seperti: `https://trading-dashboard-xxx.vercel.app`

**Selesai dalam 2 menit!** 🎉

---

### **OPTION 2: Deploy ke Netlify**

1. Kunjungi [netlify.com](https://netlify.com)
2. Klik **"Connect to Git"**
3. Pilih GitHub → Authorize
4. Pilih repository `trading-dashboard`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Klik **"Deploy"** → Selesai!

**URL**: `https://trading-dashboard-xxx.netlify.app`

---

### **OPTION 3: Deploy ke GitHub Pages**

1. Update `package.json`:
   ```json
   "homepage": "https://USERNAME.github.io/trading-dashboard"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Update scripts di `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     "start": "react-scripts start",
     "build": "react-scripts build"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. GitHub Settings → Pages → Pilih branch `gh-pages`

**URL**: `https://USERNAME.github.io/trading-dashboard`

---

## 📖 Cara Menggunakan Dashboard

### 1. **Setup Portfolio Parameters (Atas)**
- Isi **EQUITY** (Modal Anda)
- Sesuaikan **RPT** (Risk Per Trade) - default 0.40%
- Verify **FEE BELI/JUAL** sesuai broker

### 2. **Add Trading Position**
- Klik **"+ Add Position"**
- Isi: Emiten, Harga Buy, Harga SL, Pilih Portfolio
- Sistem otomatis hitung: **Range %, Risk Nominal, Lot Buy, Nominal Buy**

### 3. **Baca Hasilnya**
- **Range %**: Jarak dari buy ke SL dalam persen
- **Risk Nominal**: Uang yang siap Anda rugi
- **Lot Buy**: Jumlah unit/lot yang aman (PALING PENTING!)
- **Nominal Buy**: Total uang untuk entry

### 4. **Privacy Mode**
- Klik tombol 👁️ untuk sembunyikan nominal sensitif

---

## 💡 Contoh Penggunaan

**Skenario IHSG:**
- Modal: Rp100 juta
- RPT: 0.40% → Risk Nominal = Rp400 ribu
- Buy ACES: 710, SL: 655
- Range: 7.75%
- **Lot Buy = 73 lot** (beli maksimal 5.1 juta rupiah)

**Skenario GLOBAL:**
- Modal: $27,586 USD
- RPT: 0.40% → Risk Nominal = $110
- Buy NVDA: $120.5, SL: $115.2
- Range: 4.39%
- **Lot Buy = 0.2089** (beli 0.2089 saham)

---

## 🔧 Customization

### Mengubah Default Portfolio Values
Edit file `src/TradingDashboard.jsx`:
```jsx
const [portfolios, setPortfolios] = useState({
  global: { name: 'GLOBAL', equity: 27586, currency: 'USD', ... },
  ihsg: { name: 'IHSG', equity: 100000000, currency: 'IDR', ... },
  crypto: { name: 'KRIPTO', equity: 50000, currency: 'USD', ... }
});
```

### Mengubah Color Scheme
Edit warna di komponen:
```jsx
background: 'linear-gradient(135deg, #d4af37, #f0d070)' // Gold
```

Alternatif:
- Blue: `#3b82f6` → `#1e40af`
- Green: `#10b981` → `#047857`
- Purple: `#a855f7` → `#7c3aed`

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ IE11 (tidak support)

---

## 🐛 Troubleshooting

### Error: "npm: command not found"
**Solusi**: Install Node.js dari [nodejs.org](https://nodejs.org)

### Error: "EACCES: permission denied"
**Solusi**:
```bash
sudo chown -R $USER ~/.npm
npm cache clean --force
```

### Port 3000 sudah dipakai
**Solusi**:
```bash
npm start -- --port 3001
```

---

## 📧 Support & Feedback

Jika ada pertanyaan atau bug report:
1. Buat **Issue** di GitHub
2. Sertakan screenshot atau deskripsi detail
3. Saya akan respons sesegera mungkin

---

## 📄 License

MIT License - Bebas digunakan untuk personal maupun komersial

---

## 🙏 Credit

Dashboard ini dibuat dengan:
- ⚛️ React 18
- 🎨 Tailwind CSS
- 🎯 Lucide React Icons
- 💼 Best practices untuk money management

---

**Happy Trading! Manajemen risiko adalah kunci kesuksesan trading jangka panjang.** 💰📈

