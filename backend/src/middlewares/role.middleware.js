// usage: roleMiddleware(['admin','rh']) or roleMiddleware('admin')
function roleMiddleware(allowed) {
	const allowedArray = Array.isArray(allowed) ? allowed : [allowed];
	return (req, res, next) => {
		if (!req.user || !req.user.role) return res.status(403).json({ message: 'Role missing' });
		if (!allowedArray.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
		next();
	};
}

module.exports = roleMiddleware;
