const bcrypt = require('bcrypt');
const db = require('./src/models');
const User = db.User;

async function hashExistingPasswords() {
  const users = await User.findAll();
  for (const user of users) {
    // hash hanya jika password belum di-hash
    if (!user.password.startsWith('$2b$')) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      await user.save();
      console.log(`Password user ${user.email} berhasil di-hash`);
    }
  }
  console.log('Selesai hash semua password lama');
  process.exit(0);
}

hashExistingPasswords();
