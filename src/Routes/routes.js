const express = require("express");
const Container = require("../Controller/controller.js");
const productosRouter = express.Router();
const methodBank = require("../Products/products.js");

productosRouter.get("/", (req, res) => {
  const productos = Container.getAll();
  res.send(productos);
});

productosRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.send(methodBank.findOne(parseInt(id)));
  } catch (error) {
    res.status(400).send("Producto no encontrado")
  }
});

productosRouter.post("/", (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    const prod = Container.create(title, price, thumbnail);
    res.status(201).send(prod);   
  } catch (error) {
    res.status(400).send("No se pudo crear el producto")
  }
});

productosRouter.post("/message", (req, res) => {
    MessagesActions.add(req.body);
    res.redirect("/");
});

productosRouter.put("/:id", (req, res) => {
  try {
    let updateProd = Container.update(req.params, req.body);
    res.status(200).send(updateProd);
  } catch (error) {
    console.log(error);
    res.status(400).send("No se pudo actualizar el producto");
  }
});

productosRouter.delete("/:id", (req, res) => {
  try {
    let data = Container.delete(parseInt(req.params.id));
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("No se pudo eliminar el producto")
  }
})

module.exports = productosRouter;