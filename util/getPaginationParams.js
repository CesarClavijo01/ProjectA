const getPaginationParams = ({ limit = 10, page = 0, maxLimit = 100 }) => {
    // Ensure limit and page are numbers and within valid bounds
    const sanitizedLimit = Math.min(Math.max(parseInt(limit, 10), 1), maxLimit);
    const sanitizedPage = Math.max(parseInt(page, 10), 0); // 0 based page indexing

    // Calculate offset
    const offset = sanitizedPage * sanitizedLimit;

    return { nLimit: sanitizedLimit, nOffset: offset };
};

module.exports = getPaginationParams;