import { spawn } from 'node:child_process';

const commands = [
  {
    name: 'api',
    command: 'node',
    args: ['server/description-api.mjs'],
  },
  {
    name: 'angular',
    command: process.platform === 'win32' ? 'npx.cmd' : 'npx',
    args: ['ng', 'serve', '--proxy-config', 'proxy.conf.json', ...process.argv.slice(2)],
  },
];

const processes = commands.map(({ name, command, args }) => {
  const child = spawn(command, args, {
    shell: process.platform === 'win32',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (data) => {
    process.stdout.write(`[${name}] ${data}`);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(`[${name}] ${data}`);
  });

  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`[${name}] exited with code ${code}`);
      stopAll();
    }
  });

  return child;
});

function stopAll() {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }
}

process.on('SIGINT', () => {
  stopAll();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});
