import "./App.css";

import { useState } from "react";

import { ArtworkTile } from "./components/ArtworkTile/ArtworkTile";
import { ArtworkModal } from "./components/ArtworkModal/ArtworkModal";
import { Pagination } from "./components/Pagination/Pagination";

import mockArtworks from "./data/mockArtworks";

import type { Artwork } from "./types/artwork";

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [chosenPage, setChosenPage] = useState(1);

  const handleClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleClose = () => {
    setSelectedArtwork(null);
  };

  const pageSize = 10;
  const start = (chosenPage - 1) * pageSize;
  const end = chosenPage * pageSize;

  const visibleArtworks = mockArtworks.slice(start, end);

  return (
    <div className="container">
      <h1 className="title">Rijksmuseum Artworks</h1>
      <section className="artworks">
        {visibleArtworks.map((artwork) => (
          <ArtworkTile
            key={artwork.id}
            artwork={artwork}
            onClick={handleClick}
          />
        ))}
      </section>

      {selectedArtwork && (
        <ArtworkModal artwork={selectedArtwork} onClose={handleClose} />
      )}
      <Pagination chosenPage={chosenPage} onChosenPage={setChosenPage} />
    </div>
  );
}

export default App;
