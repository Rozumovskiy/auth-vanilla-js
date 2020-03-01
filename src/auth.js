export function getAuthForm() {
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email">
            <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password">
            <label for="password">Enter password</label>
            </div>
            <button 
                type="submit" 
                class="mui-btn mui-btn--raised mui-btn--primary"
            >
                Join
            </button>
        </form>
    `;
};

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyABmm2wDLeq_SAQSUp1AGi7kghu2ar30e4';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resonse =>  resonse.json())
        .then(data => data.idToken)
}