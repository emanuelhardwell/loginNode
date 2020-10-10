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
      //validar que el correo sea unico
      const user = User.findOne({ email: email });
      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The email is already taken")
        );
      } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password); /*  */
        await newUser.save();
        done(null, newUser); /* el "user" es el objeto final */
      }
    }
  )
);

/* verificar contraseña */
passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, req.flash("signinMessage", "User not found "));
      }
      if (!user.comparePassword(password)) {
        return done(
          null,
          false,
          req.flash("signMessage", "Password is incorrect")
        );
      }
      done(null, user);
    }
  )
);
