This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The code is avaliable on [github](https://github.com/viveksanthosh/cash_free_table)

## UI Layer

The UI is build with react. The entry point is App.js, while a majority of the logic resides in TableView.js

## How to Use

- yarn install and yarn start to start the app
- runs on http://localhost:3000/
- Number of rows can be changed
- Pagination appears when the number of rows selected are less thant the total avaliable rows
- Sorting is avaliable on two fields
- Open and delete actions are functional
- API calls for user detials are cached using a hash map
- Resizing the rows or sorting takes you back to page 1
