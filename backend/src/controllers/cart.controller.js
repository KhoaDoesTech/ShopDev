const CartService = require("../services/cart.service");

class CartController {
  constructor() {
    this.cartService = new CartService();
    this.createOrAddItemToCart = this.createOrAddItemToCart.bind(this);
    this.getCartById = this.getCartById.bind(this);
    this.getCartByUserId = this.getCartByUserId.bind(this);
    this.updateEntireCart = this.updateEntireCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.checkExistProduct = this.checkExistProduct.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.updateEachProduct = this.updateEachProduct.bind(this);
  }
  async checkExistProduct(req, res) {
    try {
      const { userId, productId } = req.query;
      if (!userId || !productId) {
        return res
          .status(400)
          .json({ error: "userId and productId are required in the query" });
      }
      let productExists = await this.cartService.checkExistProduct(
        userId,
        productId
      );
      res.json({ productExists });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async createOrAddItemToCart(req, res) {
    try {
      const { userId, productId, quantity } = req.body;
      let cart = await this.cartService.getCartByUserId(userId);

      if (!cart) {
        // If cart doesn't exist, create a new one
        cart = await this.cartService.createCart(userId);
      }

      // Add item to the cart
      const newItem = { product: productId, quantity: quantity || 1 };
      const productExists = await this.cartService.checkExistProduct(
        userId,
        productId
      );
      if (productExists) {
        res.status(400).json({ message: "Product existed" });
      } else {
        const updatedCart = await this.cartService.addItemToCart(
          cart._id,
          newItem
        );

        res
          .status(200)
          .json({ message: "Add to cart successfully", data: updatedCart });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getCartById(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await this.cartService.getCartById(cartId);
      console.log({ cart });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getCartByUserId(req, res) {
    try {
      const { userId } = req.params;
      const cart = await this.cartService.getCartByUserId(userId);
      console.log({ cart });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found", data: [] });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message, data: [] });
    }
  }

  async updateEntireCart(req, res) {
    try {
      const { userId } = req.params;
      const updatedCartData = req.body;
      const updatedCart = await this.cartService.updateEntireCart(
        userId,
        updatedCartData
      );
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateEachProduct(req, res) {
    try {
      const { userId, productId, quantity, select } = req.body;
      const updatedCart = await this.cartService.updateEachProduct(
        userId,
        productId,
        quantity,
        select
      );
      if (quantity === 0) {
        await this.cartService.removeItemFromCart(userId, productId);
      }
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteCart(req, res) {
    try {
      const { userId } = req.params;
      const deletedCart = await this.cartService.deleteCart(userId);
      if (!deletedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.json({ message: "Cart deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async removeItemFromCart(req, res) {
    try {
      const { userId } = req.params;
      const { productId } = req.query;
      const updatedCart = await this.cartService.removeItemFromCart(
        userId,
        productId
      );

      if (!updatedCart) {
        return res
          .status(404)
          .json({ message: "Cart not found or item does not exist" });
      }

      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CartController;
