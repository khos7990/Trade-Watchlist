const Watchlist = require("../models/Watchlist");

module.exports = {
  create,
  index,
  delete: takeoff,
};

async function create(req, res) {
  try {
    console.log(req.body);
    await Watchlist.create({
      Name: req.body.Name,
      pairs: req.body.pairs,
      user: req.user._id,
    });

    res.status(200).json("ok added to DB");
  } catch (err) {
    res.status(500).json(err);
  }
}

async function index(req, res) {
  let pairs = await Watchlist.find({ user: req.user._id });
  res.json(pairs);
}

async function takeoff(req, res) {
  let pair = req.body.id;
  try {
    await Watchlist.findByIdAndDelete(pair);
    res.status(200), json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
}
