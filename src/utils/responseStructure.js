const createResponse = (code, description, data = null) => (
    {
        responseCode : code,
        responseCodeDescription : description,
        data : data,
        //responseTime: new Date().toISOString()
        responseTime : new Date().toLocaleString('en-IN', {timezone:'Asia/Kolkata'})
    }
);

module.exports = createResponse;