const authenticateBtn = document.getElementById('authenticateBtn');
const statusMessage = document.getElementById('statusMessage');
const originalID = document.getElementById('originalID');
const newID = document.getElementById('newID');

const randomUserId = new Uint8Array(16);
// crypto.getRandomValues(randomUserId); // Generate a random user ID, disabled to avoid creating multiple during testing
let storedCredential = null; // Variable to store the credential

authenticateBtn.addEventListener('click', async () => {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    try {
        if (!storedCredential) {
            // If no stored credential, create a new one
            storedCredential = await navigator.credentials.create({
                publicKey: {
                    challenge: challenge, // Generate a random challenge
                    rp: { name: 'WeatherWiz' },
                    user: { id: randomUserId, name: 'user@example.com', displayName: 'User' },
                    pubKeyCredParams: [
                        { type: 'public-key', alg: -7 },  // ES256
                        { type: 'public-key', alg: -257 }  // RS256
                    ],
                    authenticatorSelection: { authenticatorAttachment: 'platform' },
                    timeout: 60000, // Timeout in milliseconds
                    attestation: 'direct'
                }
            });
            originalID.textContent = storedCredential.id;
        } else {
            // If there's a stored credential, use it for authentication
            storedCredential = await navigator.credentials.get({
                publicKey: {
                    challenge: challenge, // Generate a new challenge
                    timeout: 60000, // Timeout in milliseconds
                }
            });
            newID.textContent = storedCredential.id;
        }

        // Authentication successful
        statusMessage.textContent = 'Authentication successful!';
        console.log(storedCredential.id);
    } catch (error) {
        // Handle authentication errors
        statusMessage.textContent = 'Authentication failed: ' + error.message;
        console.error(error);
    }
});