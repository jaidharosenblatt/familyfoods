# [Family Foods](https://family-foods.netlify.app)

## Author: Jaidha Rosenblatt

### Description

Web-app to help my family choose a restaurant to go out to eat to

### Screenshots

![](https://i.imgur.com/EuYpfKF.png)

### Features

- Sort restaurants by a weighted score based on my family's specified preferences
- Allow users to take turns having the highest preference weighting
- Change weighting real time
- Filter by restaurant attributes
- Collapse filter cards
- Mobile navbar and footer
- See all restaurants

### Tech Stack

- React, Ant.design
- Node, Express
- MongoDB

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
- Take turn
- Update additional attr
- Update location
- Fix mobile
- Deploy

#### Extra

- Photo upload
- Restaurant photo
