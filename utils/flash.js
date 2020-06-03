module.exports = {

    // AUTH
    SUCCESS: 'Success.!',
    WRONG_PASSWORD: "Wrong Password",

    USER_EXISTS: "User with this Email Already Exists. ",
    UNVERIFIED_ACC: "Account needs verification. Please complete the registration process again.",
    NO_ACC: "No account with this Email.",

    OTP_SENT: 'OTP has been sent to your email.',
    OTP_VERIFIED: 'Successfully Verified',
    OTP_MISMATCH: 'OTP did NOT Match.!',

    SERVER_ERROR: 'Internal Server Error.',

    NO_AUTH_HEADER: 'NO auth token.',
    INVALID_AUTH: "Invalid Authentication token.",
    AUTH_EXPIRED: "Authentication token Expired. Please Login Again.",


    PASSWORD_CHANGED: 'Successfully Updated Password.',
    PASSWORD_RESET: 'Password Reset Successful.',

    // PROFILE
    FETCHED_PROFILE: "fetched user details",
    PROFILE_UPDATED: "Successfully Updated Profile",

    ADDRESS_ADDED: "Address Added Successfully",
    ADDRESS_REMOVED: "Address Removed Successfully",


    // EMAILS
    REG_OTP_SUBJECT: "OTP for LalaDukaan",
    REG_OTP_BODY: (token) => `Welcome to LalaDukaan. <strong>${token}</strong> is your OTP for the registration process. go ahead and complete your registration.`,

    PR_OTP_SUBJECT: "OTP for LalaDukaan",
    PR_OTP_BODY: (token) => `Laladukaan. <strong>${token}</strong> is your OTP for resetting your password.`,


}
