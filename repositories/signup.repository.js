class SignupRepository {
  constructor(SignupModel) {
    this.signupModel = SignupModel;
  }
  // 유저 생성
  createUserData = async (nickname, password) => {
    const createUser = await this.signupModel.create({
      nickname,
      password,
    });
    return createUser;
  };
  // 닉네임 중복 확인을 위한 유저 검색
  findUserNickname = async (nickname) => {
    const findUser = await this.signupModel.findOne({
      where: { nickname },
      attributes: ['userId'],
    });
    return findUser;
  };
}

module.exports = SignupRepository;
