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
      "task-submit" : "#303238",
      "gray" : "#7E7E7E",
      "main-light" : "#9A9FB1",
      "bg-third-light" : "#484B54", 
      "white" : "#FAFAFA",
      "task" : "#8A8ECC",
      "answer" : "#9FA4FF",
      "green" : "#80FC94",
      "red" : "#FC8080",
      "delete" : "#B68181",
      "line" : "#373A42",
      "user-grad-from" : "#333C55",
      "user-grad-to" : "#2B3142",
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
        "10px" : "0.625rem"
      },
      height : {
        "59px" : "3.688rem",
        "75px" : "4.688rem",
        "5rem" : "5rem",
        "6px" : "0.375rem",
        "467" : "29.18rem",
        "491" : "30.68rem",
        "788" : "49.25rem",
        "10rem" : "10.125rem",
        "95per" : "95%"
      },
      width : {
        "24px" : "1.5rem",
        "37.88" : "2.368rem",
        "55px" : "3.438rem", 
        "33" : "33rem",
        "65-5" : "65.5rem",
        "88-12" : "88.125rem", // 67.75rem 84.688rem
        "61-87" : "61.875rem",
        "350" : "21.87rem",
        "377" : "23.56rem",
        "500" : "31.25rem",
        "650"  : "40.625rem",
        "793" : "49.56rem",
        "17.188rem" : "17.188rem",
        "83per" : "83%",
      },
      borderRadius : {
        main : "0.938rem"
      },
      fontSize : {
        "28px" : "1.75rem",
        "32px" : "2rem"
      },
      borderWidth : {
        6 : "0.375rem",
        5 : "0.313rem"
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

