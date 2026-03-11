const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const AdminEmail = "sato@miyabi-d.com";

async function setAdmin(){
    const user = await admin.auth().getUserByEmail(AdminEmail)

    await admin.auth().setCustomUserClaims( user.uid, {
        admin: true
    })
}

setAdmin();