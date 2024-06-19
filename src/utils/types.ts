export interface UserData {
  id: number;
  created_at: number;
  name: string;
  email: string;
  stories: { story_id: number; progress: number }[];
  location: number;
}

export interface StoryData {
  id: number;
  created_at: number;
  name: string;
  description: string;
  genres: { name: string; icon: string }[];
  locations: { name: string }[];
  author_id: number;
  status: 'Available' | 'Coming Soon' | 'Draft';
  cover_photo: {
    access: string;
    path: string;
    name: string;
    type: string;
    size: number;
    mime: string;
    meta: { width: number; height: number };
    url: string;
  };
}

export interface LocationData {
  id: number;
  created_at: number;
  name: string;
  status: 'Coming Soon' | 'Available' | 'Draft';
}

export interface GenreData {
  id: number;
  created_at: number;
  name: string;
  icon: string;
}
