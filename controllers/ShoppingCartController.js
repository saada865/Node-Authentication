const ShoppingCart = require("../models/shoppingCartModel");

// Get all items in the shopping cart
exports.getAllItems = async (req, res) => {
  try {
    const items = await ShoppingCart.find();

    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Get a specific item in the shopping cart
exports.getItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await ShoppingCart.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Add an item to the shopping cart
exports.addItem = async (req, res) => {
  try {
    const { itemNumber, title, description, color, quantity, price } = req.body;

    const newItem = new ShoppingCart({
      itemNumber,
      title,
      description,
      color,
      quantity,
      price,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Update an item in the shopping cart
exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { itemNumber, title, description, color, quantity, price } = req.body;

    const updatedItem = await ShoppingCart.findByIdAndUpdate(
      itemId,
      {
        itemNumber,
        title,
        description,
        color,
        quantity,
        price,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Delete an item from the shopping cart
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await ShoppingCart.findByIdAndRemove(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.setItemDetails = async (req, res) => {
  console.log("Set items");
  try {
    // Get the item number and quantity from the request body
    const { itemNumber, quantity } = req.body;
    console.log(req.body);

    // Fetch the item details from the database
    const item = await ShoppingCart.findOne({
      itemNumber: itemNumber,
    });
    console.log("item: ", itemNumber.toString());

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    let totalPrice;
    if (item.status === "promotion" && item.quantityInHand > quantity) {
      // Calculate the discounted price (20% off) if the item is on promotion
      totalPrice = item.price - item.price * 0.2;
    } else {
      totalPrice = item.price;
    }

    // Create a new shopping cart item
    const cartItem = await ShoppingCart.findOneAndUpdate(
      { itemNumber: item.itemNumber }, // Filter criteria
      {
        itemNumber: item.itemNumber,
        title: item.title,
        description: item.description,
        color: item.color,
        quantity,
        price: totalPrice,
        discountedPrice: item.status === "promotion" ? totalPrice : null,
      },
      { new: true, upsert: true } // Options: return the updated document and create it if it doesn't exist
    );

    // Save the shopping cart item to the database
    // await cartItem.save();

    // Generate a session ID
    const sessionId = req.sessionID;

    // Store the session ID and item details in the session
    req.session.shoppingCart = {
      sessionId,
      item: {
        itemNumber: cartItem.itemNumber,
        title: cartItem.title,
        description: cartItem.description,
        color: cartItem.color,
        quantity: cartItem.quantity,
        price: cartItem.price,
      },
    };

    res.json({ sessionId });
    console.log("Quantity is:  " + cartItem.quantity);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
