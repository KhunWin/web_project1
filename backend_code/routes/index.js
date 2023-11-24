var express = require('express');
var router = express.Router();

const { connectToDB, ObjectId } = require('../utils/db');

/* HOME page */
router.get('/', async function (req, res) {
  const db = await connectToDB();
  try{
    let recentEvents = await db.collection("eventsDB").find().sort({ createdAt: -1 }).limit(3).toArray();
    res.render('index', { title: 'title', recentEvents: recentEvents, paths: { "/": "Home" } });
    // res.render('index', {title: 'title'});
  }catch(err){
    res.status(400).json({ message: err.message });
  }finally{
    await db.client.close();
  }
});

/* GET a new event page. */
router.get('/event/new', function(req, res, next) {
  res.render('eventform', { title: 'eventform' });
});

router.post('/event/new', async function (req, res) {
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


/* Handle the volunteer Form */
router.get('/become/volunteer', function(req, res, next) {
  res.render('volunteer', { title: 'volunteer' });
});
router.post('/become/volunteer', async function (req, res) {
  const db = await connectToDB();
  try {
    req.body.terms = req.body.terms == "on";
    req.body.createdAt = new Date();
    req.body.modifiedAt = new Date();

    let result = await db.collection("volunteersDB").insertOne(req.body);
    res.render('afterVolunteer', { form: result });
    // res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

/* all Event */
router.get('/event', async function (req, res) {
  const db = await connectToDB();
  try {
    let page = parseInt(req.query.page) || 1;
    let perPage = parseInt(req.query.perPage) || 6;
    let skip = (page - 1) * perPage;

    let result = await db.collection("eventsDB").find().skip(skip).limit(perPage).toArray();
    let total = await db.collection("eventsDB").countDocuments();
    res.render('event', { title: 'Events', events: result, total: total, page: page, perPage: perPage, paths: { "/": "Home", "/event": "Events" } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});


//trying to edit 
/* Display the updated event */
router.get('/event/edit/:id', async function (req, res) {
  const db = await connectToDB();
  try {
    let result = await db.collection("eventsDB").findOne({ _id: new ObjectId(req.params.id) });
    if (result) {
      res.render('edit', { event: result });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});


//update the single event
router.post('/event/edit/:id', async function (req, res) {
  const db = await connectToDB();
  try {
    req.body.quotaNum = parseInt(req.body.quotaNum);
    req.body.terms = req.body.terms == "on";
    req.body.modifiedAt = new Date();

    let result = await db.collection("eventsDB").updateOne({ _id: new ObjectId(req.params.id)}, { $set: req.body });
    if (result.modifiedCount > 0){
        res.render('afterUpdate', { update: result });
      // res.status(200).json({message: "Event updated"});
    }else{
          res.status(404).json({message: "Event's not found"});
    }
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});


// // Delete a single event
router.get('/event/delete/:id', async function (req, res) {
  const db = await connectToDB();
  try {
    let result = await db.collection("eventsDB").deleteOne({ _id: new ObjectId(req.params.id)});
    if (result.deletedCount > 0){
      res.render('afterRemove',{remove: result});
      // res.status(200).json({message: "The event has been removed!"})
    }else{
          res.status(404).json({message: "ObjectID is not defined"})
    } 
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

//display a single event for detail
router.get('/event/detail/:id', async function (req, res) {
  const db = await connectToDB();
  try {
    let result = await db.collection("eventsDB").findOne({ _id: new ObjectId(req.params.id) });
    if (result) {
      res.render('detail', { event: result });
    } else {
      res.status(404).json({ message: "Event is not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

module.exports = router;
