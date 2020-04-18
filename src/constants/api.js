module.exports = () => {
    return {
        ROOT_API: {
            AUTH: '/api/users', // /api/user -> /api/users
            MAIN: '/api/main/:email',
            WORD: '/api/word',
            EXAMPLE: '/api/example',
            BADWORD: '/api/badword',
            RANK: '/api/rank'
        },
        USER: {
            UPDATE_PROFILE: '/profile/:email'
        }
    }
}