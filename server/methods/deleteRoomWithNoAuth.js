Meteor.methods({
    deleteRoomWithNoAuth(rid) {
        const room = RocketChat.models.Rooms.findOneById(rid);

        if (!room) {
            throw new Meteor.Error('error-invalid-room', 'Invalid room', {
                method: 'deleteRoomWithNoAuth'
            });
        }

        RocketChat.models.Messages.removeByRoomId(rid);
        RocketChat.models.Subscriptions.removeByRoomId(rid);
        return RocketChat.models.Rooms.removeById(rid);
    }
});