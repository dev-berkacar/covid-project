# Step 1: Use an official Node image as the parent image
FROM node:14

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# If using yarn, copy yarn.lock as well
# COPY package.json yarn.lock ./

# Step 4: Install dependencies
RUN npm install
# Or using yarn: RUN yarn install

# Step 5: Copy the rest of your application's source code
COPY . ./

# Step 6: Build your app
RUN npm run build
# Or using yarn: RUN yarn build

# Step 7: Install serve and serve the production build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Step 8 (optional): Expose port 3000 to the outside once the container has launched
EXPOSE 3000
