import _ from 'underscore';

Meteor.methods({
  testMethod(body) {
    console.log(body);
    const x = RocketChat.models.Users.findOneById(body.user.uid);
    if (x) {
      const userData = _.extend({ _id: body.user.uid }, body.user);

      Meteor.runAsUser(this.userId, () => RocketChat.saveUser(body.user.uid, userData));
    }

    return x;
  }
});
