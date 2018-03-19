Meteor.methods({
    createTokenNoPassword(email) {
        if (!RocketChat.authz.hasPermission(Meteor.userId(), 'user-generate-access-token')) {
            throw new Meteor.Error('error-not-authorized', 'Not authorized', { method: 'createToken' });
        }
        const user = RocketChat.models.Users.findOneByemail(email);
        console.log(user);
        const userId = user.userId();
        const token = Accounts._generateStampedLoginToken();
        Accounts._insertLoginToken(userId, token);
        return {
            userId,
            authToken: token.token
        };
    }
});