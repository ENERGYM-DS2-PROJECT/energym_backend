const { hash, validateHash } = require("../util/bcrypt");


test('Hash password', async () => {
    const password = 'MasterPass22';
    const generatedHash = await hash(password);

    const passwordValid = await validateHash(password, generatedHash);

    expect(passwordValid).toBe(true);

});