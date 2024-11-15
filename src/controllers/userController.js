const {
  updateUserProfile,
  getUserProfile,
  deleteUserAccount,
} = require("../services/userService");
const createResponse = require("../utils/responseStructure");

exports.getUser = async (req, res) => {
  try {
    const userID = req.user.id;
    if (!userID) {
      return res
        .status(400)
        .json(
          createResponse(
            400,
            "Invalid request, no User ID found in request parameters."
          )
        );
    }
    const user = await getUserProfile(userID);
    if (!user) {
      return res.status(404).json(createResponse(404, "User not found !"));
    }
    return res
      .status(200)
      .json(
        createResponse(200, "User found, profile fetched successfully !", user)
      );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(createResponse(500, "Error fetching profile !"));
  }
};

exports.updateUser = async (req, res) => {
    try{
        const userId = req.user.id;
        const updatedData = req.body;
        if(!userId || !updatedData){
            return res.status(400).json(createResponse(400, "Invalid request, No data found !"));
        }
        //Rejcet if trying to update followers or following ids
        if("followerIds" in updatedData || "followingIds" in updatedData){
            return res.status(400).json(createResponse(400, "Invalid request, use approriate service"))
        }
        const updatedUser = await updateUserProfile(userId, updatedData);
        if(!updatedUser){
            return res.status(404).json(404, "Update failed, user not found!");
        }

        return res.status(200).json(createResponse(200, "User updated successfully !"));

    }catch(err){
        console.log(err.message);
        return res.status(500).json(createResponse(500, "Server error : " + err.message));
    }
};
