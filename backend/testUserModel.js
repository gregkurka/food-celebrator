const {
  createUser,
  getUserById,
  getAllUsers,
  deleteUserById,
} = require("./models/userModel");

async function testUserModel() {
  try {
    // Create a new user
    const newUser = await createUser(
      "testuser",
      "test@example.com",
      "hashedpassword123"
    );
    console.log("User created:", newUser);

    // Fetch the user by ID
    const user = await getUserById(newUser[0].id);
    console.log("User fetched by ID:", user);

    // Fetch all users
    const allUsers = await getAllUsers();
    console.log("All users:", allUsers);

    // Delete the user by ID
    const deleteCount = await deleteUserById(newUser[0].id);
    console.log(`Number of users deleted: ${deleteCount}`);
  } catch (err) {
    console.error("Error testing userModel:", err);
  } finally {
    process.exit(); // Exit the script
  }
}

testUserModel();
