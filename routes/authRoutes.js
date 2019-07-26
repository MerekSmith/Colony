const passport = require("passport");

module.exports = app => {
  // This intiates the google authentication process and sends the user to google for them to provide authorization that their profile is used. This will then send them back to our site with a code.
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Once the user gives google permission, they will be sent back with their code here. We then send another request with the provided code and receive back the user's profile info.
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // redirect is a function that comes from the response and can redirect us back to a different page.
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    // the logout function is included in the req from passport and basically deletes the cookie.
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
