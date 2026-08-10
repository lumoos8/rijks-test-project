import type { Collection, Artwork } from "../types/types";

class RijksApi {
  async getCollection() {
    const response = await fetch(
      "https://data.rijksmuseum.nl/search/collection",
    );

    if (!response.ok) {
      throw new Error(`Server said: ${response.status}`);
    }

    const data: Collection = await response.json();

    return data.orderedItems.map(({ id }) => {
      const searchString = "/";
      const slashIndex = id.lastIndexOf(searchString);
      return id.slice(slashIndex);
    });
  }

  async getArtworks(ids: string[]) {
    const fetchedArtworks = await Promise.all(
      ids.map(async (id) => {
        const response = await fetch(
          `https://data.rijksmuseum.nl/${id}?_profile=dc`
          );

        if (!response.ok) {
          throw new Error(
            `Failed to load artwork ${id}: ${response.status}`,
          );
        }
        return response.json()
      }),
    )

    const processedArtworks: Artwork[] = fetchedArtworks.map((artwork) => ({
      id: artwork["@id"],
      title: artwork.title,
      artist: artwork.creator?.title ?? "Unknown",
      description: artwork.description,
      imageUrl: artwork.relation["@id"],
    }));

    return processedArtworks;
  }
}

const RijksMuseumApi = new RijksApi();

export default RijksMuseumApi;
