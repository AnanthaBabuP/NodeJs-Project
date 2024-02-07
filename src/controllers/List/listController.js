
const itemService = require('../../services/List/listService');
const commonMethod = require('../../Common/CommonMethods');
const commonData = require('../../Common/DataStringStoreage');

exports.getList = async (req, res) => {
    try {
        const currentPage  = parseInt(req.body.page) || 1;
        const pageSize = commonData.commonIntObject.PAGE_COUNT_05; // Number of items per page
        const startIndex = (currentPage  - 1) * pageSize;
        const endIndex = currentPage  * pageSize;

        const items = await itemService.getAllItems();

        const totalPages = await commonMethod.calculateTotalPages(items,pageSize);

        const paginatedItems = items.slice(startIndex, endIndex);
        res.render('List/list', { totalPages, currentPage , items: paginatedItems });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Error fetching items');
    }
};
