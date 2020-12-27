const users = require('../models/userModel.js')
const missions = require('../models/missionModel.js')

module.exports = () => {
  setInterval(async () => {
    try {
      let listUser = await users.users.find()
      listUser.forEach(async (user) => {
        try {
          user.profile.otherInformation = {
            maxGotoLearn: 3,
            maxFight: 10,
            maxRobGotoLearn: 5
          }
          await user.save()
        } catch (error) {
          return
        }
      })
      let listMission = await missions.missions.find()
      listMission.forEach(async (mission) => {
        try {
          mission.max = 15
          mission.dayly = {
            vocabulary: 0,
            sentence: 0,
            review: 0
          }
          mission.weekly = {
            vocabulary: 0,
            sentence: 0,
            review: 0
          }
          mission.monthly = {
            vocabulary: 0,
            sentence: 0,
            review: 0
          }
          await mission.save()
        } catch (error) {
          return
        }
      })
    } catch (error) {
      return
    }
  }, 86400)
}