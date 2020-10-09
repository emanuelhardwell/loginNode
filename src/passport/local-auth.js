const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const User = require("../models/user");

/* serializar datos ... para que cuando cambie de pestaña la sesion se mantenga iniciada "id" */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/* deserializar datos ... para comprobar en la BD que se encuentra ese usuario */
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = new User();
      user.email = email;
      user.password = password;
      await user.save();
      done(null, user); /* el "user" es el objeto final */
    }
  )
);
