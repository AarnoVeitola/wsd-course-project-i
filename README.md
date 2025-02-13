# Project 1: Shared shopping list (an individual project for the Aalto University Web Software Development course)

# Online link 
https://aarno-unique-wsd-course-project-i.onrender.com (sadly not active anymore)

# Project structure
The project uses a layered architecture with **views**, **controllers**, **services**, and **database**. 

## Views 
The user interface uses a general layout defined by **layout.eta** in the **layouts** folder. The project uses three views, **main.eta**, **lists.eta**, and **items.eta**, to describe the main page, shopping lists page, and the page with the shopping list contents, respectively. 

## Services
The services are divided into two different services, **listService.js** and **itemService.js**, to make queries to the two databases, **shopping_lists** and **shopping_list_items**, respectively. **listService.js** includes queries for creating, deactivating, and listing shopping lists, as well as for finding a list by id and counting the lists (these are used to fetch the shopping list name for the contents page and for statistics). **itemService.js** includes queries for creating, collecting, and listing the items in a certain shopping list, as well as for counting the items for statistics.

## Controllers 
The controllers are divided into three different controllers, **listController.js**, **itemController.js**, and **statisticsController.js**. The former two handle requests for the shopping lists and the items within, while the latter one handles requests for statistics.

## Database
The **database.js** file contains instructions for the database. If the **DATABASE_URL** environmental variable is available, then a _PostgreSQL_ database deployed by _Render_ is used. Otherwise, a locally hosted database is used. **database.js** uses **Postgres.js**, and hence a connection pool is used by default.

# Running the application locally
The application can be run locally simply by using **docker compose up --build**. If one wishes to run the application using an external database, the database url must be passed as an environmental variable **DATABASE_URL**.
