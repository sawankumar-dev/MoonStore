# 🌙 MoonStore - Multi-Vendor E-Commerce Platform

**MoonStore** ek full-stack e-commerce marketplace web application hai jahan normal users khud ko ek vendor (seller) ke roop me register kar sakte hain aur approval ke baad apne products bech sakte hain. 

Is project ka main focus **User-to-Vendor workflow** aur **Admin Moderation** par hai.

---

## 🚀 Key Features

*   **Authentication & Authorization:** Users secure tarike se **Login** aur **Signup** kar sakte hain.
*   **Vendor Application System:** Koi bhi normal user vendor banne ke liye ek application form fill kar sakta hai.
*   **Admin Approval Workflow:** Admin dashboard ke paas authority hoti hai vendor ki application ko review aur **Approve/Reject** karne ki.
*   **Role-Based Access:** Approval milte hi user ka role badal kar **Vendor** ho jata hai, jisse naye features unlock hote hain.
*   **Product Management:** Approved vendors platform par apne naye **Products list (add)** kar sakte hain.
*   **Product Browsing:** Users saare listed products ko dekh sakte hain. *(Note: Buy feature currently development mein hai).*

---

## 🛠️ Tech Stack (Technologies Used)

> *Aap jis bhi tech stack par kaam kar rahe hain (MERN, Python, PHP, etc.), uske mutabik niche badlav kar lein:*

*   **Frontend:** React.js / HTML5 / CSS3 / Tailwind CSS
*   **Backend:** Node.js / Express.js 
*   **Database:** MongoDB
*   **Authentication:** JWT (JSON Web Tokens)

---

## 📋 System Workflow (Kaise Kaam Karta Hai?)

1.  **User Registration:** Sabse pehle user account banata hai (Signup) aur login karta hai.
2.  **Apply for Vendor:** User profile section me jakar "Apply as Vendor" ka form bharta hai.
3.  **Admin Review:** Admin ke paas request jati hai. Admin verify karke use **Approve** karta hai.
4.  **Vendor Dashboard:** Approve hote hi user "Vendor" ban jata hai aur use product list karne ka option mil jata hai.

---

## ⚙️ Installation & Setup

Project ko apne local system par chalane ke liye niche diye gaye steps follow karein:

### 1. Repository Clone Karein
```bash
git clone https://github.com
cd moonstore
```

### 2. Dependencies Install Karein
**Backend ke liye:**
```bash
cd backend
npm install   # Agar Node.js hai to
```

**Frontend ke liye:**
```bash
cd ../frontend
npm install
```

### 3. Environment Variables Setup Karein (.env)
Backend folder me ek `.env` file banayein aur zaroori credentials dalein (jaise Database URL, Port, JWT Secret).

### 4. Project Start Karein
**Backend chalane ke liye:**
```bash
cd backend
npm start
```

**Frontend chalane ke liye:**
```bash
cd frontend
npm start
```

---

## 🗺️ Roadmap (Future Scope)
*   [ ] **Buy Product Feature:** Integrated Payment Gateway (Razorpay/Stripe) lagana jisse users sach me buy kar sakein.
*   [ ] **Cart & Wishlist:** Products ko save karne ka option.
*   [ ] **Order Tracking:** Vendors aur users ke liye order status track karne ka system.
*   [ ] **Search & Filter:** Category aur price ke hisab se products dhoodhne ka feature.

---

## 🤝 Contributing
Agar aap is project me contribute karna chahte hain, to zaroor **Pull Request** open karein ya fir **Issues** me suggestion dein.

Made with ❤️ by Sawan Kumar