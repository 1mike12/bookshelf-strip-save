module.exports = function stripExtraneousAttributes(columnSet, attributes){
    for (let key in attributes) {
        if (attributes.hasOwnProperty(key) && !columnSet.has(key)){
            delete attributes[key]
        }
    }
};
