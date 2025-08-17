import { IGenre } from '../../genres/interfaces/i-genre';

export interface ITrack {
  TrackId: number;
  Name: string;
  AlbumId: number;
  MediaTypeId: number;
  GenreId?: number;
  Composer?: string;
  Milliseconds: number;
  Bytes?: number;
  UnitPrice: number;
  album?: {
    AlbumId: number;
    Title: string;
    ArtistId: number;
    artist?: {
      ArtistId: number;
      Name: string;
    };
  };
  genre?: IGenre;
  mediaType?: {
    MediaTypeId: number;
    Name: string;
  };
}

export interface ITrackResponse {
  success: boolean;
  data: {
    data: ITrack[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  message?: string;
}