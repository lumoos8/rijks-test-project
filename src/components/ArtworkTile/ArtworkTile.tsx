import type { Artwork } from "../../types/artwork.ts";
import "./ArtworkTile.css";

type ArtworkTileProps = {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
};

export const ArtworkTile = ({ artwork, onClick }: ArtworkTileProps) => {
  return (
    <button className="artwork-tile" onClick={() => onClick(artwork)}>
      <img
        className="artwork-image"
        src={artwork.imageUrl}
        alt={artwork.title}
      />
      <div className="artwork-info">
        <h2 className="artwork-title">{artwork.title}</h2>
        <p className="artwork-artist">{artwork.artist}</p>
      </div>
    </button>
  );
};
