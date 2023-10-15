const secret = "QbFiSka53bCC1sl150YdwpAwdsB22oUU"; // 32 char secret generated online

const crypto = require("crypto");

const encrypt = (pass) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

  const encryptedpass = Buffer.concat([cipher.update(pass), cipher.final()]);

  return { iv: iv.toString("hex"), password: encryptedpass.toString("hex") };
};
const decrypt = (encryption) => {
  console.log(encryption)
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(encryption.iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};
module.exports = { encrypt, decrypt };
