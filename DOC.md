===== 1.Set up =====

1. Create .gitignore file has `"node_modules", ".env"`: dont push it on github

===== 2. Deploy on Sevalla =====

1. `npm init -y`
2. Delete `"test"` in script and replace with `"build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend"` 
                                          and `"start": "npm run start --prefix backend"`
    --> install dependecies in backend and frontend, run frontend for development
