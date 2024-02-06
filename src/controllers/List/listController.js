
const itemService = require('../../services/List/listService');

exports.getList = async (req, res) => {
    try {
        console.log("This is controller!")
        const items = await itemService.getAllItems();
        res.render('List/list', { items });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Error fetching items');
    }
};
