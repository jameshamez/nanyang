/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // เพิ่มสีใหม่ที่นี่
        "sage-green": "#8CA77A", // สีเขียว Sage
        "brown-200": "#D6C1B1",  // สีน้ำตาลอ่อน
        "blue-200": "#A4C6E7",   // ตัวอย่างสีฟ้า
        "pink-200": "#F7B5C2",   // ตัวอย่างสีชมพู
        "purple-200": "#C8A2D3", // ตัวอย่างสีม่วง
        "green-100": "#D4EBD0",  // ตัวอย่างสีเขียวอ่อน
        "green-600": "#4C9F70",  // ตัวอย่างสีเขียวเข้ม
      },
    },
  },
  plugins: [],
};
