#### Installation

Install with npm i

#### Starting Vite

Start the dev server with npm run dev by default it will be located on https://localhost:5173

#### Guidelines

You may install or add any packages, files, or folders which help accomplish the accompanying requirements:

#### Requirements

- Use TypeScript for the project
- Use Material UI for the iconography
- Fetch data from the following API: https://pokeapi.co/docs/v2
- Refer to the necessary documentation there
- Using the results from the pokemon API, draw a table with the pokemon names.

![alt text](images/list-view.png 'Pokemon List View')

- Limit the number of rows per page to 5
- Make pagination buttons work, this includes showing page number of max pages

  - First page will disable the previous page button and skip to first page button
  - Last page will disable the next page button and skip to last page button
  - Next and previous page buttons will change page by 1

- Selecting (Clicking on) a pokemon from the table should swap the list view with another table showing the abilities for this specific pokemon.

![alt text](images/details-view.png 'Pokemon List View')

- This table should have a link back to the list view
- CSS for the tables should match the mockups

#### Implementation
##### Libraries
The following libraries were used in the implementation of this project
- Tanstack Query
- Material UI
- React Router

Additionally, the following libraries were used for testing
- Vitest
- React Testing Library
- JSDom

##### Pagination
- Given the hard requirements to **show page number of max pages** and **use Material UI for the iconography**, I initially tried to find a Material UI Pagination component that met the requirements. None of the Material UI Pagination components met the requirements.
- Created a custom PokemonPagination component.
- Created a React Context to store the current page and a setter function. This allowed the business logic for setting the page to be contained within the PaginationComponent and eliminated prop drilling.

##### Routing
- Used React Router to swap between the list and details view.
- Initially just used a state variable in the App component. At first, I wasn't sure if using React Router was overkill or not, but it wound up simplifying the code.

##### Table
- Created a PokemonDataTable component, encapsulating the styling and funtionality common to both tables.
- Used Material UI Table under the hood. With a little bit of custom styling, was easily able to match the styling of the mockups.

##### Querying
- Used Tanstack Query for the fetching of data. Seems to be the industry standard.
- Wrapped the usages of Tanstack Query in custom hooks. This significantly simplified the code.
- Tanstack Query provided caching and a paging effect (keepPreviousData) that made for a good user experience.
- It also simplified showing loading and error states.

##### Styling
- Used css modules to avoid having all of the css being global
- Alternatively, could have used styled-components

##### Testing
- Used Vitest and React Testing Library for the tests.
- To get the most "bang for the buck" for this take-home project, I wrote a set of integration tests at the App component level.

#### Live Deployment
The app is deployed on Heroku
https://pokemon-demo-470d9bcba995.herokuapp.com/details
