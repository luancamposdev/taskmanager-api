import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JwtTokenService } from './jwt.service';

describe('JwtTokenService', () => {
  let jwtTokenService: JwtTokenService;
  let nestJwtServiceMock: Partial<NestJwtService>;

  beforeEach(() => {
    nestJwtServiceMock = {
      signAsync: jest.fn().mockResolvedValue('signed-token'),
      verifyAsync: jest.fn(),
    };

    jwtTokenService = new JwtTokenService(nestJwtServiceMock as NestJwtService);
  });

  it('Should verify a valid token and return payload', async () => {
    const payload = { sub: '123', role: 'USER' };
    (nestJwtServiceMock.verifyAsync as jest.Mock).mockResolvedValue(payload);

    const result = await jwtTokenService.verify('valid-token');

    expect(nestJwtServiceMock.verifyAsync).toHaveBeenCalledWith('valid-token');
    expect(result).toEqual(payload);
  });

  it('should return null if token is invalid or verification fails', async () => {
    (nestJwtServiceMock.verifyAsync as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const result = await jwtTokenService.verify('invalid-token');

    expect(nestJwtServiceMock.verifyAsync).toHaveBeenCalledWith(
      'invalid-token',
    );
    expect(result).toBeNull();
  });

  it('should return null if payload is not an object', async () => {
    (nestJwtServiceMock.verifyAsync as jest.Mock).mockResolvedValue(
      'string-payload',
    );

    const result = await jwtTokenService.verify('some-token');

    expect(result).toBeNull();
  });
});
