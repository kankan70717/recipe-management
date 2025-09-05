import { useState } from "react";
import { initialUserData } from "../../constants/initialUserData";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/config";
import type { TypeUserData } from "../../types/users/TypeUsers";
import { useSetting } from "../../context/SettingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import noImage from "../../assets/noImage.jpg";

export function UserLayout() {
	const [isFormOpen, setFormOpen] = useState(false);
	const [formData, setFormData] = useState<TypeUserData>(initialUserData);
	const { users } = useSetting();
	console.log("formData", formData);

	const createNewUserFunc = httpsCallable<TypeUserData, { message: string }>(
		functions,
		"createNewUser"
	);

	const updateUserFunc = httpsCallable<TypeUserData, { message: string }>(
		functions,
		"updateUser"
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, files, type } = e.target as HTMLInputElement;

		setFormData(prev => ({
			...prev,
			[name]: type === "file" && files ? files[0] : value
		}));
	};

	const createUser = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			let photoBase64: string | undefined;

			if (formData.photoFile) {
				// Base64 に変換
				const reader = new FileReader();
				photoBase64 = await new Promise<string>((resolve, reject) => {
					reader.onload = () => {
						const result = reader.result as string;
						const base64 = result.split(",")[1];
						resolve(base64);
					};
					reader.onerror = reject;
					reader.readAsDataURL(formData.photoFile!);
				});
			}

			const result = await createNewUserFunc({ ...formData, photoBase64 });
			console.log(result.data.message);
			setFormData(initialUserData);

		} catch (err) {
			console.error(err);
			alert("Failed to register user.");
		}
	};

	const updateUser = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			let photoBase64: string | undefined;

			if (formData.photoFile) {
				// Base64 に変換
				const reader = new FileReader();
				photoBase64 = await new Promise<string>((resolve, reject) => {
					reader.onload = () => {
						const result = reader.result as string;
						const base64 = result.split(",")[1];
						resolve(base64);
					};
					reader.onerror = reject;
					reader.readAsDataURL(formData.photoFile!);
				});
			}

			const result = await updateUserFunc({ ...formData, photoBase64 });
			console.log(result.data.message);
			setFormData(initialUserData);

		} catch (err) {
			console.error(err);
			alert("Failed to update user.");
		}
	}

	return (
		<div className={`relative h-full`}>
			<div className="flex flex-col gap-3 p-10">
				<div className="flex justify-between">
					<span className="capitalize text-2xl">user list</span>
					<button
						className="capitalize rounded-full bg-black text-white px-3"
						onClick={() => setFormOpen(true)}>
						create user
					</button>
				</div>
				<div className="border border-gray-400 rounded">
					<table className="table-auto w-full border-collapse">
						<tbody>
							<tr className="capitalize bg-gray-200 leading-10">
								<th className="pl-5 text-left">name</th>
								<th className="pl-5 text-left">email</th>
								<th className="pl-5 text-left">store</th>
								<th className="pl-5 text-left">role</th>
								<th className="pl-5 text-left"></th>
							</tr>
							{Object.entries(users).map(([uid, user]: [string, TypeUserData]) => (
								<tr key={uid} className="leading-20">
									<td className="flex items-center gap-2 border-r-1 border-gray-200 pl-5">
										<img src={user.photoURL ? user.photoURL : noImage} className="rounded-full w-10 object-cover aspect-square" />
										<span className="capitalizegit">{user.displayName}</span>
									</td>
									<td className="border-r-1 border-gray-200 pl-5">{user.email}</td>
									<td className="border-r-1 border-gray-200 pl-5 capitalize">{user.store}</td>
									<td className="border-r-1 border-gray-200 pl-5 capitalize">{user.role}</td>
									<td className="text-center">
										<FontAwesomeIcon
											icon={faEdit}
											onClick={() => {
												setFormOpen(true);
												setFormData(user);
											}} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{isFormOpen &&
				<div className="absolute inset-0 bg-black/50">
					<form onSubmit={formData.uid == ""
						? createUser
						: updateUser}
						className="flex flex-col justify-center gap-3 my-18 mx-50 py-10 px-15 rounded bg-white">
						<div className="flex items-center justify-between">
							<span className="capitalize text-2xl">
								{formData.displayName === "" ? "new user" : formData.displayName}
							</span>
							<FontAwesomeIcon icon={faXmark} onClick={() => {
								setFormOpen(false);
								setFormData(initialUserData);
							}} />
						</div>
						<div className="flex gap-2 items-center">
							<label htmlFor="displayName" className="capitalize w-40">displayName</label>
							<input
								type="text"
								name="displayName"
								value={formData.displayName}
								onChange={handleChange}
								required
								className="border rounded px-2 py-1 w-full"
							/>
						</div>
						<div className="flex gap-2 items-center">
							<label htmlFor="email" className="capitalize w-40">email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="border rounded px-2 py-1 w-full"
							/>
						</div>
						<div className="flex gap-2 items-center">
							<label htmlFor="password" className="capitalize w-40">password</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={(e) => handleChange(e)}
								required
								className="border rounded px-2 py-1 w-full"
							/>
						</div>
						<div className="flex gap-2 items-center">
							<label htmlFor="store" className="capitalize w-40">store</label>
							<select
								name="store"
								value={formData.store}
								onChange={handleChange}
								className="border rounded px-2 py-1 capitalize w-full"
							>
								<option value="all">all</option>
								<option value="raisu">raisu</option>
								<option value="toyokan">toyokan</option>
								<option value="rajio">rajio</option>
								<option value="newFuji">newFuji</option>
								<option value="kingyo">kingyo</option>
								<option value="suika">suika</option>
							</select>
						</div>
						<div className="flex gap-2 items-center">
							<label htmlFor="role" className="capitalize w-40">role</label>
							<select
								name="role"
								value={formData.role}
								onChange={handleChange}
								className="border rounded px-2 py-1 w-full"
							>
								<option value="admin">Admin</option>
								<option value="editor">Editor</option>
								<option value="viewer">Viewer</option>
							</select>
						</div>
						<div className="flex flex-col gap-2 items-center">
							<img
								src={
									formData.photoFile ? (
										URL.createObjectURL(formData.photoFile))
										: formData.photoURL
											? formData.photoURL
											: noImage
								}
								alt="Preview"
								className="w-50 h-50 object-cover"
							/>
							<label className="border rounded px-2 py-1 bg-gray-200 cursor-pointer text-center">
								<span className="capitalize">choose photo</span>
								<input
									type="file"
									name="photoFile"
									accept="image/*"
									onChange={(e) => handleChange(e)}
									className="hidden"
								/>
							</label>
						</div>
						<button type="submit" className="capitalize bg-black text-white py-1 rounded-full">
							{formData.uid == ""
								? "register user"
								: "update user"}
						</button>
					</form>
				</div>
			}
		</div>
	);
}