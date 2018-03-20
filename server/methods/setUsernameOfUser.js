Meteor.methods({
    setUsernameOfUser(email, username) {
        const user = RocketChat.models.Users.findOneByEmailAddress(email);
        console.log(user);
        if (!user) { return { error: 404 }; }
        const userId = user._id;
        if (!userId) {
            throw new Meteor.Error('error-invalid-user', 'Invalid user', {
                method: 'setUsernameOfUser'
            });
        }


        //Now set their username
        Meteor.runAsUser(userId, () => Meteor.call('setUsername', username));

        return RocketChat.API.v1.success({ user: RocketChat.models.Users.findOneById(userId, { fields: RocketChat.API.v1.defaultFieldsToExclude }) });

    }
});