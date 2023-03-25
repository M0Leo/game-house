export class GetGamesDto {
  skip?: number;
  take?: number;
  orderBy?: { [key: string]: 'asc' | 'desc' };
  where?: any;
  cursor?: any;
}
