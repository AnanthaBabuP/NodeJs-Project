const updateDelete = require('../../services/List/updateDeleteService');

async function getEdit(req, res) {
    const itemId = parseInt(req.body.itemId);
    console.log("Get : "+itemId);
    // Find the item with the given ID
    const itemToEdit = await updateDelete.findData(itemId);
    // res.body.employee = itemToEdit;
    if (!itemToEdit) {
        return res.status(404).send('Item not found');
    }

    // Render the edit form with the item data
    res.render('Register/employeeDetailEdit',{employee : itemToEdit,error:"",info:""});

}

async function confirmEdit(req, res) {
    const itemId = parseInt(req.body.id);
    console.log("Post : "+itemId);
    // Find the index of the item with the given ID
    const index = await updateDelete.findData(itemId);
    if (index === -1) {
        return res.status(404).send('Item not found');
    }

    let changesDetected = false;
    for (let key in index) {
        if (index.hasOwnProperty(key) && req.body.hasOwnProperty(key)) {

            // Convert values to the same type if possible
            let oldValue = index[key];
            let newValue = req.body[key];
            
            if (typeof oldValue !== typeof newValue) {
                // Attempt to convert the value to the same type
                newValue = typeof oldValue === 'number' ? parseInt(newValue) : newValue;
                oldValue = typeof newValue === 'string' ? newValue.toString() : oldValue;
            }
            if (oldValue !== newValue) {
                console.log(`Change detected in ${key}: ${index[key]} => ${req.body[key]}`);
                // Handle the change as needed
                changesDetected = true; // Set changesDetected to true if change detected
            }
        }
    }
    if (!changesDetected) {
        return res.render('Register/employeeDetailEdit',{employee : req.body, error:"No Changes Ather..",info:""});
    }
    await updateDelete.updateUserData(itemId,req.body);

    // Redirect to the list of items after editing
    res.redirect('/list');
}

async function employeeDataDelete(req, res) {
    const itemId = parseInt(req.body.itemId); // Retrieve the item ID from the request body
    console.log(" Deleted Id : "+itemId);
    const delFlag = updateDelete.deleteUser(itemId);
    if(!delFlag){
        console.error('Error Delete UsreId:', itemId);
    }
    // Redirect to the list of items after deletion
    res.redirect('/list');
}

module.exports = {
    getEdit,
    confirmEdit,
    employeeDataDelete
}