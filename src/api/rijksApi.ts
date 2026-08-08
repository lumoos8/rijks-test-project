import type { Collection } from "../types/types";

class RijksApi {
  async getArtworks() {
    const data: Collection = await fetch(
      "https://data.rijksmuseum.nl/search/collection",
    ).then((r) => r.json());

    const ids = data.orderedItems.map(({ id }) => {
      const searchString = "/";
      const slashIndex = id.lastIndexOf(searchString);
      return id.slice(slashIndex);
    });

    const fetchedArtworks = await Promise.all(
      ids.map((id) =>
        fetch(`https://data.rijksmuseum.nl/${id}?_profile=dc`).then((r) =>
          r.json(),
        ),
      ),
    );

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
