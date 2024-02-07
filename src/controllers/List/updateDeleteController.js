async function getEdit(req, res) {
    const itemId = parseInt(req.params.id);
    // Find the item with the given ID
    const itemToEdit = items.find(item => item.id === itemId);
    if (!itemToEdit) {
        return res.status(404).send('Item not found');
    }
    // Render the edit form with the item data
    res.render('edit', { item: itemToEdit });

}

async function postEdit(req, res) {
    const itemId = parseInt(req.params.id);
    // Find the index of the item with the given ID
    const index = items.findIndex(item => item.id === itemId);
    if (index === -1) {
        return res.status(404).send('Item not found');
    }
    // Update the item's name with the new value from the form
    items[index].name = req.body.name;
    // Redirect to the list of items after editing
    res.redirect('/items');
}

async function employeeDataDelete(req, res) {
    const itemId = parseInt(req.body.itemId); // Retrieve the item ID from the request body
    console.log(" Deleted Id : "+itemId);
    console.log(" totalPages Id : "+req.body.total);
    console.log(" currentPage Id : "+req.body.itemId);
    console.log(" paginatedItems Id : "+req.body.itemId);
    // Filter out the item with the given ID
    // items = items.filter(item => item.id !== itemId);
    // Redirect to the list of items after deletion
    res.redirect('/list');
    // res.render('List/list', { totalPages, currentPage , items: paginatedItems});
}

module.exports = {
    getEdit,
    postEdit,
    employeeDataDelete
}