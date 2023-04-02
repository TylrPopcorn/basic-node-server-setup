//-----------HATS-ROUTER------------\\
const express = require("express");
//vars:
const Hats = require("./hats-model");

//MIDDLEWARE:
const { verifyName } = Hats;
//----
const router = express.Router();
//
//---------ENDPOINTS-----------:
//
//---GET REQUESTS:---
//

//The main endpoint
//This endPoint will get all of the current hats and show them to the user:
router.get("/", (_, res) => {
  let successMSG = `<h1> Current Hats: </h1>\n`; //Used to show the user the data
  const hats = Hats.getCurrentHats(); //invoke the function,

  if (hats.length > 0) {
    hats.map((hat) => {
      successMSG += `\n${hat}`; //ADD each hat name to the list.
    });
  } else {
    successMSG += `\nNone`; //ADD each hat name to the list.
  }

  console.log(`SUCCESS - retrieved current hats! | hat count: ${hats.length}`);
  res.status(200).send(successMSG); //return the data.
  return;
  //}
});

//This endPoint will retrieve any new hats that get inputted to the api and add them to the data:
router.get("/imports", (_, res) => {
  Hats.getNewHats()
    .then((data) => {
      //SUCCESSFULLY retrieved all hats
      let successMSG = `<h1> Imported Hats: </h1>\n`; //Used to show the user the data
      data.map((hat) => {
        successMSG += `\n${hat}`; //ADD each hat name to the list.
      });

      console.log(`SUCCESS - retrieved NEW hats!`);
      res.status(200).send(successMSG); //return the data.
      return;
    })
    //FAILED to get hats:
    .catch((err) => {
      console.log("Internal error - ", err.message);
      res.status(500).json({
        message: "Error retrieving hats",
      });
      return;
    });
});

//this endPoint will show all deleted items:
router.get("/deleted", (_, res) => {
  let successMSG = `<h1> Deleted Hats: </h1>\n`; //Used to show the user the data

  const DELETED_data = Hats.getDeletedHats();
  if (DELETED_data.length > 0) {
    DELETED_data.map((hat) => {
      successMSG += `\n${hat}`; //ADD each hat name to the list.
    });

    console.log(
      `SUCCESS - Successfully retrieved deleted items. | deleted: ${DELETED_data.length}`
    );
  } else {
    successMSG += `\n None`;
  }

  res.status(200).send(successMSG); //return the data.
  return;
});

//this endPoint will get and show a certain hats info:
router.get("/:name", verifyName, (req, res) => {
  const { name } = req.params; //name of hat

  const hat = Hats.getHat(name); //Attempt to get the request hat.
  const { status, message, item } = hat;

  //IF The search was a success and an item was found:
  if (status) {
    let successMSG = `<h1> ${item.name} </h1>\n`; //Used to show the user the data

    const arr = Object.keys(item); //Turn the object of data into an array.
    arr.map((currItem) => {
      //Map through the list
      const spacer = ["description"].includes(currItem); //Decide which property needs a spacer after it

      //ADD each item property to the list.
      successMSG += `\n ${spacer ? "\n" : ""} ${currItem}: ${item[currItem]} ${
        spacer ? "\n" : ""
      }`;
    });

    console.log(`FETCH SUCCESS - ${message}`); //send back data to the user.
    res.status(200).send(successMSG);
  } else {
    //ELSE, cannot find hat.
    console.log(`FETCH FAILED - ${message}`); //send back data to the user.
    res.status(400).send({
      message: "FETCH - Failed",
    });
  }

  return; //end.
});
//
//---DELETE REQUESTS:-------
//
//
//This endPoint will delete a hat by the name of the item
router.delete("/:name", verifyName, (req, res) => {
  //NOTE: You don't have to insert the full name of the hat to delete it!
  const { name } = req.params; //name of hat

  const HatRemoved = Hats.removeHat(name); //Attempt to delete hat
  //NOTE: Once a hat is deleted, you CANNOT get it back.
  if (HatRemoved == true) {
    //SUCCESS
    console.log(`SUCCESS - Successfully deleted hat: '${name}'`);
    res.status(200).send({
      message: "Deletion - SUCCESS",
    });
  } else {
    //FAIL
    console.log(`FAILED - ${HatRemoved.message}: '${name}'`); //output message to the developer
    res.status(400).send({
      message: "Deletion - FAILED",
    });
  }
});

//Exports:------
module.exports = router;
