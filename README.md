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

All hat data is kept within a table located within the client side. To view or add new hats, you must import them into your table. Once the hats have been imported, you may view/delete the item as ease. The imports update every few 5-15 minutes.




**Examples**

``GET https://localhost:9000/api/hats`` | (https://prnt.sc/z3FO2E_QdKGI) 
<br></br>
![Screenshot 2023-04-02 at 6 08 29 PM](https://user-images.githubusercontent.com/104395322/229381575-1831d0fe-7811-44da-a715-d198bfb212a2.png) 



``GET https://localhost:9000/api/imports`` | (https://prnt.sc/kEVMZmso3yJQ)

![Screenshot 2023-04-02 at 6 21 29 PM](https://user-images.githubusercontent.com/104395322/229382193-0f5b8fc6-915d-4859-b318-2e817a0c1f36.png)

