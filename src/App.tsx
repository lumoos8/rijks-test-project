import "./App.css";

import { useEffect, useState } from "react";

import { ArtworkTile } from "./components/ArtworkTile/ArtworkTile";
import { ArtworkModal } from "./components/ArtworkModal/ArtworkModal";
import { Pagination } from "./components/Pagination/Pagination";

import type { Artwork } from "./types/types";
import RijksMuseumApi from "./api/rijksApi";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [chosenPage, setChosenPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArtworks() {
      try {
        const artworksIds = await RijksMuseumApi.getCollection();
        const processedArtworks = await RijksMuseumApi.getArtworks(artworksIds);
        setArtworks(processedArtworks);
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

  const pageSize = 10;
  const start = (chosenPage - 1) * pageSize;
  const end = chosenPage * pageSize;

  const visibleArtworks = artworks.slice(start, end);

  const totalPages = Math.ceil(artworks.length / 10);

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
      {totalPages > 1 && (<Pagination
        totalPages={totalPages}
        chosenPage={chosenPage}
        onChosenPage={setChosenPage}
      />
      )}
    </div>
  );
}

export default App;
