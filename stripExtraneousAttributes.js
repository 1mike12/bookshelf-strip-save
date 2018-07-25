module.exports = function stripExtraneousAttributes(columnSet, attributes){
    for (let key in attributes) {
        if (!columnSet.has(key)){
            delete attributes[key]
        }
    }
};
