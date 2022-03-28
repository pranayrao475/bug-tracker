// logic for CRUD functions with group
const { Bug } = require('../models');
//const { withAuth } = require('../utils/auth');
module.exports = {
  // get all bugs for dahsboard
   async getAllBugs(req, res) {
    console.log(req.session)
    const allBugs =await Bug.find();

    if (!allBugs) {
      return res.status(400).json({message: 'No bugs found'});
    }
    res.status(200).json(allBugs);
  },

  // create bug
  async createBug({ body }, res) {
    const bug = await Bug.create(body);

    if (!bug) {
      return res.status(400).json({message: 'Unable to create bug'});
    }
    res.status(200).json(bug);
  },

  // get one bug
  async getBug({ params }, res) {
    const bug =await Bug.findOne({$or: [{ _id: params.id }]});
    console.log(bug);
    if (!bug) {
      return res.status(400).json({ message: 'No bug found by that id' });
    }
    res.status(200).json(bug);
  },

  // update a bug 
   async updateBug({ body, params }, res) {
    console.log(params.id,body)
    const bug =await Bug.findOneAndUpdate({_id: params.id},{
      title: body.title,
      description: body.description,
      assignee: body.assignee,
    })

    if (!bug) {
      return res.status(400).json({message: 'Unable to update bug'});
    }
    res.status(200).json(bug);
  },

  // remove bug
   async removeBug({ params }, res) {
    const bug =await Bug.deleteOne({_id: params.id});

    if (!bug) {
      return res.status(400).json({message: 'Unable to delete bug'});
    }
    res.status(200).json(bug);
  }
}