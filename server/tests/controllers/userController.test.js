// userController.test.js
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const mongoose = require('mongoose');

describe('User Controller', () => {
  let User;

  beforeEach(async () => {
    // Clear the existing model definitions
    await mongoose.connection.dropDatabase();

    // Define the User model
    User = mongoose.model('User', {
      username: String,
      email: String,
      password: String,
      avatarImage: String
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('register function', () => {
    it('should register a new user successfully', async () => {
      const req = { body: { username: 'testuser', email: 'test@example.com', password: 'password123' } };
      const res = {
        json: sinon.spy()
      };

      await require('../../controllers/userController').register(req, res);

      expect(res.json).to.have.been.calledWith({
        status: true,
        user: {
          username: 'testuser',
          email: 'test@example.com'
        }
      });
    });

    it('should return error if username already exists', async () => {
      const req = { body: { username: 'existinguser', email: 'newuser@example.com', password: 'password123' } };
      const res = {
        json: sinon.spy()
      };

      sinon.stub(User.findOne, 'exec').resolves({ username: 'existinguser' });

      await require('../../controllers/userController').register(req, res);

      expect(res.json).to.have.been.calledWith({
        msg: 'Username already used',
        status: false
      });
    });

    it('should return error if email already exists', async () => {
      const req = { body: { username: 'newuser', email: 'existingemail@example.com', password: 'password123' } };
      const res = {
        json: sinon.spy()
      };

      sinon.stub(User.findOne, 'exec').resolves({ email: 'existingemail@example.com' });

      await require('../../controllers/userController').register(req, res);

      expect(res.json).to.have.been.calledWith({
        msg: 'Email already used',
        status: false
      });
    });
  });

  describe('login function', () => {
    it('should login a user successfully', async () => {
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        json: sinon.spy()
      };

      sinon.stub(User.findOne, 'exec').resolves({
        username: 'testuser',
        password: 'hashedPassword'
      });

      sinon.stub(bcrypt.compare, 'async').resolves(true);

      await require('../../controllers/userController').login(req, res);

      expect(res.json).to.have.been.calledWith({
        status: true,
        user: {
          username: 'testuser'
        }
      });
    });

    it('should return error for incorrect credentials', async () => {
      const req = { body: { username: 'incorrectuser', password: 'wrongpass' } };
      const res = {
        json: sinon.spy()
      };

      sinon.stub(User.findOne, 'exec').resolves(null);
      sinon.stub(bcrypt.compare, 'async').resolves(false);

      await require('../../controllers/userController').login(req, res);

      expect(res.json).to.have.been.calledWith({
        msg: 'Incorrect Username or Password',
        status: false
      });
    });
  });
});