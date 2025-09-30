===== Stage 1. Set up =====

1. `cd frontend` -> `npm create vite@latest` -> React + Javascript ( dont have scoll down )

===== Stage 2. Deploy on Sevalla =====

1. `npm run build`: optimize everything in folders -> Delete folder `dist`

===== Stage 9. Set up for frontend =====

1. Delete Dist folder, assest folder, app.css
2. Install tailwind: Follow steps by steps for vite `npm install tailwindcss @tailwindcss/vite` 
3. Install daisyUI: `npm install daisyui@latest` -> add `@plugin "daisyui";` to css file
4. Install `npm i react-router` -> Cover <App/> with BrowserRouter
4. Set up path router in App.jsx file
5. Install axios: `npm i axios`: Fetch API --> create axios file in lib folder
6. Install zustand `npm i zustand`: manage global state like ( allow sharing state with every components instead write again ) --> create a file for zustand in store folder