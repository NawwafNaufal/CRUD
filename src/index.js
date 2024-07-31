const express = require("express");
const dotenv = require("dotenv");
const {PrismaClient} = require("@prisma/client");

const prisma =  new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req,res) => {
    res.send("Hello World!");
});

app.get("/products",async (req,res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});

app.post("/products",async (req,res) => {
    const addDataProduct = req.body;

    const products = await prisma.product.create({
    data:{
        name: addDataProduct.name,
        price: addDataProduct.price,
        description: addDataProduct.description,
        image: addDataProduct.image
        },
    });
    res.status(201).send({
        data: products,
        message:"Succes"
    })
});

app.delete("/products/:id",async (req,res) => {
    const productId = req.params.id;
    await prisma.product.delete({
        where:{
            id:parseInt(productId)
        },
    });
    res.send(hapusProduct);
});

app.put("/products/:id",async(req,res) =>{
    
    const updateProduct = req.body;
    const updateIdProduct = req.params.id;

    if(!(updateProduct.name && updateProduct.price && updateProduct.description && updateProduct.image)){
            return res.send("Tidak boleh kosong")
    }
    const products = await prisma.product.update({
        where:{
            id:parseInt(updateIdProduct)
        },
        data:{
            name: updateProduct.name,
            price:updateProduct.price,
            description:updateProduct.description,
            image:updateProduct.image
        },
    });
    res.send({
        data:products,
        message:"Success"
    })
});

app.patch("/products/:id",async (req,res)=> {
    const updateProduct = req.body;
    const updateIdProduct = req.params.id;

    const products = await prisma.product.update({
        where:{
            id:parseInt(updateIdProduct)
        },
        data:{
            name: updateProduct.name,
            price:updateProduct.price,
            description:updateProduct.description,
            image:updateProduct.image
        },
    });
    res.send({
        data:products,
        message:"Success"
    })
})
app.listen(PORT, () => {
    console.log("App Listen in port " + PORT);
});