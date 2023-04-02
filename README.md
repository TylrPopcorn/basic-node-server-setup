# Catalog-Api-/

The following project is a simple implementation of Node.js. This project makes use of the an api provided by ROBLOX (https://www.roblox.com/)

Use the following endpoints below to access to the catalog api:

| N   | Method | Endpoint          | Description                                                             |
| --- | ------ | ----------------- | ----------------------------------------------------------------------- |
| 1   | GET    | /api/hats         | Returns **an array of all hat names** contained in the current database |
| 2   | GET    | /api/hats/imports | Returns **an array of new hats** that get updated from the external api |
| 3   | GET    | /api/hats/deleted | Returns **an array of hats that got deleted** from the database         |
| 4   | GET    | /api/hats/:name   | Returns **the hat with the specified name**                             |
| 5   | DELETE | /api/hats/:name   | Removes **the hat with the specified name** from the database           |

**Instructions**
