const { Router } = require("express");
const { CartController } = require("../controllers/cart");

class RouterCart {
    constructor() {
        this.controller = new CartController();
    }
    config() {
        const routerCart = Router();

        routerCart.get("/" , this.controller.getAllCarts)

        routerCart.delete("/" , this.controller.delAllCarts)

        routerCart.post("/:cart_user/products/:id_prod" , this.controller.addProdToUserCart)
        //     let cart = await containerCart.getAll();
        //     res.send(cart[0].products);
        //   });

        // routerCart.get("/:id?", checkAuthenticated, async (req, res) => {
        //     const id = req.params.id;
        //     if (!id) {
        //       let obj = await containerCart.getAll() === "" ? "" : await containerCart.getAll()
        //       let cart = obj[0].products;
        //       let name = req.user.username;
        //       res.render("cart", { cart, name });
        //     } else {
        //       let name = req.user.username;
        //       res.render("cart", { name });
        //     }
        //   });
        //   routerCart.get("/getAll", async (req, res) => {
        //     let cart = await containerCart.getAll();
        //     res.send(cart[0].products);
        //   });

        //   routerCart.post("/:id_cart/products/:id_prod", async (req, res) => {
        //     let idProd = req.params.id_prod;
        //     let idCart = req.params.id_cart;
        //     let data = await containerCart.getById(idCart);
        //     if (data == undefined || data.length <= 0) {
        //       let cart = await containerCart.createCart();
        //       await containerCart.save(cart);
        //       logger.error(
        //         `NONE EXISTING ... CREATING CART... with cartId : ${cart._id}`
        //       );
        //       res
        //         .status(404)
        //         .send(
        //           `NONE EXISTING ... CREATING CART... with cartId :  <strong>${cart._id}</strong>`
        //         );
        //     } else {
        //       let prod = await containerProd.getById(idProd);
        //       let cart = await containerCart.getById(idCart);
        //       let arr = cart;
        //       if (arr.products == undefined) {
        //         arr[0].products.push(prod);
        //         let newArr = arr[0].products;
        //         await containerCart.addProd(idCart, newArr);
        //         logger.info("ADDING PRODUCTS...");
        //         res.status(200).send(await containerCart.getAll());
        //       } else {
        //         arr.products.push(prod);
        //         await containerCart.addProd(idCart, arr);
        //         logger.info("ADDING PRODUCTS...");
        //         res.status(200).send(await containerCart.getAll());
        //       }
        //     }
        //   });

        //   routerCart.post("/purchase", checkAuthenticated, async (req, res) => {
        //     let cart = await containerCart.getAll();
        //     let productsArr = cart[0].products;

        //     await transport.sendMail({
        //       from: mailAdmin,
        //       to: `${req.user.email}`,
        //       html: `SE HA REALIZADO LA COMPRA DE :
        //       <ul>
        //       ${productsArr.map((prod) => `<li>${prod[0].title}</li>`).join("")}
        //     </ul>`,
        //       subject: `NUEVO PEDIDO DE : ${req.user.username}`,
        //     });

        //     await client.messages.create({
        //       body: `SE HA REALIZADO LA COMPRA DE :
        //       <ul>
        //       ${productsArr.map((prod) => `<li>${prod[0].title}</li>`).join("")}
        //     </ul>
        //   `,
        //       from: `whatsapp:+${whatsapp}`,
        //       to: `whatsapp:+${req.user.tel}`,
        //     });

        //     await client.messages.create({
        //       body: `SE HA REALIZADO LA COMPRA DE MANERA CORRECTA`,
        //       from: `+${phone}`,
        //       to: `+${req.user.tel}`,
        //     });

        //     let name = req.user.username;
        //     let products =
        //       (await containerProd.getAll()) === "" ? "" : await containerProd.getAll();
        //     res.render("index", { products, name });
        //   });

        //   routerCart.delete("/delete/:id", async (req, res) => {
        //     let id = req.params.id;
        //     await containerCart.deleteById(id);
        //     logger.info("DELETING...");
        //     res.status(200).send(await containerCart.getAll());
        //   });

        //   routerCart.delete("/cart/delete", async (req, res) => {
        //     logger.info("DELETING...");
        //     logger.info(await containerCart.deleteAll());
        //     res.status(200).redirect("/api/cart/");
        //   });
        return routerCart;
    }
}

module.exports = {
    RouterCart,
};
