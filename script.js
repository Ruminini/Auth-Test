const authenticateBtn = document.getElementById('authenticateBtn');
const statusMessage = document.getElementById('statusMessage');

authenticateBtn.addEventListener('click', async () => {
    try {
        const credential = await navigator.credentials.create({
            publicKey: {
                challenge: new Uint8Array(32), // Generate a random challenge
                rp: { name: 'Example Corp' },
                user: { id: new Uint8Array(16), name: 'user@example.com', displayName: 'User' },
                pubKeyCredParams: [
                    { type: 'public-key', alg: -7 },  // ES256
                    { type: 'public-key', alg: -257 }  // RS256
                ],
                authenticatorSelection: { authenticatorAttachment: 'platform' },
                timeout: 60000, // Timeout in milliseconds
                attestation: 'direct'
            }
        });
        console.log(credential);

        // Extract user information from the credential object
        const userId = credential.user.id;
        const userName = credential.user.name;
        const displayName = credential.user.displayName;
        const credentialId = credential.id;

        // Display user information on the website
        userInfoContainer.innerHTML = `
            <p>User ID: ${userId}</p>
            <p>Username: ${userName}</p>
            <p>Display Name: ${displayName}</p>
            <p>Credential ID: ${credentialId}</p>
        `;
        
        // Authentication successful
        statusMessage.textContent = 'Authentication successful!';
    } catch (error) {
        // Handle authentication errors
        console.log(credential);
        statusMessage.textContent = 'Authentication failed: ' + error.message;
        console.error(error);
    }
});
