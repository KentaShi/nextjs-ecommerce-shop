const valid = (fullName, phone, address, password, confirmPassword) => {
    if (!fullName || !phone || !address || !password) {
        return "Please enter all fields."
    }

    if (password !== confirmPassword) {
        return "Confirm Password did not match."
    }
}

export default valid
