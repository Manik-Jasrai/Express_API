const verifyRoles = (...rolesAccepted) => {
    return (req,res,next) => {
        if( !req.roles ) return res.sendStatus(401);
        const rolesArray = [...rolesAccepted];
        const validRole = req.roles.find(role => rolesArray.includes(role));
        if ( !validRole  ) return res.sendStatus(401);
        next();
    };
};

module.exports = verifyRoles;