import authService from "../../../services/authService";
import userService from "../../../services/userService";

export const StaffList = async () => {
  return await userService.getListUser();
};

export const staffAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "DELETE_USER") {
    const id = formData.get("userId");
    await userService.deleteUserById(id);
    return { success: true };
  }
  if (intent === "CREATE_USER") {
    const payload = {
      campus_id: formData.get("campus_id"),
      canteen_id: formData.get("canteen_id"),
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      birthday: formData.get("birthday"),
      email_parents: formData.get("email_parents"),
    };
    try {
      await authService.signUp(payload);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return null;
};
