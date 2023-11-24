var express = require('express');
var router = express.Router();

const { connectToDB, ObjectId } = require('../utils/db');

/* all Event working*/ 
router.get('/', async function (req, res) {

  const db = await connectToDB();
  try {
    let query = {}

    if (req.query.title) {
        query.eventTitle = {$regex: new RegExp(req.query.title, 'i')}
    }
    let page = parseInt(req.query.page) || 1;
    let perPage = parseInt(req.query.perPage) || 6;
    let skip = (page - 1) * perPage;

    let result = await db.collection("eventsDB").find(query).skip(skip).limit(perPage).toArray();

    let total = await db.collection("eventsDB").countDocuments();
    res.json({'events': result, 'totals': total});

    // res.render('event', { title: 'Events', events: result, total: total, page: page, perPage: perPage, paths: { "/": "Home", "/event": "Events" } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.post('/', async function (req, res) {
    const db = await connectToDB();
    try {
        req.body.quotaNum = parseInt(req.body.quotaNum);
        req.body.terms = req.body.terms == "on";
        req.body.createdAt = new Date();
        req.body.modifiedAt = new Date();

        let result = await db.collection("eventsDB").insertOne(req.body);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});

/* Retrieve a single event */
router.get('/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("eventsDB").findOne({ _id: new ObjectId(req.params.id) });
        if (result) {
            res.json(result);   
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});

// Update a single event
router.put('/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        // req.body.quotaNum = parseInt(req.body.quotaNum);
        req.body.terms = req.body.terms == "on";
        req.body.modifiedAt = new Date();
        delete req.body._id;

        let result = await db.collection("eventsDB").updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Event updated" });
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});

// Delete a single event
router.delete('/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("eventsDB").deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Event deleted" });
        } else {
            res.status(404).json({ message: "Even not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});


// router.get('/search/:title', async function (req, res) {

//   const db = await connectToDB();
//   console.log(req.params.title);
//   const regexPattern = new RegExp(req.params.title, 'i');

//   try {
//     let page = parseInt(req.query.page) || 1;
//     let perPage = parseInt(req.query.perPage) || 6;
//     let skip = (page - 1) * perPage;

//     let result = await db.collection("eventsDB").find({ eventTitle: { $regex: regexPattern } }).skip(skip).limit(perPage).toArray();

//     let total = await db.collection("eventsDB").countDocuments();
//     res.json({'events': result, 'totals': total});

//     // res.render('event', { title: 'Events', events: result, total: total, page: page, perPage: perPage, paths: { "/": "Home", "/event": "Events" } });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   } finally {
//     await db.client.close();
//   }
// });

module.exports = router;
