const {isAdminUser} = require("../services/user-auth");
describe('File Service Test', () => {

    test('/file acl array & user acl array compare test', () => {
        const test = [
            {session: {}, result: false},
            {session: {userStatus: 'active', role:'admin'}, result: true},
            {session: {userStatus: 'active'}, result: false},
            {session: {userStatus: 'aaaaa', role:'admin'}, result: false},
            {session: {userStatus: 'active', role:'ADMIN'}, result: true},
            {session: {userStatus: 'inActIve', role:'ADMIN'}, result: false},
            {session: {userStatus: 'actIve', role:'ADMIN'}, result: true},
            {session: {userStatus: null, role: null}, result: false},
        ];

        for (let t of test) {
            const result = isAdminUser(t.session);
            expect(result).toBe(t.result);
        }
    });
});