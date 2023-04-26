const valid = (fullName, username, password, confirmPassword) => {
    if (!fullName || !username || !password) {
        return "Please enter all fields.";
    }

    if (password !== confirmPassword) {
        return "Confirm Password did not match.";
    }
};

export default valid;
