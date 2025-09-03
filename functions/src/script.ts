import * as admin from "firebase-admin";
import * as fs from "fs";

const serviceAccount = JSON.parse(
	fs.readFileSync("./private/private_keys/service-account-key.json", "utf8")
);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const uid = "LkCI15BXeFUTj16xSIbCqh5y8Vz1";

async function run() {
	await admin.auth().setCustomUserClaims(uid, { role: "admin", group: "tamaru", store: "all" });
	console.log("Custom claims set successfully!");
}

run().catch(console.error);
