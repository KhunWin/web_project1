var express = require('express');
var router = express.Router();

const { connectToDB, ObjectId } = require('../utils/db');

/* all volunteer working*/ 
router.get('/', async function (req, res) {
    // console.log("errorsomething")
  const db = await connectToDB();
  try {
    let page = parseInt(req.query.page) || 1;
    let perPage = parseInt(req.query.perPage) || 10;
    let skip = (page - 1) * perPage;
    let result = await db.collection("volunteersDB").find().skip(skip).limit(perPage).toArray();
    let total = await db.collection("volunteersDB").countDocuments();
    res.json({'volunteers': result, 'totals': total});

  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.post('/', async function (req, res) {
    const db = await connectToDB();
    try {
        req.body.terms = req.body.terms == "on";
        req.body.createdAt = new Date();
        req.body.modifiedAt = new Date();

        let result = await db.collection("volunteersDB").insertOne(req.body);
        res.status(201).json({ message: "Volunteer Recorded" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});

/* Retrieve a single volunteer */
router.get('/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("volunteersDB").findOne({ _id: new ObjectId(req.params.id) });
        if (result) {
            res.json(result);   
        } else {
            res.status(404).json({ message: "Volunteer not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});

// Update a single volunteer
router.put('/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        
        req.body.terms = req.body.terms == "on";
        req.body.modifiedAt = new Date();
        delete req.body._id;

        let result = await db.collection("volunteersDB").updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Volunteer updated" });
        } else {
            res.status(404).json({ message: "Volunteer not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});

// Delete a single volunteer
router.delete('/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("volunteersDB").deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Volunteer deleted" });
        } else {
            res.status(404).json({ message: "Volunteer not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});



module.exports = router;
