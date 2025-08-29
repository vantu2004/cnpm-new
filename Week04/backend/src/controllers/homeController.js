export const getHome = (req, res) => {
  return res.json({ message: "Welcome to Home API", user: req.user || null });
};
