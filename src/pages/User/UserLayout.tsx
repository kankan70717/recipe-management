import { useState } from "react";
import { initialUserData } from "../../constants/initialUserData";
import type { TypeFirestoreUser } from "../../types/TypeFirestoreUser";
import { registerNewUser } from "../../firebase/auth";
import { saveUserToFirestore, uploadFileAndSaveURL } from "../../firebase/firestore";

export function UserLayout() {
	const [formData, setFormData] = useState<TypeFirestoreUser>(initialUserData);
	const [password, setPassword] = useState<string>("");
	const [photoFile, setPhotoFile] = useState<File>();

	console.log("formData", formData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, files, type } = e.target as HTMLInputElement;

		setFormData(prev => ({
			...prev,
			[name]: type === "file" && files ? files[0] : value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			/* authentication */
			const uid = await registerNewUser(formData.email, password, formData.displayName);

			/* storage */
			if (photoFile) {
				const photoURL = await uploadFileAndSaveURL(`users/${uid}`, photoFile, "photoURL");
				console.log("Uploaded photo URL:", photoURL);
			}

			const userData: TypeFirestoreUser = {
				...formData,
				createdAt: Date.now(),
				updatedAt: Date.now()
			};

			/* firestore */
			await saveUserToFirestore(uid, userData);

			alert(`User ${formData.displayName} registered successfully!`);

			setFormData({
				displayName: "",
				email: "",
				role: "viewer",
				group: "tamaru",
				store: "all",
				photoURL: undefined,
				createdAt: 0,
				updatedAt: 0
			});

		} catch (err) {
			console.error(err);
			alert("Failed to register user.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md p-4 border rounded shadow">
			<input
				type="text"
				name="displayName"
				placeholder="Display Name"
				value={formData.displayName}
				onChange={handleChange}
				required
				className="border rounded px-2 py-1"
			/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={formData.email}
				onChange={handleChange}
				required
				className="border rounded px-2 py-1"
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				className="border rounded px-2 py-1"
			/>
			<select
				name="store"
				value={formData.store}
				onChange={handleChange}
				className="border rounded px-2 py-1 capitalize"
			>
				<option value="all">all</option>
				<option value="raisu">raisu</option>
				<option value="toyokan">toyokan</option>
				<option value="rajio">rajio</option>
				<option value="newFuji">newFuji</option>
				<option value="kingyo">kingyo</option>
				<option value="suika">suika</option>
			</select>
			<select
				name="role"
				value={formData.role}
				onChange={handleChange}
				className="border rounded px-2 py-1"
			>
				<option value="admin">Admin</option>
				<option value="editor">Editor</option>
				<option value="viewer">Viewer</option>
			</select>
			<div className="flex flex-col gap-2 items-center">
				{photoFile && (
					<img
						src={URL.createObjectURL(photoFile)}
						alt="Preview"
						className="w-50 h-50 object-cover"
					/>
				)}
				<label className="border rounded px-2 py-1 bg-gray-300 cursor-pointer text-center">
					<span className="capitalize">choose photo</span>
					<input
						type="file"
						name="photoFile"
						accept="image/*"
						onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : undefined)}
						className="hidden"
					/>
				</label>
			</div>
			<button type="submit" className="capitalize bg-black text-white py-1 rounded-full">
				register user
			</button>
		</form>
	);
}