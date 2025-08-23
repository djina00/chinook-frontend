export interface IAlbum {
  AlbumId: number;
  Title: string;
  ArtistId: number;
  artist?: {
    ArtistId: number;
    Name: string;
  };
}