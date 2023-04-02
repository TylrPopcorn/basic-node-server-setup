//
//
const axios = require("axios");
const hatsData = {
  ALL_Hats: {},
  Deleted_Hats: {},
};
//------------------ //------------------
//FUNCTIONS:---

//This function will get all of the current hats and show them to the user:
function getCurrentHats() {
  return Object.keys(hatsData.ALL_Hats); //Used to send back the final data.
}

//This function will import all hats from the catalog api:
async function getNewHats() {
  const gethats = await axios.get(
    "https://catalog.roblox.com/v1/search/items/details?Category=11&SortType=3&Limit=10"
  );

  const { data } = gethats.data;
  for (let hat of data) {
    if (hatsData.Deleted_Hats[hat.name] == null) {
      //We only want the hats that the user has not removed.
      hatsData.ALL_Hats[hat.name] = hat;
    }
  }

  const finalData = Object.keys(hatsData.ALL_Hats);
  return finalData;
}

//This function will remove any item from the hats list
function removeHat(name) {
  const hatsArray = Object.keys(hatsData.ALL_Hats); //turn hats into an array.
  let success = false;

  for (const hat of hatsArray) {
    const hatName_ = hat.toLowerCase(); //allow for easier comparing so make the name lowered.
    const location = hatName_.indexOf(name.trim().toLowerCase()); //Attempt to find any matches in the hats name

    if (location >= 0) {
      //IF there was some kind of match found (>=0)
      const item = hatsData.ALL_Hats[hat];
      hatsData.Deleted_Hats[item.name] = item; //insert the hat into the items that got removed. (deleted hats)

      delete hatsData.ALL_Hats[hat]; //delete the item from the ALL_HATS section.
      console.log("Deleted: ", hat); //Tell the user what got deleted
      success = true;
    }
  }

  if (!success) {
    //IF no match was found then
    return {
      message: "Cannot find hat", //tell the user why there was not match found.
    };
  }

  //ELSE, a match was found, so
  return true; //return success.
}

//This function will return all deleted hats:
function getDeletedHats() {
  //NOTE: Once a hat is deleted from the data, it CANNOT be returned.
  return Object.keys(hatsData.Deleted_Hats); //retun an array of data.
}

//This function will get and return info about a specific hat:
function getHat(name) {
  if (hatsData.ALL_Hats[name]) {
    return hatsData.ALL_Hats[name]; //Return the first found item (IF there is one)
  }

  const hatsArray = Object.values(hatsData.ALL_Hats); //Turn the object into an array
  const index = hatsArray.findIndex(
    (item) => item.name.toLowerCase().includes(name.trim().toLowerCase()) //return the first found item with corresponding letters as 'name'
  );

  if (index >= 0) {
    //IF anything was found
    const item = hatsArray[index];
    return {
      status: true,
      item: item, //return that first found item
      message: `Successfully found data for: '${name}'`,
    };
  }

  return {
    //else return nothing
    status: false,
    message: `Cannot find data for hat: '${name}'`,
  };
}

//------------------ //------------------
//MIDDLEWARE:---

//A middleware to just verify if the name input has some kind of valid characters/input
function verifyName(req, res, next) {
  const { name } = req.params;

  if (name.trim().length > 0) {
    //IF the user has inputted something then
    next(); //move on
  } else {
    //ELSE, the user failed to input a valid name
    res.status(404).send({
      message: "Insert a valid hat name to search for", //tell the user.
    });
    return;
  }
}

//-------------
//Exports
module.exports = {
  //functions:
  getCurrentHats,
  getNewHats,
  removeHat,
  getDeletedHats,
  getHat,

  //middleware:
  verifyName,
};
