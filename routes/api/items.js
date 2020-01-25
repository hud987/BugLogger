const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item')

// @route Get api/items
// @desc Get all items
// @access public
router.get('/', (req, res) => {
  Item.find()
  .sort({ date: -1 })
  .then(items => res.json(items))
});
  
// @route Post api/items
// @desc Create an item
// @access public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  })

  newItem.save()
  .then(item => res.json(item))
});

// @route Delete api/items
// @desc Delete an item
// @access public
router.delete('/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
  .then(ret => res.json('item deleted'))
});
  

module.exports = router;