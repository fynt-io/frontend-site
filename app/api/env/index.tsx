'use server';
export async function GetEnvValue(env: string) {
  const ENV = process.env[env];
  return ENV
}