const express = require('express');
const Router = express.Router();
const MakeupProduct = require('../models/makeupproducts');
const Users = require('../models/usersModel');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, require('crypto').randomBytes(5).toString('hex') + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.minetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });

Router.get("/makeupproducts", (req, res) => {
    MakeupProduct.find({}).sort({ id: 1 })
        .then(products => {
            res.json({ products: products });
        })
        .catch(err => res.json(err).status(500));
});

Router.post('/create-makeupproduct/', (req, res) =>{
    const {products} = req.body;
    MakeupProduct.create(products)
    .then(product =>{
        res.json({msg: "product created", user: product});
    }).catch(err => res.json(err).status(500));
});

Router.get("/makeupproduct/:id", (req, res) => {
    MakeupProduct.findOne({ _id: req.params.id }).then(product => {
        res.json(product)
    }).catch(err => res.json(err).status(500));
});

Router.post("/makeupproduct", (req, res) => {
    const { id } = req.body;
    MakeupProduct.findOne({ _id: id }).then(product => {
        res.json(product)
    }).catch(err => res.json(err).status(500));
});

Router.get("/productCatagories", (req, res) => {
    MakeupProduct.distinct("type")
        .then(result => {
            res.json(result);
        })
        .catch(err => res.json(err).status(500));
});

Router.post("/productCatagoriesList", (req, res) => {
    const { productName } = req.body;

    MakeupProduct.find({ type: productName }).then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => res.json(err).status(500));
});

Router.post("/add-makeupproduct", uploads.single('productImage'), (req, res) => {
    const { product } = req.body;
    MakeupProduct
        .create(product).then(cProduct => {
            res.json(cProduct);
        })
        .catch(err => res.json(err).status(500));
});

Router.post('/upload-productImage', uploads.single('productImage'), (req, res) => {
    console.log(req.file);
    res.json(req.file);
});

Router.post("/upload-profileImage", uploads.single('profileImage'), (req, res) => {
    const userId = req.body._id;
    Users.findById(userId)
        .then(rUser => {
            if (rUser) {
                if (rUser.profileImage) {
                    fs.unlink(rUser.profileImage, (err) => {
                        if (err) {
                            res.json({ msg: "unable to delete image" }).status(500);
                        } else {
                            // res.json({msg:"image deleted successfully"});
                        }
                        rUser.profileImage = req.file.path;
                        rUser.save()
                            .then(sUser => {
                                res.json({ msg: "Profile Uploaded", user: sUser });
                            })
                    });
                } else {
                    rUser.profileImage = req.file.path;
                    rUser.save()
                        .then(sUser => {
                            res.json({ msg: "Profile Uploaded", user: sUser });
                        })
                }
            } else {
                res.json({ msg: "User Not found" });
            }
        })
});

Router.post('/delete-productImage', (req, res) => {
    const { path } = req.body;
    fs.unlink(path, (err) => {
        if (err) {
            res.json({ msg: "unable to delete image" }).status(500);
        } else {
            res.json({ msg: "image deleted successfully" });
        }
    });
});

Router.put("/makeupproduct/:id", (req, res) => {
    const { products } = req.body;
    MakeupProduct.findByIdAndUpdate({ _id: req.params.id }, products).then(() => {
        MakeupProduct.findOne({ _id: req.params.id })
            .then(product => res.json(products))
            .catch(err => res.json(err).status(404));
    }).catch(err => res.json(err).status(500));
});

Router.delete("/makeupproducts/:id", (req, res) => {
    MakeupProduct.findByIdAndRemove({ _id: req.params.id })
        .then(dProduct => {
            res.json(dProduct)
        }).catch(err => res.json(err).status(500));
});

Router.get("/makeupproducts-byname", (req, res) => {
    const { name } = req.body;
    MakeupProduct.find({
        name: {
            $regex: new RegExp(name),
        },
    }
    ).then(products => {
        res.json(products)
    }).catch(err => res.json(err).status(404));
});

Router.post("/makeupproducts-bybrand", (req, res) => {
    const { brand } = req.body;
    MakeupProduct.find({
        brand: {
            $regex: new RegExp(brand),
        },
    }
    ).then(products => {
        res.json(products)
    }).catch(err => res.json(err).status(404));
});

Router.get("/makeupproducts-bytype", (req, res) => {
    const { type } = req.body;
    MakeupProduct.find({
        type: {
            $regex: new RegExp(type),
        },
    }
    ).then(products => {
        res.json(products)
    }).catch(err => res.json(err).status(404));
});

module.exports = Router;