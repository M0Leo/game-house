export class GetGamesDto {
  skip?: number;
  take?: number;
  orderBy?: { [key: string]: 'ASK' | 'DESC' };
  where?: any;
}
