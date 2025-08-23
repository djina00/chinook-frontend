export interface IAlbum {
  AlbumId: number;
  Title: string;
  ArtistId: number;
  artist?: {
    ArtistId: number;
    Name: string;
  };
}

export interface IAlbumResponse {
  success: boolean;
  data: IAlbum[];
  message?: string;
}