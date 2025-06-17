const express = require("express");
const CASAuthentication = require("cas-authentication");

const router = express.Router();

const cas = new CASAuthentication({
  cas_url: "https://cas.princeton.edu/cas",
  service_url: "http://localhost:4000",
  cas_version: "3.0",
  session_name: "cas_user",
  renew: false,
  is_dev_mode: false,
  dev_mode_user: "testuser",
});

// login
router.get("/login", cas.bounce, (req, res) => {
  res.json({ user: req.session.cas_user });
});

// logout
router.get("/logout", cas.logout);

// logged in user
router.get("/me", (req, res) => {
  if (req.session.cas_user) {
    res.json({ user: req.session.cas_user });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

module.exports = router;
