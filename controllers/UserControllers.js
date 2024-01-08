const { User, ProfileUser } = require("../models/");
const bcrypt = require("../utils/bcrypt");
const { getToken } = require("../utils/getToken");
const jwt = require("../utils/jwt");

const register = async (req, res, next) => {
    const { nama, jenis_kelamin, email, password } =
        req.body;

    try {
        const isUserEmailExist = await User.findOne({ where: { email: email } });

        if (isUserEmailExist != null) {
            return res.status(422).json({
                message: "Email telah terdaftar",
            });
        }

        const hashedPassword = await bcrypt.hash(password);

        const userPayload = {
            email: email,
            password: hashedPassword,
        };

        const createUser = await User.create(userPayload);

        const profileUser = {
            userId: createUser.id,
            nama: nama,
            jenis_kelamin: jenis_kelamin
        };

        await ProfileUser.create(profileUser);

        res.status(201).json({
            message: "Registrasi Success, Please check your email!",
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (email === undefined || password === undefined) {
            res.status(400).json({ message: "Data not complete" });
            return;
        }

        const isUser = await User.findOne({
            where: { email: email },
        });

        if (isUser == null) {
            res.status(401).json({ message: "User not found. Please register!" });
            return;
        }

        const checkPassword = await bcrypt.compare(
            password,
            isUser.dataValues.password
        );

        if (!checkPassword) {
            res
                .status(401)
                .json({ message: "Incorrect Password. Please try again!" });
            return;
        }

        const tokenGenerated = jwt.encodeTokenJwt({
            id: isUser.id,
            email: isUser.email,
        });

        return res.status(200).json({
            message: "Login Sukses!",
            data: {
                token: tokenGenerated,
                id: isUser.id,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    const checkToken = getToken(req.headers["authorization"]);

    try {
        const isUser = await User.findOne({
            where: { id: checkToken.id },
            include: [
                {
                    association: "profile",
                    attributes: {
                        exclude: ["userId", "id", "createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: [
                    "password",
                    "createdAt",
                    "updatedAt",
                ],
            },
        });
        res.status(200).json(isUser);
    } catch (error) { }
};

const updateProfile = async (req, res, next) => {
    const checkToken = getToken(req.headers["authorization"]);

    const { nama, email, jenis_kelamin } = req.body;

    try {
      const profileUser = await ProfileUser.findOne({
        where: { userId: checkToken.id },
      });

      if (profileUser == null) {
        res.status(401).json({ message: "User not found. Please register!" });
        return;
    }

      if(email){
        await User.update(
            {email : email},
            {where : {id: checkToken.id}}
        )
      }
  
      if (profileUser){
        await ProfileUser.update(
            {
              nama: nama,
              jenis_kelamin: jenis_kelamin
            },
            { where: { userId: checkToken.id } }
          );
    
          res.status(200).json({
            message: "Success Update Profile",
          });
      }
    } catch (error) {
        next(error);
    }
  };


module.exports = {
    register,
    login,
    getProfile,
    updateProfile
};
