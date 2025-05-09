<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1 align="center">In The Queue</h1>

<img width="200" alt="image" src="https://github.com/user-attachments/assets/1432a826-af56-46fa-9e05-d0e61ac3a007" />


</div>



<!-- ABOUT THE PROJECT -->

## About The Project

I created this mobile app to track every show I watch. The app keeps track of what shows I watch, what shows I want to watch in the future, and their current status. Appwrite is used for the backend server and database to keep track of my queues and watch progress. I fetch details about TV shows using the TMDB API.

After developing the app to track TV shows, I added the functionality to track movies and video games. Multiple Appwrite Collections are used to track the queues and progress of each medium. The TMDB API returns movie details, and the IGDB API returns video game details.

## Technologies
  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="Expo" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=F02E65" alt="Appwrite" />
  </div>

## Features

### Queue Page
TV shows I plan to watch are sorted into four queues, each based on whom I’m watching with. These queues are displayed on the Queue page.

### Search Page
The search page allows the user to query the TMDB API for TV shows.

### Watching Page
TV shows that I am currently watching are sorted into four categories, each based on whom I’m watching with. These shows are displayed on the Queue page.

### Coming Soon Page
The Coming Soon page tracks shows awaiting a new season, separating those with a return date from those without one. Airing shows are automatically added to their respective queue.

### Finished Page
The Coming Soon page displays TV shows that I have finished watching and have ended.

### Show Details Page
Tap on a show from any page to view its details. This page displays metadata fetched from the TMDB API and includes action buttons for adding the show to a queue, marking it as currently watching, and more.

# Getting Started


**Installation**

Install the project dependencies using npm:

```bash

npm install

```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following environment variables:

```env

EXPO_PUBLIC_TV_API_KEY=

EXPO_PUBLIC_APPWRITE_PROJECT_ID=

EXPO_PUBLIC_APPWRITE_DATABASE_ID=

EXPO_PUBLIC_APPWRITE_COLLECTION_ID=

EXPO_PUBLIC_APPWRITE_COLLECTION_ID_MOVIES=

EXPO_PUBLIC_APPWRITE_COLLECTION_ID_VIDEO_GAMES=

EXPO_PUBLIC_IGDB_CLIENT_ID=

EXPO_PUBLIC_ACCESS_TOKEN=

```

Add the actual TMDB API key, Appwrite project ID, Database ID, and Collection ID from [Appwrite](https://cloud.appwrite.io/console/login), [TMDB](https://www.themoviedb.org/login).

IGDB authentication can be obtained by following this guide: [api-docs.igdb.com](https://api-docs.igdb.com/#authentication) 

**Running the Project**

```bash

npx expo start

```

Open your ExpoGO app on your phone and scan the QR code to view the project.


<!-- ROADMAP -->

## Potential Features

The next step is to incorporate support for tracking movies and video games in a similar matter

- [x] Include support for tracking movies
- [x] Include support for tracking video games
