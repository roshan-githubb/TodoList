import { getLocalStorageData } from "../user/login.service";

export async function getHeadingText() {
  return "Welcome to Todo, an app where you can create, list, update and delete todos.";
}

export async function showAlert() {
  alert("This is an alert message!");
}

export async function checkLogin() {
  const profileData: any = await getLocalStorageData();

  if (profileData?.token && profileData?.userId) {
    return true;
  } else {
    return false;
  }
}
