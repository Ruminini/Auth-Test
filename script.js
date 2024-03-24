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

        // Authentication successful
        statusMessage.textContent = 'Authentication successful!';
    } catch (error) {
        // Handle authentication errors
        statusMessage.textContent = 'Authentication failed: ' + error.message;
        console.error(error);
    }
});
