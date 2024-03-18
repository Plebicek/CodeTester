/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/views/**/*.{html,js,ejs}", "./src/public/**/*.{html,js,ejs}"],
  theme: {
    colors : {
      transparent: 'transparent',
      current: 'currentColor',
      "main" : "#A7A7D7",
      "bg-main" : "#15171b",
      "main-dark" : "#535361",
      "main-border" : "#9396C8",
      "bg-second" : "#1F2023",
      "bg-grad-main" : "#333344",
      "bg-grad-text" : "#6F7DA8",
      "bg-grad-gray" : "#2B3142",
      "bg-third-dark" : "#333643",
      "text-second" : "#5C6178",
      "login-submit" : "#5E637B",
      "gray" : "#7E7E7E",
      "main-light" : "#9A9FB1",
      "bg-third-light" : "#484B54", 
      "white" : "#FAFAFA",
    },
    extend: {
      margin : {
        "22px" : "1.375rem",
        "5-68" : "5.68rem"
      },
      padding : {
        "50px" : "3.125rem",
        "3rem" : "3rem",
        "22px" : "1.375rem",
        "10px" : "10px"
      },
      height : {
        "75px" : "4.688rem",
        "5rem" : "5rem",
        "6px" : "6px",
        "467" : "467px",
        "491" : "491px",
        "788" : "788px",
      },
      width : {
        "33" : "33rem",
        "65-5" : "65.5rem",
        "88-12" : "88.125rem", // 67.75rem 84.688rem
        "61-87" : "61.875rem",
        "350" : "350px",
        "377" : "377px",
        "793" : "793px",
      },
      borderRadius : {
        main : "0.938rem"
      },
      fontSize : {
        "28px" : "1.75rem",
        "32px" : "2rem"
      },
      borderWidth : {
        6 : "6px",
        5 : "5px"
      },
    },
  },
  plugins: [],
}

