Meteor.methods({
    createTokenNoPassword(email) {
        if (!RocketChat.authz.hasPermission(Meteor.userId(), 'user-generate-access-token')) {
            throw new Meteor.Error('error-not-authorized', 'Not authorized', { method: 'createToken' });
        }
        const user = RocketChat.models.Users.findOneByEmailAddress(email);
        console.log(user);
        if (!user) { return { error: 404 }; }
        const userId = user._id;
        const token = Accounts._generateStampedLoginToken();
        Accounts._insertLoginToken(userId, token);
        return {
            userId,
            authToken: token.token
        };
    }
});