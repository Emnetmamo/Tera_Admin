const UserModel = require("../model/drivermodel");
const jwt = require("jsonwebtoken");

class UserServices {
    static async registerUser(email, password, phone, firstName, lastName,code,licenseplate, licensenumber, Assignedroute,cityDistrict,Address) {
        try {
            console.log("-----Email --- Password-----", email, password);
            const createUser = new UserModel({ email, password, phone, firstName, lastName,code,licenseplate, licensenumber, Assignedroute,cityDistrict,Address });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }

    static async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            throw err;
        }
    }

    static async checkUser(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            throw err;
        }
    }

    static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE = "1h") {
        try {
            return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserServices;
