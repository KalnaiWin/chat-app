===== 1.Set up =====

1. Create .gitignore file has `"node_modules", ".env"`: dont push it on github

===== 2. Deploy on Sevalla =====

1. `npm init -y`
2. Delete `"test"` in script and replace with `"build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend"` 
                                          and `"start": "npm run start --prefix backend"`
    --> install dependecies in backend and frontend, run frontend for development
3. Delete node_modules in backend and frontend then run `npm run build` and `npm run start`
3.5. Add `"engines": { "node": ">=20.0.0" }`
4. Deploy on Sevalla