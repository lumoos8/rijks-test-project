export type Artwork = {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
};

type OrderedItem = {
  id: string;
  type: string;
};

export type Collection = {
  orderedItems: OrderedItem[];
};
