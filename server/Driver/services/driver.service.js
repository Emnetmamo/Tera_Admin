const UserModel = require("../model/drivermodel");
const jwt = require("jsonwebtoken");

class UserServices {
    static async registerUser(email, password, phone, firstName, lastName, code, licenseplate, licensenumber, Assignedroute, cityDistrict, Address, qrCode) {
        try {
            console.log("-----Email --- Password-----", email, password);
            const createUser = new UserModel({ 
                email, 
                password, 
                phone, 
                firstName, 
                lastName, 
                code, 
                licenseplate, 
                licensenumber, 
                Assignedroute, 
                cityDistrict, 
                Address, 
                qrCode // Add the qrCode field here
            });
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

    static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
        const expirationTime = Math.floor(Date.now() / 1000) + (parseInt(JWT_EXPIRE) * 60 * 60);
        tokenData.exp = expirationTime;
        return jwt.sign(tokenData, JWTSecret_Key);
    }
    
}

module.exports = UserServices;
