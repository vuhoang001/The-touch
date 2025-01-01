#simple

# Install necessary dependencies

---

npm install express
npm instaall -D typescript @types/express @types/node ts-node nodemon

---

## Create a tsconfig.js file

---

npx tsc --init

---

### Create a src directory and an index.ts file

---

mkdir src
touch src/index.ts

---

#### Add a start script to package.json

npm pkg set script.start="nodemon src/index.ts"

##### Create a basic Express server in src/index.ts