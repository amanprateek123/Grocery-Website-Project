module.exports = {

    COMPANY: 'LalaDukaan',

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
    REG_OTP_SUBJECT: `OTP for ${this.COMPANY}`,
    REG_OTP_BODY: (token) => `
    <div style="max-width: 700px; margin: auto;">
        <header style="min-height:4em; background:black; display:flex; justify-content: center; align-items: center;">
            <img src="" />
            <h2 style="color: #fff;">LalaDukaan</h2>
        </header>
        <main style="padding: 1em;">
            Dear Customer, <br /> <br />
            <b>${token}</b> - Use this OTP to register for your ${this.COMPANY} account. <br /> <br />
            This otp is valid for only 5 minutes or 1 successful attempt whichever is earlier. Please note, this OTP is
            only this transaction and cannot be used for any other transaction. <br /> <br />
            Please do not disclose/share your OTP with anyone for thee security reasons. <br /> <br />
            Thank you for shopping with ${this.COMPANY}.<br /> <br />
            Best Regards,<br />
            Team ${this.COMPANY}


        </main>
        <footer
            style="min-height:4em; background:#eee; padding: 1em; display:flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="display: flex; justify-content: space-around; min-width: 300px; margin-top:2em ;">
                <a style="color: #555;" href="https://www.facebook.com">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-facebook">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                </a>
                <a style="color: #555;" href="https://www.instagram.com">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-instagram">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>
                <a style="color: #555;" href="https://www.twitter.com">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-twitter">
                        <path
                            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                        </path>
                    </svg>
                </a>
                <a style="color: #555;" href="https://www.youtube.com">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-youtube">
                        <path
                            d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z">
                        </path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                </a>
            </div>
            <p>
                For any further assistance and queries <a href="/">Contact Us</a>
            </p>
        </footer>
    </div>
    `,

    PR_OTP_SUBJECT: "OTP for LalaDukaan",
    PR_OTP_BODY: (token) => `Laladukaan. <strong>${token}</strong> is your OTP for resetting your password.`,

    MAIL_OTP_SUBJECT: "OTP for LalaDukaan to change email.",
    MAIL_OTP_BODY: (token) => `Laladukaan. <strong>${token}</strong> is your OTP for changing your email ID.`,


}
