export interface ITrack {
  TrackId: number;
  Name: string;
  AlbumId?: number;
  MediaTypeId: number;
  GenreId?: number;
  Composer?: string;
  Milliseconds: number;
  Bytes?: number;
  UnitPrice: number;
}