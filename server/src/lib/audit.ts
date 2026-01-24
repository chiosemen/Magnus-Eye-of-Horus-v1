import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';


export type AuditRecord = {
  traceId: string;
  user?: { sub?: string; email?: string; role?: string } | null;
  timestamp: string;
  action: string;
  outcome: 'started' | 'success' | 'error' | 'blocked';
  detail?: Record<string, unknown> | string;
};

export async function appendAudit(record: AuditRecord) {
  // Avoid logging sensitive fields in detail; callers must redact
  try {
    const LOG_DIR = process.env.AUDIT_LOG_DIR ? path.resolve(process.env.AUDIT_LOG_DIR) : path.resolve(process.cwd(), 'logs');
    const LOG_FILE = path.join(LOG_DIR, 'audit.log');
    if (!fs.existsSync(LOG_DIR)) {
      // eslint-disable-next-line no-console
      console.log('creating log dir', LOG_DIR);
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
    const line = JSON.stringify(record) + '\n';
    // eslint-disable-next-line no-console
    console.log('appending to', LOG_FILE);
    await fsp.appendFile(LOG_FILE, line, { encoding: 'utf8' });
  } catch (err) {
    // Surface errors — do not log secrets
    // eslint-disable-next-line no-console
    console.error('audit append error', String(err).slice(0, 200));
    throw err;
  }
}
