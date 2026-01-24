import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { appendAudit } from '../../server/src/lib/audit';
import fs from 'fs/promises';
import path from 'path';

const TMP = path.join(process.cwd(), 'tmp_audit_test');

describe('audit append', () => {
  beforeEach(async () => {
    process.env.AUDIT_LOG_DIR = TMP;
    await fs.rm(TMP, { recursive: true, force: true });
  });
  afterEach(async () => {
    await fs.rm(TMP, { recursive: true, force: true });
    delete process.env.AUDIT_LOG_DIR;
  });

  it('appends a JSON line to audit log', async () => {
    await appendAudit({ traceId: 't-1', timestamp: new Date().toISOString(), action: 'test', outcome: 'success' });
    const logPath = path.join(TMP, 'audit.log');
    const content = await fs.readFile(logPath, 'utf8');
    expect(content.trim().length).toBeGreaterThan(0);
    const parsed = JSON.parse(content.trim());
    expect(parsed.traceId).toBe('t-1');
    expect(parsed.action).toBe('test');
  });
});