# 📊 Video Games Sales Dashboard  

**Video Games Sales Dashboard** is an interactive **data visualization Dashboad** built with **Vite, TypeScript, and D3.js**. 

---

## 🚀 Features  
✅ **Multiple Chart Types** – Supports **Line, Bar, Pie, and Scatter** charts  
✅ **Dynamic Data Handling** – Fetches and processes CSV datasets dynamically  
✅ **Modular & Reusable Components** – Structured for easy scalability and customization  
✅ **D3.js Integration** – Utilizes **D3.js** for rendering rich, interactive visualizations  

---

## 📂 Project Structure  

```
STOREDASHBOARD/
│── node_modules/           # Project dependencies
│── public/
│   └── assets/             # Static assets (datasets, images, etc.)
│── src/
│   ├── charts/             # Chart components
│   │   ├── barChart.ts     # Bar chart implementation
│   │   ├── baseChart.ts    # Base chart class
│   │   ├── chartConfig.ts  # Configuration settings for charts
│   │   ├── contextVisChart.ts # Context visualization chart
│   │   ├── lineChart.ts    # Line chart implementation
│   │   ├── pieChart.ts     # Pie chart implementation
│   │   ├── scatterChart.ts # Scatter plot implementation
│   ├── config/             # Configuration files
│   ├── helpers/            # Utility functions for data processing
│   ├── chartRegistry.ts    # Registers available charts for easy access
│   ├── main.ts             # Application entry point
│── style.css               # Global styles
│── vite.config.ts          # Vite configuration
│── vite-env.d.ts           # TypeScript environment definitions
│── package.json            # Project dependencies and scripts
│── README.md               # Project documentation
```

---

## 📊 Available Charts  

| Chart Type     | Description |
|---------------|-------------|
| 📈 **Line Chart** | Tracks **Global Sales** trends over the years |
| 📊 **Bar Chart**  | Displays **Sales by Genre** for comparison |
| 🥧 **Pie Chart**  | Shows **Regional Sales Distribution** |
| 🔵 **Scatter Plot** | Compares **NA Sales vs. Global Sales** |

Each chart is configured in `chartConfig.ts`, allowing customization of **fields, colors, and datasets**.

---

## ⚙️ Setup & Usage  

### 1️⃣ Install Dependencies  
```sh
npm install
```

### 2️⃣ Start Development Server  
```sh
npm run dev
```
Open `http://localhost:5173` in your browser to explore the dashboard.

---

## 🔧 Configuration  

Modify `chartConfig.ts` to customize:  
- 📌 **Datasets** – Adjust the file paths and column mappings  
- 🎨 **Styles** – Change colors, margins, and labels  
- ⚙️ **Chart Options** – Modify axis labels, time formats, and more  

Datasets are located under `public/assets/` and can be updated easily.

---

## 🛠️ Technologies Used  

- **Vite** – Fast build tool for modern web applications  
- **TypeScript** – Ensures type safety and scalability  
- **D3.js** – For rendering SVG-based charts  
---

## 📜 License  
This project is open-source under the **MIT License**. Contributions and modifications are welcome!  

---

🚀 **Get started today and explore your sales data like never before!**  
```markdown
```
