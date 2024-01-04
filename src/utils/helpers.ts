export const convertExpiresInToExpiresAt = (expiresIn: string): number => {
  const expiresInRegex = /^(\d+)([smhd])$/;
  const matches = expiresIn.match(expiresInRegex);

  if (!matches) {
    throw new Error('Invalid expiresIn format');
  }

  const duration = parseInt(matches[1], 10);
  const unit = matches[2];

  let multiplier = 1;
  switch (unit) {
    case 's':
      multiplier = 1000;
      break;
    case 'm':
      multiplier = 1000 * 60;
      break;
    case 'h':
      multiplier = 1000 * 60 * 60;
      break;
    case 'd':
      multiplier = 1000 * 60 * 60 * 24;
      break;
    default:
      throw new Error('Invalid expiresIn unit');
  }

  const currentTime = Date.now();
  const expiresAt = currentTime + duration * multiplier;

  return expiresAt;
};
