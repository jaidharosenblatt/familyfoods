# [Eat Together](https://family-foods.netlify.app)

## Author: Jaidha Rosenblatt

### Description

Web-app to help my family choose a restaurant to go out to eat to

### Screenshots

![](https://i.imgur.com/EuYpfKF.png)

### Features

- Add restaurants from Google Places API (also gets driving distance)
- Infinite scroll using pagination to efficiently load restaurants
- Join food groups to see reviews of your friends and family
- Sort restaurants by a weighted score based on your group preferences, distance, name, or rating from Google
- Take turns having the highest preference weighting
- Filter by restaurant attributes and whether or not user has rated
- JWT authentication using HTTP only cookies
- Default profile photos uploaded to cloudinary
- Mobile navbar and footer

### Tech Stack

- React, Context (following simple Redux pattern), and Ant.design
- Node and Express
- MongoDB
- Google Places, ui-avatars, and cloudinary APIs

### Getting Started

#### Client

1. Navigate into client folder
2. npm install
3. npm start

#### Server

1. Setup a local Mongo instance
2. Create .env file with
   - PORT (int)
   - MONGO_URL (string)
   - JWT_SECRET (string)
   - GOOGLE_API_SECRET (string)
   - DEFAULT_LAT (float)
   - DEFAULT_LNG (float)
   - WEIGHT_CONST (float)
   - CLOUDINARY_API_KEY (string)
   - CLOUDINARY_CLOUD (string)
   - CLOUDINARY_API_SECRET (string)
3. npm install
4. npm run dev

#### TODO

- Integrate query params into restaurants (done)
- Add new restaurant (done)
- Auth routes (done)
  - Signup (done)
  - Signin (done)
  - Edit profile (done)
- Group
  - Add (done)
  - Join (done)
  - Edit (done)
  - Context (delay)
- Rate (done)
- View past ratings (done)
- Add additional attributes to restaurants (done)
- Filter (done)
- Filter by not rated (done)
- Take turn (done)
- Update additional attr (done)
- Update location (done)
- Fix mobile (done)
- Deploy
