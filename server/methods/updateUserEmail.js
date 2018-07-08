Meteor.methods({
  updateUserEmail(body) {
    const x = RocketChat.models.Users.findOneById(body.user._id);
    if (x) {
      const userData = {};
      userData._id = body.user._id;
      userData.email = body.user.email;
      RocketChat.setEmail(userData._id, userData.email);
    }
    return x;
  }
});
