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

export type CollectionApiModel = {
  partOf: {
    totalItems: number
  };
  orderedItems: OrderedItem[];
};

export type ArtworksCollection = {
  totalArtworks: number;
  artworksIds: string[];
}
