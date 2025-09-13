import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/config";

export const customLoaders = async () => {
	try {
		const getSettingFn = httpsCallable(functions, "getSetting");
		const getUsersFn = httpsCallable(functions, "getUsers");
		const [setting, users] = await Promise.all([getSettingFn(), getUsersFn()]);

		return {
			setting: setting.data,
			users: users.data
		};
	} catch (error: any) {
		console.error(error.message);
	}
}