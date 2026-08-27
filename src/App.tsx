import "./App.css";

import { useEffect, useState } from "react";

import { ArtworkTile } from "./components/ArtworkTile/ArtworkTile";
import { ArtworkModal } from "./components/ArtworkModal/ArtworkModal";
import { Pagination } from "./components/Pagination/Pagination";

import { type ArtworksCollection, type Artwork } from "./types/types";
import RijksMuseumApi from "./api/rijksApi";

const PAGE_SIZE = 10;

function App() {
  const [detailedArtworks, setDetailedArtworks] = useState<Artwork[]>([]);
  const [artworksCollection, setArtworksCollection] =
    useState<ArtworksCollection>({
      totalArtworks: 0,
      artworksIds: [],
    });
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [chosenPage, setChosenPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArtworks() {
      try {
        const artworksCollection = await RijksMuseumApi.getCollection();
        const processedArtworks = await RijksMuseumApi.getArtworks(
          artworksCollection.artworksIds.slice(0, PAGE_SIZE),
        );
        setDetailedArtworks(processedArtworks);
        setArtworksCollection(artworksCollection);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoaded(true);
      }
    }

    loadArtworks();
  }, []);

  const handleClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleClose = () => {
    setSelectedArtwork(null);
  };

  const handleChosenPage = async (newPage: number) => {
    const start = (newPage - 1) * PAGE_SIZE; // 100
    const end = newPage * PAGE_SIZE; //110

    setChosenPage(newPage);

    let newArtworkCollection: ArtworksCollection = artworksCollection;

    if (
      artworksCollection.nextPartOfCollectionUrl &&
      artworksCollection.artworksIds.length <= start
    ) {
      const nextPartOfCollection = await RijksMuseumApi.getCollection(
        artworksCollection.nextPartOfCollectionUrl,
      );

      newArtworkCollection = {
        ...nextPartOfCollection,
        artworksIds: [
          ...artworksCollection.artworksIds,
          ...nextPartOfCollection.artworksIds,
        ],
      };
      setArtworksCollection(newArtworkCollection);
    }

    if (detailedArtworks.length <= start) {
      const processedArtworks = await RijksMuseumApi.getArtworks(
        newArtworkCollection.artworksIds.slice(start, end),
      );

      setDetailedArtworks([...detailedArtworks, ...processedArtworks]);
    }
  };

  const start = (chosenPage - 1) * PAGE_SIZE;
  const end = chosenPage * PAGE_SIZE;

  const visibleArtworks = detailedArtworks.slice(start, end);

  const totalPages = Math.ceil(artworksCollection.totalArtworks / PAGE_SIZE);

  return (
    <div className="container">
      <h1 className="title">Rijksmuseum Artworks</h1>
      {isLoaded && !error && visibleArtworks.length > 0 && (
        <section className="artworks">
          {visibleArtworks.map((artwork) => (
            <ArtworkTile
              key={artwork.id}
              artwork={artwork}
              onClick={handleClick}
            />
          ))}
        </section>
      )}
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && error && <p>{error}</p>}
      {isLoaded && !error && visibleArtworks.length === 0 && (
        <p>No artworks found.</p>
      )}

      {selectedArtwork && (
        <ArtworkModal artwork={selectedArtwork} onClose={handleClose} />
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          chosenPage={chosenPage}
          onChosenPage={handleChosenPage}
        />
      )}
    </div>
  );
}

export default App;
