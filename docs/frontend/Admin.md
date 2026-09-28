# 🗂️ 1. Structure: Kitne Pages aur Components Banenge?
humein 1 Dashboard, 4 Dedicated Pages, aur 2 Navigation Components chahiye honge:
## 🖥️ Main View (Dashboard):
### 1. Dashboard.jsx: 
Is page par upar teenon bada Stats Cards (Counters) dikhenge. Isi page ke andar neeche Customers ki Table/List dikhega (jahan har customer ke samne ek Delete ka button hoga).
## 📄 Dedicated Pages (Single Screens):
### 1. VendorRequestsList.jsx: 
Sidebar ke button par click karne par khulega, jahan saari pending requests ki ek list ya grid dikhegi.

### 2. SingleRequestDetail.jsx (🚨 Aapka Special Flow): 
Jab admin kisi specific pending request par click karega, toh yeh page khulega (Route: /admin/request/:id). Yahan us user ki saari details (Shop Name, Description, Phone, Complete Address) bade aur clean section mein dikhegi. Neeche Approve aur Reject ka action button hoga.
### 3. VendorsList.jsx: 
Approved vendors ki saari list dikhane ke liye page.
### 4. VendorProductsView.jsx (🛒 Power Feature): 
Jab admin kisi active vendor par click karega, toh yeh page khulega (Route: /admin/vendor-products/:vendorId). Yahan hum dekh sakte hain ki us vendor ne hamari website par kaun-kaun se products add kiye hain!

## 🧱 Navigation & Layout Components:
* *AdminSidebar.jsx:*  Jisme Teen major buttons honge: Dashboard (with Customers), Vendor Requests, aur Active Vendors.
# 📦 2. Redux Slice (adminSlice.js) Mein Kya-Kya Store Hoga?
state ko clean rakhne ke liye humari slice ke andar yeh data types rahenge:
* **stats**: Dashboard counters (totalCustomers, totalVendors, totalPendingRequests).
* **customers** : Saare customers ki array list.
* **pendingRequests**: Saari pending shops ki list.
* **selectedRequest**: Ek akela object, jab admin kisi ek request par click karega toh uski full details yahan store hogi taaki SingleRequestDetail page par dikh sake.
* **vendors**: Saare approved vendors ki array list.
* **vendorProducts**: Jis vendor par click kiya gaya, uske products ki array list.
* **loading / error**: Loader spinner aur global error track karne ke liye.

# 📡 3. Kaun-Kaun Se Async Thunks / APIs Chahiye?
in pages ko dynamic banane ke liye kul 7 main api calls (async thunks) chahiye honge:
* **fetchAdminStats** ➡️ Dashboard stats ke liye
* **fetchCustomers** ➡️ Dashboard ke niche customer list load karne ke liye.
* **fetchPendingRequests** ➡️ Requests ki list ke liye
* **fetchRequestById(id)** ➡️ Specific request ki details nikalne ke liye
* **processVendorRequest({ requestId, action })** ➡️ Request ko approve/reject karne
* **fetchVendors**   Approved vendors ki list ke liye.
* **fetchVendorProducts(vendorId)** ➡️ Us vendor ke products dekhne ke liye (Iski backend API bhi hum aage design kar lenge).