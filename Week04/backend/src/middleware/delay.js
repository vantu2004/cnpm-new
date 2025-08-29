const delay =
  (ms = 300) =>
  (req, res, next) =>
    setTimeout(next, ms);
export default delay;
