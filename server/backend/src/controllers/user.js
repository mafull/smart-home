

const handleGETuser = (req, res, next) => {
    const query = `
        SELECT 
            username,
            email
        FROM
            user;
    `;
    res.locals.db.query(query, (err, results) => {
        if (err) return next(err);

        res.json({ users: results });
    });
};


export {
    handleGETuser
};
