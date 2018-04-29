
const expect = require('chai').expect

const {Birth, Setting} = require('../../service')
const utility = require('../lib/utility')
const random = require('../lib/random')

describe('service/birth', function () {
  let user
  let birth
  let setting

  before(function* () {
    user = await utility.createTestUserAsync()
  })

  after(function* () {
    await utility.removeTestUserAsync(user)
  })

  describe('addAsync', function () {
    it('should return false if user not found', function* () {
      let tmpBirth = await utility.createTestBirthAsync('invalid user')
      expect(tmpBirth).to.be.false
    })

    it('should add birth success', function* () {
      birth = await utility.createTestBirthAsync(user.userId)
      expect(birth).to.include.keys(['birthId', 'title', 'type', 'date'])
    })
  })

  describe('getAsync', function () {
    it('should return false if birth not found', function* () {
      let tmpBirth = await Birth.getAsync(-1)
      expect(tmpBirth).to.be.false
    })

    it('should get birth success', function* () {
      let tmpBirth = await Birth.getAsync(birth.birthId)
      expect(tmpBirth.title).to.equal(birth.title)
      expect(tmpBirth.type).to.equal(birth.type)
      expect(tmpBirth.date).to.equal(birth.date)
    })
  })

  describe('findAsync', function () {
    it('should return birth list success', function* () {
      let births = await Birth.findAsync(user.userId)
      expect(births.length).to.equal(1)
      expect(births[0].birthId).to.equal(birth.birthId)
    })
  })

  describe('updateAsync', function () {
    it('should return false if birth not found', function* () {
      let tmpBirth = await Birth.updateAsync(-1)
      expect(tmpBirth).to.be.false
    })

    it('should update birth success', function* () {
      let title = random.getBirthTitle()
      let tmpBirth = await Birth.updateAsync(birth.birthId, {title})
      expect(tmpBirth.title).to.equal(title)
      birth.title = title
    })
  })

  describe('findWithSettingAsync', function () {
    it('should return list success', function* () {
      let births = await Birth.findWithSettingAsync(0, 1)
      expect(births.length).to.equal(1)
      expect(births[0]).to.include.keys('settings')
    })
  })

  describe('removeAsync', function () {
    it('should return false if birth not found', function* () {
      let tmpBirth = await Birth.removeAsync(-1)
      expect(tmpBirth).to.be.false
    })

    it('should add setting success', function* () {
      let advance = random.getSettingAdvance()
      let time = random.getSettingTime()
      setting = await Setting.addAsync(birth.birthId, {advance, time})
      expect(setting).to.include.keys(['settingId', 'advance', 'time'])
    })

    it('should remove birth and setting success', function* () {
      await Birth.removeAsync(birth.birthId)
      let tmpBirth = await Birth.getAsync(birth.birthId)
      let tmpSetting = await Setting.getAsync(setting.settingId)
      expect(tmpBirth).to.be.false
      expect(tmpSetting).to.be.false
    })
  })
})
