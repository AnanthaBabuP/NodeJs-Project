console.log('Notes Started...');
// Direct declare Value
module.exports.age = 22;

// Function Declaration syntex or EX5
module.exports.addNoteES5Adding = function(vala ,valb){
    var valc = vala+ valb;
    console.log(vala+" + "+valb + " = ");
    return valc;
}

// Function Declaration syntex or ES6
module.exports.addNoteES6 = () => {
    console.log('Add Note ES6 Call..');
    return "New ES6 return";
}
// console.log(module);