const createResponse = (code, description, data = null) => (
    {
        responseCode : code,
        responseCodeDescription : description,
        data : data,
        responseTime: new Date().toISOString()
    }
);

module.exports = createResponse;