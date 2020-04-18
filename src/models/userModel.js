const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const token = require('../constants/token.js');

const userSchema = new Schema({
    emailCode: Number,
    password: String,
    userID: String,
    email: String,
    profile: {
        rank: {
            type: Number,
            default: 2020
        },
        famePoint: {
            type: Number,
            default: 0
        },
        money: {
            type: Number,
            default: 2000
        },
        exp: {
            type: Number,
            default: 0
        },
        diamond: {
            type: Number,
            default: 0
        },
        level: {
            type: Number,
            default: 1
        },
        technicalPoint: {
            index: {
                type: Number,
                default: 0
            },
            martialArt: {
                type: Number,
                default: 0
            },
            avoid: {
                type: Number,
                default: 0
            },
            propUp: {
                type: Number,
                default: 0
            },
            critical: {
                type: Number,
                default: 0
            },
            hp: {
                type: Number,
                default: 0
            },
            armor: {
                type: Number,
                default: 0
            }
        },
        expNextLevel: {
            type: Number,
            default: 200
        }
    },
    isConfirmbyEmail: {
        type: Boolean,
        default: false
    },
    isCreateMain: {
        type: Boolean,
        default: false
    },
    main: {
        userName: String,
        kind: String,
        martialArt: Number,
        avoid: Number,
        propUp: Number,
        critical: Number,
        hp: Number,
        armor: Number,
        position: {
            type: Number,
            default: 2
        },
        srcImage: String
    },
    pets: [{
        userName: String,
        kind: String,
        martialArt: Number,
        avoid: Number,
        propUp: Number,
        critical: Number,
        hp: Number,
        armor: Number,
        position: {
            type: Number,
            default: -1
        },
        srcImage: String
    }]
})

const users = mongoose.model('user', userSchema);

/**
 * 
 */
function getUserByEmail (email) {
    return new Promise((resolve, reject) => {
        users.findOne({ email, email }, (err, data) => {
            if (err) {
                resolve({
                    code: 404
                  })
                reject(new Error('somthing err in getUserByEmail'))
            } else {
                if (data) {
                    resolve({
                        code: 200,
                        user: {
                            main: data.main,
                            pets: data.pets,
                            email: data.email,
                            profile: data.profile
                        }
                    })
                } else {
                    resolve({
                        code: 404 // Khong tim thay user nao
                    })
                }
            }
        })
    })
}


function updateProfile (data) {
    return new Promise((resolve, reject) => {
        token.verify(data.token).then((dataToken) => {
            if (dataToken) {
                users.findOne({ email: res.user.email }, (err, user) => {
                    if (err) {
                        resolve({
                            code: 404,
                            message: 'User not found'
                        })
                    } else if (user) {
                        user.profile = {
                            ...user.profile,
                            ...data.profile
                        }
                        user.save((err, updatedUser) => {
                            if (err) {
                                resolve({
                                    code: 404,
                                    message: 'user save is err'
                                })
                            } else if (updatedUser) {
                                resolve({
                                    code: 200,
                                    message: 'Update profile success!'
                                })
                            } else {
                                resolve({
                                    code: 404,
                                    message: 'user save is err'
                                })
                            }
                        })
                    } else {
                        resolve({
                            code: 404,
                            message: 'User err'
                        })
                    }
                })
            } else {
                resolve({
                    code: 404,
                    message: 'Token err'
                })
            }
        })
    })
}

function updateMainPets (data) {
    return new Promise((resolve, reject) => {
        token.verify(data.token).then((dataToken) => {
            if (dataToken) {
                users.findOne({ email: dataToken.user.email }, (err, user) => {
                    if (err) {
                        resolve({
                            code: 404,
                            message: 'can not found user'
                        })
                    } else if (user) {
                        user.main = {
                            ...user.main,
                            ...data.main
                        }
                        user.pets = data.pets
                        user.save((err, newUser) => {
                            if (err) {
                                resolve({
                                    code: 404,
                                    message: 'can not save user'
                                })
                            } else if (newUser) {
                                resolve({
                                    code: 200,
                                    message: 'Update success!'
                                })
                            } else {
                                resolve({
                                    code: 404,
                                    message: 'can not save user'
                                })
                            }
                        })
                    } else {
                        resolve({
                            code: 404,
                            message: 'can not found user'
                        })
                    }
                })
            } else {
                resolve({
                    code: 404,
                    message: 'Error Update Main and Pets'
                })
            }
        })
    })
}

module.exports = {
    users,
    getUserByEmail,
    updateProfile,
    updateMainPets
}