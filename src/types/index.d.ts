export interface Todo {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  source: string;
  songUrl: string;
}
