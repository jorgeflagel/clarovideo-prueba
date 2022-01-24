# TEST CLAROVIDEO

This project was build with React(create-react-app) and Redux(redux-toolkit).

## RUNNING THE PROJECT
Before running the project you should include a file .env in the root directory with the key: REACT_APP_CLARO_SERVICE_BASE_URL and the value: https://mfwkweb-api.clarovideo.net

After that, you can run the app in the console with the command "npm start" and open [http://localhost:3000/mexico](http://localhost:3000/mexico)

## ABOUT THE PROJECT
The project consist in a single page application that shows the list of movies by genre that are available at Clarovideo. After clicking a specific genre on the menu of categories, the app will load 50 movies related the selected category. The app implement an infinite scroll, that means that when you reach the end of the page, other 50 movies of the same genre will be fetched until getting the all movies. Also, there is a search input that allows you to filter the list of movies by title. 
Clicking in a movie will show the details about that film, like the description, actors, directors, writers, etc...
