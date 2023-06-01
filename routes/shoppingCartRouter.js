const express = require("express");
const router = express.Router();
const shoppingCartController = require("../controllers/ShoppingCartController");

// Get all items in the shopping cart
// router.get("/", shoppingCartController.getAllItems);

// Get a specific item in the shopping cart
router.get("/:id", shoppingCartController.getItem);

// Add an item to the shopping cart
router.post("/", shoppingCartController.addItem);

router.post("/getAll", shoppingCartController.getAllItems);

router.post("/items", shoppingCartController.setItemDetails);

// Update an item in the shopping cart
router.put("/:id", shoppingCartController.updateItem);

// Delete an item from the shopping cart
router.delete("/:id", shoppingCartController.deleteItem);

module.exports = router;
