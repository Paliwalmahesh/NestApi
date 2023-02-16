import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

class EnvVariables {
  @IsNotEmpty()
  PORT: number;
  @IsNotEmpty()
  JWT_SECRET_KEY: string;
}

export function validate(config: Record<string, string>) {
  console.log('called validation');
  const envVariables = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(envVariables, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return envVariables;
}
