const sendResponse = (res, status, data , error) => {

    const body = {
      content : data,
      error : error
    }
    res.status(status);
    res.json(body);
};


const isEmptyObject = obj => {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
}

module.exports = { 
    sendResponse,
    isEmptyObject
}