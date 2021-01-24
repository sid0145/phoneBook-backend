const express = require("express");
const phoneRouter = express.Router();

const phoneController = require("../controllers/phoneBook");

phoneRouter.post("/createContact", phoneController.createData);
phoneRouter.get("/getContacts", phoneController.getAll);
phoneRouter.delete("/deleteContact/:id", phoneController.deleteContact);
phoneRouter.get("/getContact/:id", phoneController.getContact);
phoneRouter.put("/updateContact/:id", phoneController.updateContact);

module.exports = phoneRouter;
