const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.get("/users", (req, res) => {
  Users.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

router.post("/users", async (req, res) => {
  try {
    const user = new Users({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      address: {
        street: req.body.street,
        suite: req.body.suite,
        city: req.body.city,
        zipcode: req.body.zipcode,
        geo: {
          lat: req.body.geo && req.body.geo.lat,
          lng: req.body.geo && req.body.geo.lng,
        },
      },

      phone: req.body.phone,
      website: req.body.website,
      company: {
        name: req.body.name,
        catchPhrase: req.body.catchPhrase,
        bs: req.body.bs,
      },
    });
    await user.save();
    res.send({
      user,
    });
  } catch (err) {
    res.send({
      err: err.message,
    });
  }
});

module.exports = router;
