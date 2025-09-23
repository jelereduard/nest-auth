import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  'local-strategy',
) {
  constructor(private authService: AuthService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
