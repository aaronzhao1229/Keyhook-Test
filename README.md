## Keyhook Interview Task

### Overview

Our stack comprises of a rails backend using Graphiti to power our API. And a separate ReactJS app that powers our web and mobile apps ( we use CapacitorJS for our mobile app ).

We have prepared this small test as a way of checking how you can tackle some of the more day to day tasks we face when building out platform. This is a heavily slimmed down and simplified version of a part of our app.

### Task

We have provided you with a simple Sinatra.rb backend API that uses Graphiti. It holds 2 data models, Employees and Departments.

In the frontend folder, we would like you to start a React js app, using Typescript. You are free to use any project starter tool that you'd like. We use vite for our app, but it is not required.

The React app should be a single page ( no routing needed ), that satisfies the following criteria.

- Uses the Tanstack table library to show a list of employees from the API.
  - The table should show these columns:
    - First Name
    - Last Name
    - Age
    - Position
    - Department Name
- You can use the Spraypaint.js library or another JSONAPI library if you'd like.
- The table should have some basic styling applied with tailwind css.
- Table data should be paginated.
- Sorting should be enabled on the first_name,last_name, age, position columns.
- Add a search bar that allows typing in a name and filters the records by the custom graphiti name filter.

All sorting,paginating and filtering should happen through the server side query and should not be done on the frontend.

You are free to use any other packages you would like to use to build the frontend.
You are free to use any documentation or google anything you might not know.

### Bonus

What if we wanted to filter our table to only show employees in a certain Department? We could flip the query around and query for the certain Department and then load in the employees for that department.

Or we could split the query into 2 queries, first querying for the department and then use the department id to filter the employees.

However both of these options have drawbacks. Instead we'd like to just be able to filter the Employee Resource by the department name.

Can you add a select box with the list of department names. When a department name is selected, it should filter the employees by that department name ( not department id ).

Note that you will need to add in code into the Graphiti resource to make this work as well.

### Things we will evaluate

- Has the criteria been met.
- What packages were used and how were they used.
- Code style and commenting.
- Use of Typescript types.
- Can you discuss, rationalise and explain choices you have made.

### Links

- [Graphiti](https://www.graphiti.dev/)
- [Spraypaint.js](https://www.graphiti.dev/js)
- [Tanstack Table](https://tanstack.com/table/v7)
- [Tailwind.css](https://tailwindcss.com/)
