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
  return null;
};
